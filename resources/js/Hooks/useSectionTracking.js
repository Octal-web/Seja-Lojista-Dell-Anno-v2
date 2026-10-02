import { useEffect, useRef } from "react";

const HEARTBEAT_INTERVAL_MS = 15000;
const VISIBILITY_THRESHOLDS = [0, 0.25, 0.5, 0.75, 1];

const readCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');

    return meta ? meta.getAttribute("content") : null;
};

const computeScrollPercent = () => {
    const scrollTop = window.scrollY;
    const viewport = window.innerHeight;
    const total = document.documentElement.scrollHeight;

    if (total <= viewport) {
        return 100;
    }

    const percent = ((scrollTop + viewport) / total) * 100;

    return Math.min(100, Math.max(0, Math.round(percent)));
};

/**
 * Observa todas as <section aria-labelledby="..."> da página e reporta,
 * por seção, o maior % já visível na tela — além do scroll máximo geral.
 * Isso permite montar um funil de "até onde as pessoas rolam a página".
 */
export const useSectionTracking = () => {
    const sectionMaxRef = useRef({});
    const scrollMaxRef = useRef(0);
    const dirtyRef = useRef(false);

    useEffect(() => {
        if (
            typeof window === "undefined" ||
            !window.axios ||
            typeof IntersectionObserver === "undefined"
        ) {
            return undefined;
        }

        const sections = Array.from(
            document.querySelectorAll("main section[aria-labelledby]"),
        );

        if (sections.length === 0) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const key = entry.target.getAttribute("aria-labelledby");

                    if (!key) {
                        return;
                    }

                    const percent = Math.round(entry.intersectionRatio * 100);
                    const current = sectionMaxRef.current[key] ?? 0;

                    if (percent > current) {
                        sectionMaxRef.current[key] = percent;
                        dirtyRef.current = true;
                    }
                });
            },
            { threshold: VISIBILITY_THRESHOLDS },
        );

        sections.forEach((section) => observer.observe(section));

        const handleScroll = () => {
            const percent = computeScrollPercent();

            if (percent > scrollMaxRef.current) {
                scrollMaxRef.current = percent;
                dirtyRef.current = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        const flush = () => {
            if (!dirtyRef.current) {
                return;
            }

            dirtyRef.current = false;

            window.axios
                .post(route("Tracking.secoes"), {
                    scroll_percentual: scrollMaxRef.current,
                    secoes: { ...sectionMaxRef.current },
                })
                .catch(() => {});
        };

        const flushWithBeacon = () => {
            if (!dirtyRef.current) {
                return;
            }

            if (typeof navigator.sendBeacon !== "function") {
                flush();
                return;
            }

            const token = readCsrfToken();

            if (!token) {
                flush();
                return;
            }

            dirtyRef.current = false;

            const formData = new FormData();

            formData.append("_token", token);
            formData.append("scroll_percentual", scrollMaxRef.current);

            Object.entries(sectionMaxRef.current).forEach(
                ([chave, percentual]) => {
                    formData.append(`secoes[${chave}]`, percentual);
                },
            );

            navigator.sendBeacon(route("Tracking.secoes"), formData);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                flushWithBeacon();
            }
        };

        const heartbeat = window.setInterval(flush, HEARTBEAT_INTERVAL_MS);

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("pagehide", flushWithBeacon);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
            window.clearInterval(heartbeat);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
            window.removeEventListener("pagehide", flushWithBeacon);
            flush();
        };
    }, []);
};
