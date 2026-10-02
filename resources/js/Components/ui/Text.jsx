import React, { forwardRef } from "react";

const variants = {
    eyebrow: "text-xs sm:text-sm uppercase tracking-[0.16em]",
    body: "text-xs sm:text-sm md:text-base leading-relaxed lg:text-lg",
    bodySmall: "text-sm leading-relaxed md:text-base",
    subtitle: "text-sm sm:text-base md:text-lg leading-relaxed lg:text-xl",
    lead: "text-lg sm:text-xl leading-[1.25] md:text-2xl",
    label: "text-xs uppercase tracking-wider",
    small: "text-xs leading-relaxed",
    base: "text-sm sm:text-base leading-relaxed",
    none: "",
};

const weights = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
};

export const Text = forwardRef(
    (
        {
            as: Component = "p",
            variant = "base",
            weight = "light",
            className = "",
            children,
            ...props
        },
        ref,
    ) => {
        const classes = [
            variants[variant] ?? variants.base,
            weights[weight] ?? weights.light,
            className,
            'font-secondary'
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <Component ref={ref} className={classes} {...props}>
                {children}
            </Component>
        );
    },
);

Text.displayName = "Text";
