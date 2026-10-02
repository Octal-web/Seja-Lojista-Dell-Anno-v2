import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

import { InputMask } from "@react-input/mask";

import { Text } from "../ui/Text";
import { Title } from "../ui/Title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FormSelect } from "../ui/FormSelect";
import { useFormTracking } from "@/Hooks/useFormTracking";

gsap.registerPlugin(ScrollTrigger);

const investmentOptions = [
    { value: "1", label: "Entre R$ 900.000,00 a R$ 1.500.000,00" },
    { value: "2", label: "Entre R$ 1.500.000,00 a R$ 3.000.000,00" },
];

const partnerOptions = [
    { value: true, label: "Sim, terei um sócio investidor" },
    { value: false, label: "Não, irei investir sozinho" },
];

export const StoreFirstForm = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const formWrapperRef = useRef(null);
    const termsRef = useRef(null);

    const [phoneMask, setPhoneMask] = useState("(__) ____-____");
    const [phoneConfirmationMask, setPhoneConfirmationMask] = useState("(__) ____-____");
    const [termsVisible, setTermsVisible] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
        reset,
        recentlySuccessful,
    } = useForm({
        nome: "",
        telefone: "",
        telefone_confirmation: "",
        email: "",
        politica: false,
        expectativa_investimento: "",

        origem: "",
        campanha: "",
        grupo: "",
        anuncio: "",
        entrada: "",
        posicao_formulario: "Topo Página",
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const now = new Date();

        now.setHours(now.getHours() - 3);

        const entrada = now.toISOString().slice(0, 19).replace("T", " ");

        setData((currentData) => ({
            ...currentData,

            origem: params.get("origin") || params.get("utm_source") || "",

            campanha:
                params.get("campaign") || params.get("utm_campaign") || "",

            grupo:
                params.get("group") ||
                params.get("utm_group") ||
                params.get("utm_medium") ||
                "",

            anuncio: params.get("ad") || params.get("utm_content") || "",

            entrada,
        }));
    }, []);

    useFormTracking("topo", data, [
        "nome",
        "telefone",
        "email",
        "expectativa_investimento",
        "politica",
    ]);

    useEffect(() => {
        const numbers = data.telefone.replace(/\D/g, "");

        setPhoneMask(
            numbers.length >= 10 ? "(__) _____-____" : "(__) ____-____",
        );
    }, [data.telefone]);

    useEffect(() => {
        const numbers = data.telefone_confirmation.replace(/\D/g, "");

        setPhoneConfirmationMask(
            numbers.length >= 10 ? "(__) _____-____" : "(__) ____-____",
        );
    }, [data.telefone_confirmation]);

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([contentRef.current, formWrapperRef.current], {
                    x: 0,
                    opacity: 1,
                });

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 72%",
                    once: true,
                },
            });

            timeline.fromTo(
                contentRef.current,
                {
                    x: -35,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.75,
                    ease: "power2.out",
                },
            );

            timeline.fromTo(
                formWrapperRef.current,
                {
                    x: 35,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "-=0.55",
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setData(name, type === "checkbox" ? checked : value);

        clearErrors(name);
    };

    const handleSelectChange = (name, option) => {
        setData(name, option?.value ?? "");
        clearErrors(name);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post(route("Lojistas.enviar"), {
            preserveScroll: (page) => Object.keys(page.props.errors ?? {}).length > 0,

            onSuccess: () => {
                reset(
                    "nome",
                    "telefone",
                    "telefone_confirmation",
                    "email",
                    "politica",
                    "expectativa_investimento",
                );

                setTermsVisible(false);
            },
        });
    };

    const inputClassName = `input-style !px-4 max-md:!h-10`;

    const ErrorMessage = ({ field }) => {
        if (!errors[field]) return null;

        return (
            <Text
                as="p"
                variant="none"
                weight="normal"
                role="alert"
                className="mt-1.5 bg-red-900 px-3 py-1.5 text-xs leading-snug !text-white"
            >
                {errors[field]}
            </Text>
        );
    };

    return (
        <section
            ref={sectionRef}
            id="orcamento"
            aria-labelledby="lojista-topo-lojista-form-title"
            className="w-full scroll-mt-32 text-white [&_label]:!text-white bg-black/25 p-5 shadow-2xl shadow-black/30 backdrop-blur-lg sm:p-8"
        >
                <div className="flex flex-col gap-5 md:gap-6">
                    <div ref={contentRef}>
                        <Title
                            id="lojista-topo-lojista-form-title"
                            as="h2"
                            variant="card"
                            weight="light"
                            className="!text-white uppercase"
                        >
                            Quero abrir uma loja <span className="whitespace-nowrap">Dell Anno</span>
                        </Title>

                        <Text
                            id="lojista-topo-lojista-form-description"
                            as="p"
                            variant="bodySmall"
                            weight="light"
                            className="!text-white mt-2"
                        >
                            Preencha seus dados e converse com a equipe de
                            expansão sobre a disponibilidade da sua região.
                        </Text>
                    </div>

                    <div ref={formWrapperRef}>
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            aria-labelledby="lojista-topo-lojista-form-title"
                            aria-describedby="lojista-topo-lojista-form-description"
                            aria-busy={processing}
                            id="form_DellAnno_Sejalojista26'_topo"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4">
                                    <div className="w-full">
                                        <label htmlFor="lojista-topo-nome">Nome*</label>

                                        <input
                                            id="lojista-topo-nome"
                                            type="text"
                                            name="nome"
                                            value={data.nome}
                                            onChange={handleChange}
                                            placeholder="Seu nome completo"
                                            autoComplete="name"
                                            aria-required="true"
                                            aria-invalid={Boolean(errors.nome)}
                                            aria-describedby={
                                                errors.nome
                                                    ? "lojista-topo-nome-error"
                                                    : undefined
                                            }
                                            className={inputClassName}
                                        />

                                        <div id="lojista-topo-nome-error">
                                            <ErrorMessage field="nome" />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="lojista-topo-email">E-mail*</label>

                                        <input
                                            id="lojista-topo-email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            placeholder="Seu e-mail"
                                            autoComplete="email"
                                            aria-required="true"
                                            aria-invalid={Boolean(errors.email)}
                                            aria-describedby={
                                                errors.email
                                                    ? "lojista-topo-email-error"
                                                    : undefined
                                            }
                                            className={inputClassName}
                                        />

                                        <div id="lojista-topo-email-error">
                                            <ErrorMessage field="email" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label htmlFor="lojista-topo-telefone">
                                                Telefone*
                                            </label>

                                            <InputMask
                                                id="lojista-topo-telefone"
                                                type="tel"
                                                name="telefone"
                                                mask={phoneMask}
                                                replacement={{
                                                    _: /\d/,
                                                }}
                                                value={data.telefone}
                                                onChange={handleChange}
                                                placeholder="Seu telefone + DDD"
                                                autoComplete="tel"
                                                aria-required="true"
                                                aria-invalid={Boolean(
                                                    errors.telefone,
                                                )}
                                                aria-describedby={
                                                    errors.telefone
                                                        ? "lojista-topo-telefone-error"
                                                        : undefined
                                                }
                                                className={inputClassName}
                                            />

                                            <div id="lojista-topo-telefone-error">
                                                <ErrorMessage field="telefone" />
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <label htmlFor="lojista-topo-telefone_confirmation">
                                                Confirme seu telefone*
                                            </label>

                                            <InputMask
                                                id="lojista-topo-telefone_confirmation"
                                                type="tel"
                                                name="telefone_confirmation"
                                                mask={phoneConfirmationMask}
                                                replacement={{ _: /\d/ }}
                                                value={data.telefone_confirmation}
                                                onChange={handleChange}
                                                placeholder="Repita seu telefone + DDD"
                                                autoComplete="off"
                                                aria-required="true"
                                                aria-invalid={Boolean(errors.telefone_confirmation)}
                                                aria-describedby={
                                                    errors.telefone_confirmation
                                                        ? "lojista-topo-telefone_confirmation-error"
                                                        : undefined
                                                }
                                                className={inputClassName}
                                            />

                                            <div id="lojista-topo-telefone_confirmation-error">
                                                <ErrorMessage field="telefone_confirmation" />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="flex flex-col gap-4">
                                    <FormSelect
                                        id="lojista-topo-expectativa_investimento"
                                        name="expectativa_investimento"
                                        label="Qual o seu orçamento disponível para investir?*"
                                        options={investmentOptions}
                                        value={data.expectativa_investimento}
                                        errors={errors}
                                        onChange={handleSelectChange}
                                        compact
                                        boxed
                                    />
                                </div>
                            </div>

                            <input
                                type="hidden"
                                name="origem"
                                value={data.origem}
                            />

                            <input
                                type="hidden"
                                name="campanha"
                                value={data.campanha}
                            />

                            <input
                                type="hidden"
                                name="grupo"
                                value={data.grupo}
                            />

                            <input
                                type="hidden"
                                name="anuncio"
                                value={data.anuncio}
                            />

                            <input
                                type="hidden"
                                name="entrada"
                                value={data.entrada}
                            />

                            <input
                                type="hidden"
                                name="posicao_formulario"
                                value={data.posicao_formulario}
                            />

                            <div className="mt-6 font-secondary">
                                <div
                                    id="lojista-topo-lojista-terms"
                                    ref={termsRef}
                                    aria-hidden={!termsVisible}
                                    className={[
                                        "overflow-hidden bg-black text-[10px] leading-tight text-custom-gray transition-all duration-300",
                                        termsVisible ? "mb-3" : "mb-0",
                                    ].join(" ")}
                                    style={{
                                        maxHeight: termsVisible
                                            ? `${termsRef.current?.scrollHeight ?? 0}px`
                                            : "0px",
                                    }}
                                >
                                    <div className="px-5 py-3">
                                        <p>
                                            Ao enviar, você confirma a
                                            veracidade das informações prestadas
                                            neste formulário, bem como autoriza
                                            a UNICASA a verificar tais dados.
                                            Esteja ciente que o preenchimento de
                                            formulário não implica em nenhum
                                            compromisso para ambas as partes, em
                                            especial, não os obriga à assinatura
                                            de qualquer documento ou
                                            compromisso, sendo as informações
                                            aqui fornecidas meramente cadastrais
                                            e estritamente comerciais. Além
                                            disso, você concorda com a
                                            utilização dos seus dados pela
                                            fabricante e lojas autorizadas. A
                                            Unicasa se compromete a tratar seus
                                            dados pessoais dispostos no
                                            formulário em conformidade com a Lei
                                            Geral de Proteção de Dados, Lei nº
                                            13.709/2018, sendo eliminados de
                                            maneira segura após o tempo
                                            necessário. Para mais informações,
                                            consulte nossa Política de
                                            Privacidade, disponível no site.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <label className="relative mt-0.5 flex shrink-0">
                                        <input
                                            id="lojista-topo-politica"
                                            type="checkbox"
                                            name="politica"
                                            checked={data.politica}
                                            onChange={handleChange}
                                            aria-required="true"
                                            aria-labelledby="lojista-topo-politica-label lojista-topo-politica-termos-button lojista-topo-politica-conjuncao lojista-topo-politica-privacidade-link"
                                            aria-invalid={Boolean(errors.politica)}
                                            aria-describedby={
                                                errors.politica
                                                    ? "lojista-topo-politica-error"
                                                    : undefined
                                            }
                                            className="peer w-5 h-5 bg-white border-2 border-neutral-500 checked:bg-white checked:border-neutral-600 checked:bg-[length:0_0] checked:hover:bg-white checked:hover:border-neutral-600 checked:focus:bg-white checked:focus:border-neutral-600 !outline-0 !ring-0 !ring-offset-0"
                                        />

                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-1 bg-black opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                                        />
                                    </label>

                                    <div className="max-sm:text-sm text-white">
                                        <label id="lojista-topo-politica-label" htmlFor="lojista-topo-politica" className="!mb-0 cursor-pointer max-sm:text-sm mr-1">Aceito os </label>

                                        <button
                                            id="lojista-topo-politica-termos-button"
                                            type="button"
                                            aria-expanded={termsVisible}
                                            aria-controls="lojista-topo-lojista-terms"
                                            onClick={() => {
                                                setTermsVisible(
                                                    (currentState) => !currentState,
                                                );
                                            }}
                                            className="underline underline-offset-2 transition-opacity hover:opacity-70"
                                        > 
                                            Termos de Uso
                                        </button>

                                        <span id="lojista-topo-politica-conjuncao"> e a </span>

                                        <a
                                            id="lojista-topo-politica-privacidade-link"
                                            href={route("Politicas.privacidade")}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline underline-offset-2 transition-opacity hover:opacity-70"
                                        >
                                            Política de Privacidade
                                        </a>
                                    </div>
                                </div>

                                <div id="lojista-topo-politica-error">
                                    <ErrorMessage field="politica" />
                                </div>
                            </div>

                            {recentlySuccessful && (
                                <Text
                                    as="p"
                                    variant="none"
                                    weight="medium"
                                    role="status"
                                    aria-live="polite"
                                    className="mt-5 text-xs md:text-sm leading-relaxed text-green-300"
                                >
                                    Seus dados foram enviados com sucesso. Nossa
                                    equipe entrará em contato.
                                </Text>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="button-style w-full px-3 mt-6 !mx-0"
                            >
                                {processing ? (
                                    <>
                                        <span
                                            aria-hidden="true"
                                            className="absolute size-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary"
                                        />

                                        <span className="opacity-0">
                                            Quero falar com a equipe de expansão
                                        </span>
                                    </>
                                ) : (
                                    <span>
                                        Quero falar com a equipe de expansão
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
        </section>
    );
};
