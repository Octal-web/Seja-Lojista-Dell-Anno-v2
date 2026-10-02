import { Head, Link } from "@inertiajs/react";

import logo from "@/imgs/site/logo.svg";
import favicon from "@/imgs/favicon.ico";

const errors = {
    503: () => "Desculpe, estamos em manutenção. Volte em breve.",
    500: () => "Ops, algo deu errado em nossos servidores.",
    404: (url) =>
        `Desculpe, a página que você está procurando "<strong>${url}</strong>" não foi encontrada.`,
    403: (url) =>
        `Você não tem permissão para acessar esta página: <strong>${url}</strong>.`,
};

const Page = ({ status }) => {
    const handleRedirect = () => {
        // const isManager = window.location.pathname.startsWith("/manager");

        // if (isManager) return "Manager.Home.index";

        return "Home.index";
    };

    return (
        <>
            <Head>
                <title>Dell Anno | Error</title>
                <link rel="icon" href={favicon} type="image/x-icon" />
            </Head>

            <main
                aria-labelledby="error-page-title"
                className="min-h-screen flex items-center justify-center container max-w-large"
            >
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
                >
                </div>
                <div className="text-center">
                    <img
                        src={logo}
                        alt="Dell Anno"
                        className="mx-auto block max-w-[30%] mb-10"
                    />
                    <h1
                        id="error-page-title"
                        className="text-9xl md:text-[300px] font-bold"
                    >
                        {status}
                    </h1>

                    <p
                        className="text-base md:text-xl mb-20 text-gray-600"
                        role="status"
                        dangerouslySetInnerHTML={{
                            __html: errors[status](window.location.pathname),
                        }}
                    />

                    <Link
                        href={route(handleRedirect())}
                        aria-label="Voltar para a página inicial"
                        className="button-style px-10"
                    >
                        Voltar
                    </Link>
                </div>
            </main>
        </>
    );
};

export default Page;
