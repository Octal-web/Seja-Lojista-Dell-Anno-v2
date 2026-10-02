import { Link, router } from "@inertiajs/react";

const variants = {
    white: "border-primary bg-white text-black hover:bg-primary hover:text-white",
    black: "bg-primary text-white hover:bg-white hover:text-primary hover:border hover:border-primary",
    primary:
        "border-primary bg-white text-primary hover:bg-primary hover:text-white",
};

const sizes = {
    sm: "min-h-10 px-5 py-2 text-sm",
    md: "min-h-11 min-w-56 px-3 md:px-10 py-2.5 text-sm sm:text-lg",
    lg: "min-h-12 min-w-60 px-12 py-3 text-base sm:text-xl",
};

export function LinkButton({
    children,
    variant = "primary",
    size = "md",
    className = "",
    href,
    closeOnClick,
    ...props
}) {
    // const rel =
    //     props.target === "_blank" && !props.rel
    //         ? "noopener noreferrer"
    //         : props.rel;

    const classes = [
        "inline-flex w-fit items-center justify-center border font-light leading-none text-center uppercase transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        className,
        'font-sans'
    ]
        .filter(Boolean)
        .join(" ");

    const handleClick = (e) => {
        if (!href.includes("#")) {
            return;
        }
        console.log(href.includes("#"));

        e.preventDefault();

        const url = new URL(href, window.location.origin);

        const hash = url.hash;
        url.hash = "";

        const targetUrl = url.href;
        const currentUrl = window.location.origin + window.location.pathname;

        const scrollToElement = () => {
            if (!hash) return;

            const element = document.querySelector(hash);
            if (!element) return;

            const headerHeight =
                document.querySelector(".header")?.offsetHeight ?? 0;

            if (window.lenis) {
                window.lenis.scrollTo(element, {
                    offset: -headerHeight,
                });
            } else {
                element.scrollIntoView({
                    behavior: "smooth",
                });
            }

            closeOnClick?.(false);
        };

        if (targetUrl === currentUrl) {
            scrollToElement();
            return;
        }

        router.visit(targetUrl, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(scrollToElement);
                });
            },
        });
    };

    return (
        <Link onClick={handleClick} className={classes} {...props}>
            {children}
        </Link>
    );
}
