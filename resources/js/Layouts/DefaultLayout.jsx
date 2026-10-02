import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";

import Lenis from "lenis";

import { CookieModal } from "@/Components/CookieModal";
import { MenuItem } from "@/Components/MenuItem";
import { LinkButton } from "@/Components/ui/LinkButton";
import { useVisitTracking } from "@/Hooks/useVisitTracking";

import { faqDoubts } from "@/Data/faqDoubts";

import logo from "@/imgs/site/logo.svg";
import logoWhite from "@/imgs/site/logo-white.svg";
import octalLogo from "@/imgs/site/octalweb-logo.png";
import favicon from "@/imgs/favicon.ico";
import yt from "@/imgs/site/youtube.png";
import pinterest from "@/imgs/site/pinterest.png";
import fb from "@/imgs/site/facebook.png";
import ig from "@/imgs/site/instagram.png";
import bg from "@/imgs/content/display/main-bg.jpg";

const DefaultLayout = ({
    children,
    title = "Seja Lojista | Dell Anno",
    description = "A Dell Anno abre suas portas para que você faça parte da realização de muitos e muitos sonhos.",
}) => {
    const { controller, action, notifyCookie, rejectCookie, lojas } =
        usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [trackingEnabled, setTrackingEnabled] = useState(false);

    useVisitTracking();
    const lenisRef = useRef(null);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
        });

        lenisRef.current = lenis;

        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            delete window.lenis;
            lenis.destroy();
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const acceptCookies = () => {
        setTrackingEnabled(true);
    };

    useEffect(() => {
        const hasCookie = (name) => {
            return document.cookie
                .split("; ")
                .some((cookie) => cookie.startsWith(`${name}=`));
        };

        const acceptedCookies = notifyCookie || hasCookie("notify-cookies");
        const rejectedCookies = rejectCookie || hasCookie("reject-cookies");

        if (!acceptedCookies || rejectedCookies) {
            return;
        }

        if (!document.getElementById("gtm-script")) {
            const script = document.createElement("script");

            script.id = "gtm-script";
            script.innerHTML = `
            (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MPTWPC9');
        `;

            document.head.appendChild(script);
        }

        if (!document.getElementById("gtm-noscript")) {
            const noscript = document.createElement("noscript");

            noscript.id = "gtm-noscript";
            noscript.innerHTML = `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MPTWPC9" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `;

            document.body.appendChild(noscript);
        }
    }, [notifyCookie, rejectCookie, trackingEnabled]);

    const localBusinessSchema = useMemo(
        () => ({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "FurnitureStore"],
            name: "Seja Lojista | Dell Anno",
            description,
            url: window.location.origin,
            logo: {
                "@type": "ImageObject",
                url: logo,
            },
            image: bg,
            email: "atendimento@dellanno.com.br",
            priceRange: "$$",
            sameAs: stores.flatMap((s) =>
                [s.instagram, s.whatsapp].filter(Boolean),
            ),
            address: stores.map((s) => ({
                "@type": "PostalAddress",
                addressLocality: s.cidade,
                addressRegion: s.estado,
                addressCountry: "BR",
                streetAddress: s.endereco.replace("\n", ", "),
            })),
            contactPoint: stores.map((s) => ({
                "@type": "ContactPoint",
                name: s.nome,
                instagram: s.instagram,
                whatsapp: s.whatsapp,
                telephone: s.telefone,
                contactType: "customer service",
                areaServed: s.cidade,
                availableLanguage: "Portuguese",
            })),
            openingHoursSpecification: [
                {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                    ],
                    opens: "09:00",
                    closes: "19:00",
                },
                {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: "Saturday",
                    opens: "09:00",
                    closes: "15:00",
                },
            ],
        }),
        [],
    );

    const faqSchema = useMemo(
        () => ({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqDoubts.map((item) => ({
                "@type": "Question",
                name: item.title,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.text,
                },
            })),
        }),
        [],
    );

    const organizationSchema = useMemo(
        () => ({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Seja Lojista | Dell Anno",
            url: window.location.origin,
            logo: {
                "@type": "ImageObject",
                url: logo,
            },
            email: "atendimento@dellanno.com.br",
            contactPoint: lojas.map((s) => ({
                "@type": "ContactPoint",
                name: s.nome,
                instagram: s.instagram,
                whatsapp: s.whatsapp,
                telephone: s.telefone,
                contactType: "customer service",
                areaServed: s.cidade,
                availableLanguage: "Portuguese",
                email: s.email || undefined,
            })),
            sameAs: lojas.flatMap((s) =>
                [s.instagram, s.whatsapp].filter(Boolean),
            ),
        }),
        [lojas],
    );

    const menuItems = [
        {
            name: "Histórias de sucesso",
            route: "Home.index",
            to: "#depoimentos-em-video",
            external: false,
        },
        {
            name: "Por que a Dell Anno",
            route: "Home.index",
            to: "#diferenciais",
            external: false,
        },
        {
            name: "Diferenciais",
            route: "Home.index",
            to: "#suporte",
            external: false,
        },
    ];

    return (
        <>
            <Head>
                <title>{title}</title>
                
                <link rel="canonical" href={window.location.origin + window.location.pathname} />

                <meta name="description" content={description} />

                <meta property="og:url" content={window.location.pathname} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta
                    property="og:image"
                    content="/content/pages/dellanno.jpg"
                />

                <meta name="robots" content="index, follow" />
                <meta name="author" content="Octal Web" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description || ""} />
                <meta
                    name="twitter:image"
                    content="/content/pages/dellanno.jpg"
                />

                <link rel="icon" href={favicon} type="image/x-icon" />

                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify(localBusinessSchema)}
                </script>

                <script type="application/ld+json">
                   {JSON.stringify(organizationSchema)} 
                </script>
            </Head>

            <header className="header fixed top-0 left-0 right-0 bg-white z-[20] transition-all duration-300 ease-in-out translate-y-0 shadow-2xl shadow-black/10">
                <div
                    className={`fixed inset-0 bg-black md:hidden duration-300 ease-out ${isMenuOpen ? "opacity-30" : "opacity-0 h-0"}`}
                    onClick={() => {
                        setIsMenuOpen(false);
                    }}
                ></div>
                <div className="container max-w-x-large">
                    <div className="flex items-center justify-between">
                        <div className="relative z-[1] flex items-center justify-between w-full my-5 lg:my-7 2xl:my-8">
                            <h1 className="flex items-center">
                                <Link
                                    href={route("Home.index")}
                                    className="flex items-center"
                                >
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="block max-w-30 md:max-w-50 lg:max-w-80"
                                    />
                                </Link>
                            </h1>

                            <button
                                className={`fixed top-0 left-0 w-screen h-screen xl:hidden bg-black transition-all  ${isMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`}
                                aria-label="Close Menu"
                                onClick={() => setIsMenuOpen(false)}
                            />

                            <div
                                className={`fixed xl:relative bg-black bg-opacity-70 max-xl:backdrop-blur-sm xl:bg-transparent left-0 ${!isMenuOpen ? "-top-1 max-xl:-translate-y-full" : "top-0"} xl:left-auto xl:top-auto flex flex-col xl:flex-row xl:items-center justify-center xl:justify-end w-full h-[calc(100vh_/6_*_5)] xl:h-auto xl:my-0.5 2xl:my-1.5 transition-all ease-out duration-500`}
                            >
                                <nav className="relative">
                                    <ul className="flex flex-col xl:flex-row items-center xl:justify-center gap-6 lg:gap-1 2xl:gap-10 relative xl:mr-5 2xl:mr-0">
                                        {menuItems.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                item={item}
                                                index={index}
                                                isMenuOpen={isMenuOpen}
                                            />
                                        ))}
                                        <li
                                            className="max-md:opacity-0 max-md:translate-y-[-20px]"
                                            style={
                                                typeof window !== "undefined" &&
                                                window.innerWidth < 768
                                                    ? {
                                                          opacity: isMenuOpen
                                                              ? 1
                                                              : 0,
                                                          transform: isMenuOpen
                                                              ? "translateY(0)"
                                                              : "translateY(-20px)",
                                                          transition: `opacity 0.4s ease-out ${menuItems.length * 0.1}s, transform 0.4s ease-out ${menuItems.length * 0.1}s`,
                                                      }
                                                    : {}
                                            }
                                        >
                                            <LinkButton
                                                href={`${route("Home.index")}#orcamento`}
                                                variant="black"
                                                size="sm"
                                            >
                                                Quero Ser Lojista
                                            </LinkButton>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <button
                                className="xl:hidden relative z-[2]"
                                onClick={toggleMenu}
                                aria-label="Toggle Menu"
                            >
                                <div className="flex items-center">
                                    <div className="relative w-7 h-[21px]">
                                        <div
                                            className={`absolute top-0 bg-black h-[2px] w-7 transition-all duration-300 ${isMenuOpen ? "rotate-45 !top-[10px] bg-white" : "bg-black"}`}
                                            style={{
                                                transitionDelay: isMenuOpen
                                                    ? "0ms, 400ms"
                                                    : "0ms",
                                                transitionProperty:
                                                    "top, transform",
                                            }}
                                        ></div>
                                        <div
                                            className={`absolute top-[9px] h-[2px] w-7 transition-all duration-300 ${isMenuOpen ? "scale-x-0 !top-[10px] bg-white" : "bg-black"}`}
                                            style={{
                                                transitionDelay: isMenuOpen
                                                    ? "0ms, 400ms"
                                                    : "0ms",
                                                transitionProperty:
                                                    "top, transform",
                                            }}
                                        ></div>
                                        <div
                                            className={`absolute bottom-0 bg-black h-[2px] w-7 transition-all duration-300 ${isMenuOpen ? "-rotate-45 bottom-[9px] bg-white" : "bg-black"}`}
                                            style={{
                                                transitionDelay: isMenuOpen
                                                    ? "0ms, 400ms"
                                                    : "0ms",
                                                transitionProperty:
                                                    "bottom, transform",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="overflow-hidden pt-[72px] lg:pt-[84px] xl:pt-[102px] 2xl:pt-[108px] text-tertiary">
                <h1 className="sr-only">{description}</h1>
                {children}
            </main>

            <footer className="relative bg-primary">
                <div className="absolute inset-0 w-full h-full bg-black" />
                <div className="container xl:max-w-x-large">
                    <div className="relative">
                        <div className="xl:hidden pt-10">
                            <img
                                src={logoWhite}
                                alt="Logo"
                                className="mx-auto max-sm:max-w-30 max-md:max-w-40 xl:h-full -translate-y-1/2"
                            />
                        </div>
                        <div className="flex flex-col xl:flex-row items-start gap-3 2xl:gap-15 lg:pt-14 lg:pb-12">
                            <div className="hidden xl:block">
                                <img
                                    src={logoWhite}
                                    alt="Logo"
                                    className="w-30 h-fit"
                                />
                            </div>

                            <div className="flex max-xl:flex-col xl:justify-between gap-1 2xl:gap-4 mx-auto xl:mx-0 xl:mt-auto">
                                <nav className="2xl:mr-4 ">
                                    <ul className="flex justify-center 2xl:justify-end gap-x-2 text-xs items-center xl:mt-auto">
                                        <li>
                                            <a
                                                href="https://www.youtube.com/c/DellAnnoOficial"
                                                target="_blank"
                                                className="transition-all opacity-100 hover:opacity-70"
                                            >
                                                <img
                                                    className="w-5 xl:w-4 2xl:w-5"
                                                    src={yt}
                                                    alt="youtube"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://br.pinterest.com/dellanno/"
                                                target="_blank"
                                                className="transition-all opacity-100 hover:opacity-70"
                                            >
                                                <img
                                                    className="w-5 xl:w-4 2xl:w-5"
                                                    src={pinterest}
                                                    alt="pinterest"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.facebook.com/DellAnnoOficial"
                                                target="_blank"
                                                className="transition-all opacity-100 hover:opacity-70"
                                            >
                                                <img
                                                    className="w-5 xl:w-4 2xl:w-5"
                                                    src={fb}
                                                    alt="facebook"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://instagram.com/dellannooficial"
                                                target="_blank"
                                                className="transition-all opacity-100 hover:opacity-70"
                                            >
                                                <img
                                                    className="w-5 xl:w-4 2xl:w-5"
                                                    src={ig}
                                                    alt="instagram"
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </nav>

                                <nav className="mb-2 mt-10 xl:mt-auto xl:max-w-[70%]">
                                    <ul className="flex justify-center text-center max-lg:flex-wrap xl:justify-evenly gap-y-4 gap-x-6 sm:gap-x-4 2xl:gap-x-10">
                                        <li>
                                            <a
                                                href="tel:08007214104"
                                                className="block text-white text-xs sm:leading-none transition-all opacity-70 hover:opacity-100"
                                            >
                                                Central de Relacionamento com o
                                                Cliente | 0800 721 4104
                                            </a>
                                        </li>
                                    </ul>
                                </nav>

                                <nav className="my-2 xl:mt-auto 2xl:mx-12">
                                    <ul className="flex justify-center max-xl:flex-wrap xl:justify-evenly gap-y-4 gap-x-3">
                                        <li>
                                            <Link
                                                href={route(
                                                    "Politicas.privacidade",
                                                )}
                                                className="block text-white text-xs leading-none transition-all opacity-70 hover:opacity-100"
                                            >
                                                Política de privacidade
                                            </Link>
                                        </li>

                                        <li className="text-white text-xs leading-none opacity-70">
                                            |
                                        </li>

                                        <li>
                                            <Link
                                                href={route(
                                                    "Politicas.cookies",
                                                )}
                                                className="block text-white text-xs leading-none transition-all opacity-70 hover:opacity-100"
                                            >
                                                Política de cookies
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>

                                <p className="block text-white text-xs leading-none  opacity-70 my-2 xl:mt-auto mx-auto text-center md:text-start">
                                    © 2026 <span className="whitespace-nowrap">Dell Anno</span> | Todos os direitos
                                    reservados.
                                </p>
                            </div>
                            <div className="flex justify-center xl:justify-end items-center gap-4 mb-2 mt-10 xl:mt-auto mx-auto xl:ml-auto">
                                <span className="text-white text-xs opacity-70">
                                    Desenvolvido por:{" "}
                                </span>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://www.8poroito.com.br/"
                                >
                                    <img
                                        src={octalLogo}
                                        alt="Octal Logo"
                                        className="opacity-50 w-20 xl:w-16 2xl:w-20"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {!notifyCookie || !rejectCookie ? (
                <CookieModal
                    acceptCookies={acceptCookies}
                    visible={notifyCookie ? false : true}
                />
            ) : null}
        </>
    );
};

export default DefaultLayout;
