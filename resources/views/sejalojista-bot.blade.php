{{-- Conteúdo para crawlers alinhado à landing page Dell Anno Brasil.
     Ao alterar resources/js/Data/faqDoubts.js, atualizar também as perguntas abaixo. --}}
@php
    $pageUrl = url()->current();
    $siteUrl = 'https://dellanno.com.br/';
    $logoUrl = asset('site/img/dellanno-black.png');
    $faqs = [
        ['question' => 'Uma loja da Dell Anno segue o modelo de franquia?', 'answer' => 'Não, nossa loja de móveis planejados não é uma franquia. Trabalhamos com um sistema de revendas/lojas autorizadas do Grupo Unicasa, uma empresa de capital aberto listada na B3 que preza pela transparência corporativa. Abrir uma loja de móveis planejados sem o modelo tradicional de franquias oferece maior flexibilidade e autonomia na gestão do negócio, sem deixar de lado todo o respaldo técnico e de comunicação institucional.'],
        ['question' => 'Qual é a diferença entre franquia e loja própria autorizada?', 'answer' => 'Na franquia tradicional, normalmente existem regras mais rígidas, taxa de franquia e cobrança de royalties. Na loja própria autorizada Dell Anno, o lojista conduz a operação com mais autonomia, sem taxa de franquia e sem royalties, mas com suporte de uma marca nacional.'],
        ['question' => 'A fabricante cobra royalties ou taxa de payroll?', 'answer' => 'Não. Como o modelo Dell Anno não é baseado em franquia, não há cobrança de royalties nem taxa de payroll. Isso permite ao lojista preservar uma parcela maior da margem da operação, com mais flexibilidade para conduzir o negócio.'],
        ['question' => 'Preciso ser arquiteto ou designer de interiores?', 'answer' => 'Não precisa ser especialista em móveis planejados, mas é importante ter afinidade com o universo da arquitetura, decoração e alto padrão.'],
        ['question' => 'Qual é o perfil ideal para ser lojista Dell Anno?', 'answer' => 'O perfil ideal é de um empreendedor ou investidor com visão de longo prazo, capacidade de gestão, interesse comercial e disposição para desenvolver uma operação estruturada com uma marca nacional.'],
        ['question' => 'A Dell Anno oferece exclusividade de mercado?', 'answer' => 'A expansão é conduzida com análise estratégica das praças. A disponibilidade e as condições de atuação são avaliadas pela equipe de expansão conforme o potencial da região.'],
        ['question' => 'Como saber se minha cidade está disponível?', 'answer' => 'Após o cadastro, a equipe de expansão avalia a cidade de interesse, o potencial da região e a disponibilidade de praça para uma nova operação Dell Anno.'],
        ['question' => 'A Dell Anno ajuda na escolha do ponto comercial?', 'answer' => 'Sim. Durante o processo, a equipe avalia critérios como localização, visibilidade, acesso, perfil de consumo da região e adequação ao padrão de showroom da marca.'],
        ['question' => 'Como funciona o suporte para implantação da loja?', 'answer' => 'O suporte pode envolver orientação de expansão, projeto de showroom, treinamentos, alinhamento operacional, apoio comercial e acompanhamento para desenvolvimento da loja. A página atual também informa que o projeto de showroom é desenvolvido pelo escritório de arquitetura da Dell Anno.'],
        ['question' => 'A Dell Anno oferece apoio em marketing?', 'answer' => 'Sim. O lojista conta com orientações, materiais, diretrizes de comunicação e apoio para fortalecer a presença da marca na região.'],
        ['question' => 'O preenchimento do formulário garante a abertura da loja?', 'answer' => 'Não. O cadastro é uma etapa inicial de análise. A própria página atual informa que o envio das informações não implica compromisso obrigatório entre as partes.'],
        ['question' => 'A Dell Anno faz parte de qual grupo?', 'answer' => 'Ela faz parte do Grupo Unicasa, detentor das marcas Dell Anno, New Móveis e Casa Brasileira.'],
        ['question' => 'Por que a estrutura industrial própria é importante?', 'answer' => 'Porque oferece ao lojista o respaldo de uma indústria consolidada, com produção própria, tecnologia e capacidade para apoiar operações de móveis planejados em diferentes regiões.'],
        ['question' => 'Como faço para falar com a equipe de expansão?', 'answer' => 'Preencha o formulário de interesse na landing page. A equipe de expansão entrará em contato para entender seu perfil, sua cidade de interesse e os próximos passos.'],
    ];
    $organization = [
        '@type' => 'Organization',
        '@id' => $siteUrl . '#organization',
        'name' => 'Dell Anno',
        'url' => $siteUrl,
        'logo' => $logoUrl,
        'sameAs' => [
            'https://www.youtube.com/c/DellAnnoOficial',
            'https://br.pinterest.com/dellanno/',
            'https://www.facebook.com/DellAnnoOficial',
            'https://instagram.com/dellannooficial',
        ],
        'parentOrganization' => [
            '@type' => 'Organization',
            'name' => 'Unicasa Indústria de Móveis S/A',
        ],
    ];
    $structuredData = [
        '@context' => 'https://schema.org',
        '@graph' => [
            $organization,
            [
                '@type' => 'WebPage',
                '@id' => $pageUrl . '#webpage',
                'name' => $title,
                'url' => $pageUrl,
                'description' => $description,
                'inLanguage' => 'pt-BR',
                'isPartOf' => [
                    '@type' => 'WebSite',
                    'name' => 'Dell Anno Brasil',
                    'url' => $siteUrl,
                ],
                'about' => ['@id' => $organization['@id']],
            ],
            [
                '@type' => 'FAQPage',
                '@id' => $pageUrl . '#faq',
                'mainEntity' => array_map(fn ($faq) => [
                    '@type' => 'Question',
                    'name' => $faq['question'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => $faq['answer'],
                    ],
                ], $faqs),
            ],
        ],
    ];
