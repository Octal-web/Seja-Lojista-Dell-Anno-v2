const BRAND_NAME = "Dell Anno";

export const withBrandNowrap = (text) => {
    if (typeof text !== "string" || !text.includes(BRAND_NAME)) {
        return text;
    }

    return text.split(BRAND_NAME).reduce((nodes, part, index, parts) => {
        nodes.push(part);

        if (index < parts.length - 1) {
            nodes.push(
                <span key={`dell-anno-${index}`} className="whitespace-nowrap">
                    {BRAND_NAME}
                </span>,
            );
        }

        return nodes;
    }, []);
};
