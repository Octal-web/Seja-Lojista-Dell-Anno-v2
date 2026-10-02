import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

import { Title } from '@/Components/ui/Title';
import { Text } from '@/Components/ui/Text';

import { gsap } from 'gsap';

const CheckIcon = () => (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="21" cy="21" r="19" stroke="currentColor" strokeWidth="2.5" />
        <path d="M12.5 21.5L18.2 27.2L30.5 14.8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const Concluded = () => {
    const sectionRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (prefersReducedMotion) {
                gsap.set(cardRef.current, { y: 0, opacity: 1, scale: 1 });
                return;
            }

            gsap.fromTo(
                cardRef.current,
                { y: 28, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power2.out' }
            );
        }, sectionRef);

        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} aria-labelledby="conclusion-title" className="min-h-screen bg-white pb-20 md:pb-0">
            <div className="bg-primary py-12 text-white sm:py-16">
                <div className="container max-w-medium text-center">
                    <Title id="conclusion-title" as="h1" variant="section" className="text-white uppercase">
                        Quero ser lojista
                    </Title>
                </div>
            </div>

            <div className="container max-w-medium py-12 text-center sm:py-24">
                <div ref={cardRef} className="mx-auto max-w-[760px] rounded-[30px] bg-[#f5f5f5] px-5 py-12 opacity-0 sm:px-10 sm:py-16">
                    <div className="mx-auto mb-8 flex size-[82px] items-center justify-center rounded-full bg-secondary text-primary">
                        <CheckIcon />
                    </div>

                    <Title as="h2" variant="section" className="text-primary uppercase">
                        Cadastro feito com sucesso
                    </Title>

                    <Text as="p" variant="none" weight="light" className="mx-auto mt-6 text-base leading-[1.8] sm:text-lg">
                        Enquanto não retornamos o seu contato, conheça um pouco mais sobre a <span className="whitespace-nowrap">Dell Anno</span>.
                    </Text>
                    <iframe width="100%" height="415" src="https://www.youtube.com/embed/VyRDYkAZO4Y" title="YouTube video player" aria-label="Vídeo sobre a Dell Anno" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className="aspect-video py-8" />
                    {/* <Text as="p" variant="none" weight="light" className="mx-auto mt-5 max-w-[620px] text-sm leading-[1.8] sm:text-base">
                        A <span className="whitespace-nowrap">Dell Anno</span> é referência em móveis planejados no País, com inúmeras lojas autorizadas. Todos os pontos de venda da rede seguem o padrão da marca garantindo a excelência e qualidade dos produtos e serviços.
                    </Text> */}

                    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href={route('Home.index')}
                            className="w-fit items-center justify-center border font-normal leading-none text-center uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border-primary bg-primary text-white hover:bg-white hover:text-primary min-h-11 min-w-56 px-6 py-2.5 text-sm sm:text-lg flex gap-2 truncate xl:-my-2 xl:ml-2 xl:px-3 xl:text-base 2xl:px-6 2xl:text-lg"
                        >
                            Voltar para o site
                        </Link>

                        <a
                            href="https://dellanno.com.br/"
                            target="_blank"
                            className="w-fit items-center justify-center border font-normal leading-none text-center uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border-primary bg-white text-black hover:bg-primary hover:text-white min-h-11 min-w-56 px-6 py-2.5 text-sm sm:text-lg flex gap-2 truncate xl:-my-2 xl:ml-2 xl:px-3 xl:text-base 2xl:px-6 2xl:text-lg"
                        >
                            Conheça mais sobre a nossa marca
                    </a>
                    </div>
                </div>
            </div>
        </section>
    );
}