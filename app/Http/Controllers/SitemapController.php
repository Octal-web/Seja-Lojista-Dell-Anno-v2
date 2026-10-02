<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $urls = [
            [
                'loc' => route('Home.index'),
            ],

            // Adicione somente páginas públicas e indexáveis:
            /*
            [
                'loc' => route('PoliticaPrivacidade.index'),
            ],
            */
        ];

        return response()
            ->view('sitemap', [
                'urls' => $urls,
            ])
            ->header(
                'Content-Type',
                'application/xml; charset=UTF-8'
            );
    }
}