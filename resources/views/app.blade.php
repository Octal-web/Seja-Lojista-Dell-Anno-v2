<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <!-- Google Tag Manager -->
        <script id="gtm-script">
            (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MPTWPC9');
        </script>
        <!-- End Google Tag Manager -->

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>Seja Lojista | Dell Anno</title>
        <link rel="canonical" href="{{ url()->current() }}" inertia="canonical">

        <!-- Fonts -->
        <link rel="stylesheet" href="https://use.typekit.net/qsm5veu.css">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans text-primary antialiased selection:text-white selection:bg-gray-700">
        <!-- Google Tag Manager (noscript) -->
        <noscript id="gtm-noscript">
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MPTWPC9" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>
        <!-- End Google Tag Manager (noscript) -->

        @inertia
    </body>
</html>
