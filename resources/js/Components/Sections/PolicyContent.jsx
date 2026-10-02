import { useEffect } from "react";
import { Title } from "@/Components/ui/Title";

function slideUp(element, duration = 200) {
    element.style.height = element.offsetHeight + "px";
    element.style.transitionProperty = "height, margin, padding";
    element.style.transitionDuration = duration + "ms";

    requestAnimationFrame(() => {
        element.style.height = 0;
        element.style.paddingTop = 0;
        element.style.paddingBottom = 0;
        element.style.marginTop = 0;
        element.style.marginBottom = 0;
    });

    setTimeout(() => {
        element.style.display = "none";
        element.style.removeProperty("height");
        element.style.removeProperty("padding-top");
        element.style.removeProperty("padding-bottom");
        element.style.removeProperty("margin-top");
        element.style.removeProperty("margin-bottom");
        element.style.removeProperty("transition-duration");
        element.style.removeProperty("transition-property");
    }, duration);
}

function slideDown(element, duration = 200) {
    element.style.removeProperty("display");
    let display = window.getComputedStyle(element).display;

    if (display === "none") display = "block";

    element.style.display = display;

    let height = element.offsetHeight;

    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;

    requestAnimationFrame(() => {
        element.style.transitionProperty = "height, margin, padding";
        element.style.transitionDuration = duration + "ms";
        element.style.height = height + "px";
        element.style.removeProperty("padding-top");
        element.style.removeProperty("padding-bottom");
        element.style.removeProperty("margin-top");
        element.style.removeProperty("margin-bottom");
    });

    setTimeout(() => {
        element.style.removeProperty("height");
        element.style.removeProperty("transition-duration");
        element.style.removeProperty("transition-property");
    }, duration);
}

export function PolicyContent({ content }) {

    useEffect(() => {
        const form = document.querySelector(".et_pb_contact");
        const feedback = document.querySelector(".et_pb_contact--feedback");
        const button = document.querySelector(".et_builder_submit_button");

        if (button && form && feedback) {

            const handleClick = (e) => {
                e.preventDefault();
                
                slideUp(form, 200);
                slideDown(feedback, 200);
            };

            button.addEventListener("click", handleClick);

            return () => button.removeEventListener("click", handleClick);
        }
    }, [content.texto]);

    return (
        <section className="my-24">
            <div className="container max-w-medium">
                <Title level="4" className="mb-6 md:mb-10 uppercase">
                    {content.titulo}
                </Title>

                <div
                    className="text-sm sm:text-base md:leading-relaxed [&_ol_li]:list-decimal [&_ol_li]:list-inside [&_ul_li]:list-[circle] [&_ul_li]:list-inside [&_li+li]:mt-2 [&_ul+p]:mt-4 [&_table]:mt-2 [&_table_td]:border [&_table_td]:border-primary [&_.apart-container]:mt-5 [&_.apart-container]:flex [&_.apart-container]:flex-wrap [&_.apart-container]:items-start [&_.apart-container]:px-3 md:[&_.apart-container\_\_part]:w-1/2 md:[&_.apart-container\_\_part]:px-3 [&_.steps\_\_step]:flex [&_.steps\_\_step]:items-start [&_.steps\_\_step]:mb-8 [&_.form\_\_submit]:block [&_.form\_\_submit]:w-fit [&_.form\_\_submit]:leading-snug [&_.form\_\_submit]:text-center [&_.form\_\_submit]:py-2.5 [&_.form\_\_submit]:px-6 [&_.form\_\_submit]:bg-primary [&_.form\_\_submit]:text-white [&_.form\_\_submit]:min-w-56 [&_.form\_\_submit]:transition-all [&_.form\_\_submit]:duration-200 [&_.form\_\_submit]:md:text-base [&_.form\_\_submit]:2xl:text-lg [&_.et\_pb\_contact]:px-1 [&_.et\_pb\_contact\_field\_checkbox]:flex [&_.et\_pb\_contact\_field\_checkbox]:gap-1 [&_.et\_pb\_contact]:overflow-hidden [&_a]:underline"
                    dangerouslySetInnerHTML={{ __html: content.texto }}
                />
            </div>
        </section>
    );
}
