import { useEffect, useRef } from "react";

const HEARTBEAT_INTERVAL_MS = 15000;

const readCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');

    return meta ? meta.getAttribute("content") : null;
};

const readUtmParams = () => {
    const params = new URLSearchParams(window.location.search);

    return {
        origem: params.get("origin") || params.get("utm_source") || null,
        campanha:
            params.get("campaign") || params.get("utm_campaign") || null,
        grupo:
            params.get("group") ||
            params.get("utm_group") ||
            params.get("utm_medium") ||
            null,
        anuncio: params.get("ad") || params.get("utm_content") || null,
    };
};

export const useVisitTracking = () => {
    const secondsRef = useRef(0);

    useEffect(() => {
        if (typeof window === "undefined" || !window.axios) {
            return undefined;
        }

        window.axios
            .post(route("Tracking.entrada"), {
                url: window.location.href,
                referrer: document.referrer || null,
                ...readUtmParams(),
            })
            .catch(() => {});

        const tick = window.setInterval(() => {
            if (document.visibilityState === "visible") {
                secondsRef.current += 1;
            }
        }, 1000);

        const flush = () => {
            if (secondsRef.current <= 0) {
                return;
            }

            const segundos = secondsRef.current;
            secondsRef.current = 0;

            window.axios
                .post(route("Tracking.atividade"), {
                    segundos,
                    url: window.location.href,
                })
                .catch(() => {});
        };

        const flushWithBeacon = () => {
            if (secondsRef.current <= 0) {
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

            const segundos = secondsRef.current;
            secondsRef.current = 0;

            const formData = new FormData();

            formData.append("_token", token);
            formData.append("segundos", segundos);
            formData.append("url", window.location.href);

            navigator.sendBeacon(route("Tracking.atividade"), formData);
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
            window.clearInterval(tick);
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