@endphp
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title }}</title>
    <meta name="description" content="{{ $description }}">
    <link rel="canonical" href="{{ $pageUrl }}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Octal Web">
    <meta property="og:url" content="{{ $pageUrl }}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:image" content="{{ $logoUrl }}">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="Dell Anno Brasil">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $title }}">
    <meta name="twitter:description" content="{{ $description }}">
    <meta name="twitter:image" content="{{ $logoUrl }}">
    <script type="application/ld+json">{!! json_encode($structuredData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) !!}</script>
    <style>
        body { font-family: sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem; color: #1a1a1a; line-height: 1.6; }
        h1 { font-size: 2rem; }
        h2 { font-size: 1.4rem; margin-top: 2rem; }
        h3 { font-size: 1.1rem; }
        .faq-item { margin-bottom: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 1.5rem; }
    </style>
</head>
<body>
<header>
    <a href="{{ $siteUrl }}"><img src="{{ $logoUrl }}" alt="Dell Anno Brasil" width="200"></a>
</header>
<main>
    <h1>Seja Lojista Dell Anno</h1>
    <p>A Dell Anno abre suas portas para que você faça parte da realização de muitos e muitos sonhos.</p>
    <section aria-labelledby="sobre-marca">
        <h2 id="sobre-marca">Sobre a Dell Anno</h2>
        <p>Da escolha de acabamentos e cores às configurações, a marca oferece recursos para que cada projeto seja desenvolvido de acordo com suas particularidades e complexidade.</p>
        <p>A Dell Anno integra o Grupo Unicasa, empresa de capital aberto listada no Novo Mercado da B3, com mais de 40 anos de atuação no setor moveleiro e uma estrutura industrial de alta tecnologia.</p>
        <p>Com um parque fabril de mais de 50 mil m² e uma planta robotizada, ela está entre as maiores e mais modernas fabricantes de móveis planejados do mundo, reunindo escala e tecnologia para sustentar a produção de suas marcas.</p>
    </section>
    <section aria-labelledby="modelo">
        <h2 id="modelo">Modelo de loja própria autorizada</h2>
        <p>O modelo de loja própria autorizada se diferencia do formato de franquia: não há cobrança de royalties ou taxa de franquia.</p>
        <p>O perfil ideal é de um empreendedor ou investidor com visão de longo prazo, capacidade de gestão, interesse comercial e disposição para desenvolver uma operação estruturada com uma marca nacional.</p>
    </section>
    <section aria-labelledby="suporte">
        <h2 id="suporte">Diferenciais exclusivos Dell Anno</h2>
        <p>O lojista conta com acompanhamento em diferentes etapas, desde a implantação da loja até o fortalecimento comercial da unidade no mercado local.</p>
        <ul>
            <li>Orientação para escolha do ponto comercial e estruturação do showroom.</li>
            <li>Projeto de showroom desenvolvido pelo escritório de arquitetura da Dell Anno.</li>
            <li>Treinamentos, alinhamento operacional e apoio comercial.</li>
            <li>Orientações, materiais e diretrizes de comunicação para fortalecer a presença da marca na região.</li>
        </ul>
    </section>
    <section aria-labelledby="expansao">
        <h2 id="expansao">Expansão Dell Anno no Brasil</h2>
        <p>A expansão é conduzida com análise estratégica das praças. A disponibilidade e as condições de atuação são avaliadas pela equipe de expansão conforme o potencial da região.</p>
        <p>Após o cadastro, a equipe de expansão avalia a cidade de interesse, o potencial da região e a disponibilidade de praça para uma nova operação Dell Anno.</p>
    </section>
    <section aria-labelledby="investimento">
        <h2 id="investimento">Orçamento disponível para investir</h2>
        <p>O formulário de interesse apresenta as seguintes faixas de orçamento disponível:</p>
        <ul>
            <li>Entre R$ 900.000,00 e R$ 1.500.000,00.</li>
            <li>Entre R$ 1.500.000,00 e R$ 3.000.000,00.</li>
        </ul>
    </section>
    <section aria-labelledby="faq">
        <h2 id="faq">Perguntas frequentes</h2>
        @foreach ($faqs as $faq)
            <div class="faq-item">
                <h3>{{ $faq['question'] }}</h3>
                <p>{{ $faq['answer'] }}</p>
            </div>
        @endforeach
    </section>
    <section aria-labelledby="orcamento">
        <h2 id="orcamento">Abra sua loja Dell Anno</h2>
        <p>Preencha seus dados e converse com a equipe de expansão sobre a disponibilidade da sua região. A partir das informações enviadas, a equipe poderá avaliar o perfil do interessado para abertura de uma nova loja Dell Anno.</p>
        <p>O envio das informações não implica compromisso obrigatório entre as partes.</p>
        <p><a href="{{ route('Home.index') }}#orcamento">Fale com a equipe de expansão Dell Anno</a></p>
    </section>
</main>
<footer>
    <p><a href="{{ $siteUrl }}">Dell Anno Brasil</a> — Grupo Unicasa</p>
    <p>
        <a href="{{ route('Politicas.privacidade') }}">Política de privacidade</a> |
        <a href="{{ route('Politicas.cookies') }}">Política de cookies</a>
    </p>
</footer>
</body>
</html>
