import { useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";
import { Text } from "./ui/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { withBrandNowrap } from "@/Utils/brandName";

export const Doubt = ({ index, doubt }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const questionId = `faq-question-${doubt.id ?? index}`;
    const answerId = `faq-answer-${doubt.id ?? index}`;

    useEffect(() => {
        const handleResize = () => {
            if (!isOpen) return;

            setIsOpen(false);

            requestAnimationFrame(() => {
                setIsOpen(true);
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isOpen]);

    return (
        <article
            className={`overflow-hidden py-6 ${isOpen ? "bg-black" : "bg-white border-b border-[#DDDDDD]"} transition-colors duration-300`}
        >
            <h3>
                <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => {
                        setIsOpen((current) => !current);
                    }}
                    className={[
                        "flex w-full items-center gap-5 text-left",
                        "px-4 sm:px-7",
                    ].join(" ")}
                >
                    <Text
                        as="span"
                        variant="none"
                        weight="bold"
                        className={`flex-1 text-base sm:text-lg leading-snug  lg:text-xl 2xl:text-[20px] ${isOpen && "text-white"}`}
                    >
                        {withBrandNowrap(doubt.title)}
                    </Text>

                    <FontAwesomeIcon
                        size={28}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className={[
                            "shrink-0 text-[#C9C9C9] transition-transform duration-300",
                            isOpen ? "rotate-180 text-white" : "",
                        ].join(" ")}
                        icon={faCaretDown}
                    />
                </button>
            </h3>

            <div
                id={answerId}
                ref={contentRef}
                role="region"
                aria-labelledby={questionId}
                aria-hidden={!isOpen}
                className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                style={{
                    maxHeight: isOpen
                        ? `${contentRef.current?.scrollHeight ?? 0}px`
                        : "0px",
                }}
            >
                <div className="p-4 sm:px-7 sm:pt-0">
                    <Text
                        as="p"
                        variant="none"
                        weight="light"
                        className={`max-w-[780px] text-xs sm:text-base leading-[1.8] md:text-base ${isOpen && "text-white"}`}
                    >
                        {withBrandNowrap(doubt.text)}
                    </Text>
                </div>
            </div>
        </article>
    );
};