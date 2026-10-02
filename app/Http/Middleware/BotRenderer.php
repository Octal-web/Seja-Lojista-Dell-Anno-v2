<?php

// app/Http/Middleware/BotRenderer.php
//
// Detecta crawlers (Google, Bing, IAs de busca) e injeta o conteúdo
// estático da página /sejalojista26' diretamente no HTML —
// sem precisar de Node.js nem de serviço externo.
//
// Como funciona:
//   1. Verifica o User-Agent da requisição
//   2. Se for crawler -> retorna a view blade sejalojista26'-bot.blade.php
//      com o HTML completo da página já renderizado
//   3. Se for usuário normal -> deixa passar para o Inertia normalmente

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class BotRenderer
{
    /**
     * User-agents de crawlers que devem receber HTML estático.
     * Inclui Google, Bing, IAs de busca e ferramentas de compartilhamento social.
     */
    private array $botSignatures = [
        // Motores de busca
        'googlebot',
        'bingbot',
        'slurp',
        'duckduckbot',
        'baiduspider',
        'yandexbot',

        // IAs de busca (GEO)
        'gptbot',
        'chatgpt-user',
        'oai-searchbot',
        'google-extended',
        'perplexitybot',
        'claudebot',
        'anthropic-ai',
        'meta-externalagent',
        'meta-externalfetcher',
        'cohere-ai',
        'ccbot',

        // Previews sociais (WhatsApp, Telegram, Slack, LinkedIn, Facebook)
        'facebookexternalhit',
        'facebot',
        'twitterbot',
        'linkedinbot',
        'whatsapp',
        'telegrambot',
        'slackbot',

        // Ferramentas de SEO e auditoria
        'lighthouse',
        'gtmetrix',
        'pagespeed',
        'chrome-lighthouse',

        // Validadores (Google Rich Results, Facebook Debugger)
        'apis.google',
    ];

    public function handle(Request $request, Closure $next): mixed
    {
        // Só intercepta a rota principal do sejalojista26
        if (! $this->isSejalojista26($request)) {
            return $next($request);
        }

        // Se não for crawler, deixa o Inertia responder normalmente
        if (! $this->isBot($request)) {
            return $next($request);
        }

        // É crawler na página certa -> retorna HTML estático
        return response()->view('sejalojista26-bot', [
            'title'       => 'Seja Lojista | Dell Anno Brasil',
            'description' => 'Abra sua loja própria autorizada Dell Anno. Conheça o modelo de negócio e o suporte da marca e converse com a equipe de expansão sobre a disponibilidade da sua região.',
        ]);
    }

    private function isSejalojista26(Request $request): bool
    {
        $path = rtrim($request->getPathInfo(), '/');
        return $path === '/sejalojista26' || $path === '';
        // Ajuste se o app rodar em subpasta
    }

    private function isBot(Request $request): bool
    {
        $ua = strtolower($request->header('User-Agent', ''));

        if (empty($ua)) {
            return false;
        }

        foreach ($this->botSignatures as $signature) {
            if (str_contains($ua, $signature)) {
                return true;
            }
        }

        return false;
    }
}
