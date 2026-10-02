import { useEffect, useRef } from "react";

const DEBOUNCE_MS = 900;

export const useFormTracking = (formulario, data, fields) => {
    const timeoutRef = useRef(null);
    const lastSentRef = useRef(null);

    const values = fields.map((field) => data[field]);

    useEffect(() => {
        if (typeof window === "undefined" || !window.axios) {
            return undefined;
        }

        const payload = fields.reduce((acc, field) => {
            acc[field] = data[field];

            return acc;
        }, {});

        const serialized = JSON.stringify(payload);

        if (serialized === lastSentRef.current) {
            return undefined;
        }

        const hasValue = Object.values(payload).some(
            (value) => value !== "" && value !== null && value !== false,
        );

        if (!hasValue) {
            return undefined;
        }

        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            lastSentRef.current = serialized;

            window.axios
                .post(route("Tracking.formulario"), {
                    formulario,
                    dados: payload,
                })
                .catch(() => {});
        }, DEBOUNCE_MS);

        return () => window.clearTimeout(timeoutRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formulario, ...values]);
};
