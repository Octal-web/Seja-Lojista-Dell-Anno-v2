import { useState } from "react";
import { Play } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { videoTestimonials } from "@/Data/videoTestimonials";
import { Title } from "../ui/Title";
import { Text } from "../ui/Text";
import { withBrandNowrap } from "@/Utils/brandName";

const slides = videoTestimonials.map((testimonial) => ({
    type: "youtube",
    ...testimonial,
}));

const videoPermissions =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export const VideoTestimonials = () => {
    const [index, setIndex] = useState(-1);

    return (
        <section
            id="depoimentos-em-video"
            aria-labelledby="video-testimonials-title"
            className="pt-20 sm:pt-24 xl:pt-32 2xl:pt-40"
        >
            <div className="container max-w-medium">
                <Title
                    id="video-testimonials-title"
                    as="h2"
                    variant="display"
                    className="mx-auto mb-8 max-w-[960px] text-center uppercase sm:mb-12"
                >
                    Histórias de sucesso escritas pelos lojistas{" "}
                    <span className="whitespace-nowrap">Dell Anno</span>
                </Title>

                <div className="aspect-video w-full bg-primary">
                    <iframe
                        className="h-full w-full border-0"
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/0bpUh6y1Prs"
                        title="Vídeo com histórias de sucesso de lojistas Dell Anno"
                        loading="lazy"
                        allow={videoPermissions}
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>

                <ul className="mt-6 grid grid-cols-1 gap-8 sm:mt-8 sm:grid-cols-3 sm:gap-5 lg:gap-8">
                    {videoTestimonials.map((testimonial, testimonialIndex) => (
                        <li key={testimonial.videoId}>
                            <button
                                type="button"
                                onClick={() => setIndex(testimonialIndex)}
                                aria-label={`Assistir depoimento em vídeo de ${testimonial.name}`}
                                aria-haspopup="dialog"
                                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                            >
                                <div className="relative aspect-video overflow-hidden bg-secondary">
                                    <img
                                        src={testimonial.image}
                                        alt={`${testimonial.name} - ${testimonial.description}`}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
                                    />
                                    <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/40 text-white transition-colors group-hover:bg-black/70 sm:h-10 sm:w-10 lg:h-14 lg:w-14">
                                            <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true" />
                                        </span>
                                    </span>
                                </div>
                                <Title as="h3" variant="card" weight="normal" className="mt-4 uppercase">
                                    {testimonial.name}
                                </Title>
                                <Text as="span" variant="bodySmall" className="mt-2 block">
                                    {withBrandNowrap(testimonial.description)}
                                </Text>
                                <Text as="span" variant="bodySmall" className="block">
                                    {testimonial.city}
                                </Text>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <Lightbox
                open={index >= 0}
                close={() => setIndex(-1)}
                index={Math.max(index, 0)}
                slides={slides}
                carousel={{ preload: 0 }}
                controller={{ closeOnBackdropClick: true }}
                labels={{ Close: "Fechar", Previous: "Anterior", Next: "Próximo" }}
                render={{
                    slide: ({ slide, offset }) =>
                        slide.type === "youtube" && offset === 0 ? (
                            <iframe
                                key={slide.videoId}
                                className="border-0 bg-black"
                                style={{ width: "min(100%, 1280px, calc((100dvh - 120px) * 16 / 9))", aspectRatio: "16 / 9" }}
                                src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=1&rel=0`}
                                title={`Depoimento de ${slide.name} — ${slide.city}`}
                                allow={videoPermissions}
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        ) : null,
                }}
            />
        </section>
    );
};
