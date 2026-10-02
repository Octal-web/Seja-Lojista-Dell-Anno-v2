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

export const StoreForm = () => {
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
        cep: "",
        politica: false,
        expectativa_investimento: "",
        possui_socio: "",
        cargo: "",

        origem: "",
        campanha: "",
        grupo: "",
        anuncio: "",
        entrada: "",
        posicao_formulario: "Rodapé",
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

    useFormTracking("rodape", data, [
        "nome",
        "telefone",
        "email",
        "cep",
        "cargo",
        "expectativa_investimento",
        "possui_socio",
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
            preserveScroll: (page) =>
                Object.keys(page.props.errors ?? {}).length > 0,

            onSuccess: () => {
                reset(
                    "nome",
                    "telefone",
                    "telefone_confirmation",
                    "email",
                    "cep",
                    "politica",
                    "expectativa_investimento",
                    "possui_socio",
                    "cargo",
                );

                setTermsVisible(false);
            },
        });
    };

    const inputClassName = `input-style`;

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
            id="orcamento-final"
            aria-labelledby="lojista-final-lojista-form-title"
            className="pt-16 xl:pt-20 2xl:pt-44"
        >
            <div className="container max-w-large">
                <div className="flex flex-col justify-center gap-10 xl:gap-[73px]">
                    <div ref={contentRef}>
                        <Title
                            id="lojista-final-lojista-form-title"
                            as="h2"
                            variant="display"
                            weight="light"
                            className=" text-primary uppercase"
                        >
                            Quero abrir uma loja <span className="whitespace-nowrap">Dell Anno</span>
                        </Title>

                        <Text
                            id="lojista-final-lojista-form-description"
                            as="p"
                            variant="subtitle"
                            weight="bold"
                            className="!text-black mt-5 text-justify md:text-start"
                        >
                            Preencha seus dados e converse com a equipe de
                            expansão sobre a disponibilidade da sua região.
                        </Text>
                        <Text
                            id="lojista-final-details"
                            as="p"
                            variant="bodySmall"
                            weight="light"
                            className="!text-black mt-2 text-justify md:text-start"
                        >
                            A partir das informações enviadas, a equipe poderá
                            avaliar o perfil do interessado para abertura de uma
                            loja <span className="whitespace-nowrap">Dell Anno</span>.
                        </Text>
                    </div>

                    <div ref={formWrapperRef}>
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            aria-labelledby="lojista-final-lojista-form-title"
                            aria-describedby="lojista-final-lojista-form-description lojista-final-details"
                            aria-busy={processing}
                            id="form_DellAnno_Sejalojista26'_rodape"
                        >
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-5 md:flex-row md:gap-6 lg:gap-x-28">
                                    <div className="w-full">
                                        <label htmlFor="lojista-final-nome">Nome*</label>

                                        <input
                                            id="lojista-final-nome"
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
                                                    ? "lojista-final-nome-error"
                                                    : undefined
                                            }
                                            className={inputClassName}
                                        />

                                        <div id="lojista-final-nome-error">
                                            <ErrorMessage field="nome" />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="lojista-final-email">E-mail*</label>

                                        <input
                                            id="lojista-final-email"
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
                                                    ? "lojista-final-email-error"
                                                    : undefined
                                            }
                                            className={inputClassName}
                                        />

                                        <div id="lojista-final-email-error">
                                            <ErrorMessage field="email" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5 md:gap-6 xl:gap-x-28">
                                    <div className="grid md:grid-cols-2 gap-5 md:gap-10">
                                        <div className="w-full">
                                            <label htmlFor="lojista-final-telefone">
                                                Telefone*
                                            </label>

                                            <InputMask
                                                id="lojista-final-telefone"
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
                                                        ? "lojista-final-telefone-error"
                                                        : undefined
                                                }
                                                className={inputClassName}
                                            />

                                            <div id="lojista-final-telefone-error">
                                                <ErrorMessage field="telefone" />
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <label htmlFor="lojista-final-telefone_confirmation">
                                                Confirme seu telefone*
                                            </label>

                                            <InputMask
                                                id="lojista-final-telefone_confirmation"
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
                                                        ? "lojista-final-telefone_confirmation-error"
                                                        : undefined
                                                }
                                                className={inputClassName}
                                            />

                                            <div id="lojista-final-telefone_confirmation-error">
                                                <ErrorMessage field="telefone_confirmation" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-5 md:gap-10">
                                        <div className="w-full md:col-span-1">
                                            <label htmlFor="lojista-final-cep">
                                                Seu CEP*
                                            </label>

                                            <InputMask
                                                id="lojista-final-cep"
                                                type="text"
                                                name="cep"
                                                mask="_____-___"
                                                replacement={{
                                                    _: /\d/,
                                                }}
                                                value={data.cep}
                                                onChange={handleChange}
                                                placeholder="Seu CEP"
                                                inputMode="numeric"
                                                autoComplete="postal-code"
                                                aria-required="true"
                                                aria-invalid={Boolean(
                                                    errors.cep,
                                                )}
                                                aria-describedby={
                                                    errors.cep
                                                        ? "lojista-final-cep-error"
                                                        : undefined
                                                }
                                                className={inputClassName}
                                            />

                                            <div id="lojista-final-cep-error">
                                                <ErrorMessage field="cep" />
                                            </div>
                                        </div>
                                    
                                        <div className="w-full md:col-span-2">
                                            <label htmlFor="lojista-final-cargo">
                                                Profissão*
                                            </label>

                                            <input
                                                id="lojista-final-cargo"
                                                type="text"
                                                name="cargo"
                                                value={data.cargo}
                                                onChange={handleChange}
                                                placeholder="Sua profissão"
                                                aria-required="true"
                                                aria-invalid={Boolean(
                                                    errors.cargo,
                                                )}
                                                aria-describedby={
                                                    errors.cargo
                                                        ? "lojista-final-cargo-error"
                                                        : undefined
                                                }
                                                className={inputClassName}
                                            />

                                            <div id="lojista-final-cargo-error">
                                                <ErrorMessage field="cargo" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-5 md:flex-row md:gap-6 xl:gap-x-28">
                                    <FormSelect
                                        id="lojista-final-expectativa_investimento"
                                        name="expectativa_investimento"
                                        label="Qual o seu orçamento disponível para investir?*"
                                        options={investmentOptions}
                                        value={data.expectativa_investimento}
                                        errors={errors}
                                        onChange={handleSelectChange}
                                    />
                                    <FormSelect
                                        id="lojista-final-possui_socio"
                                        name="possui_socio"
                                        label="Você terá um sócio investidor?*"
                                        options={partnerOptions}
                                        value={data.possui_socio}
                                        errors={errors}
                                        onChange={handleSelectChange}
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

                            <div className="mt-6 xl:mt-14 font-secondary">
                                <div
                                    id="lojista-final-lojista-terms"
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
                                            id="lojista-final-politica"
                                            type="checkbox"
                                            name="politica"
                                            checked={data.politica}
                                            onChange={handleChange}
                                            aria-required="true"
                                            aria-labelledby="lojista-final-politica-label lojista-final-politica-termos-button lojista-final-politica-conjuncao lojista-final-politica-privacidade-link"
                                            aria-invalid={Boolean(errors.politica)}
                                            aria-describedby={
                                                errors.politica
                                                    ? "lojista-final-politica-error"
                                                    : undefined
                                            }
                                            className="peer w-5 h-5 bg-white border-2 border-neutral-500 checked:bg-white checked:border-neutral-600 checked:bg-[length:0_0] checked:hover:bg-white checked:hover:border-neutral-600 checked:focus:bg-white checked:focus:border-neutral-600 !outline-0 !ring-0 !ring-offset-0"
                                        />

                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-1 bg-black opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                                        />
                                    </label>

                                    <div className="max-sm:text-sm">
                                        <label id="lojista-final-politica-label" htmlFor="lojista-final-politica" className="!mb-0 cursor-pointer max-sm:text-sm mr-1">Aceito os </label>

                                        <button
                                            id="lojista-final-politica-termos-button"
                                            type="button"
                                            aria-expanded={termsVisible}
                                            aria-controls="lojista-final-lojista-terms"
                                            onClick={() => {
                                                setTermsVisible(
                                                    (currentState) => !currentState,
                                                );
                                            }}
                                            className="underline underline-offset-2 transition-opacity hover:opacity-70"
                                        > 
                                            Termos de Uso
                                        </button>

                                        <span id="lojista-final-politica-conjuncao"> e a </span>

                                        <a
                                            id="lojista-final-politica-privacidade-link"
                                            href={route("Politicas.privacidade")}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline underline-offset-2 transition-opacity hover:opacity-70"
                                        >
                                            Política de Privacidade
                                        </a>
                                    </div>
                                </div>

                                <div id="lojista-final-politica-error">
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
                                    className="mt-5 text-xs md:text-sm leading-relaxed text-green-700"
                                >
                                    Seus dados foram enviados com sucesso. Nossa
                                    equipe entrará em contato.
                                </Text>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="button-style px-3 md:px-9 mt-11 !mx-0"
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
            </div>
        </section>
    );
};
