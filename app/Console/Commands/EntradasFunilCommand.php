<?php

namespace App\Console\Commands;

use App\Models\Entrada;
use Carbon\Carbon;
use Illuminate\Console\Command;

class EntradasFunilCommand extends Command
{
    protected $signature = 'entradas:funil
        {--dias=30 : Janela de dias a considerar}
        {--limiar=50 : % mínimo de visibilidade da seção para contar como "vista"}';

    protected $description = 'Mostra o funil de abandono por seção/dobra da Home, com base no tracking de scroll.';

    /**
     * Ordem das seções na Home (resources/js/Pages/Home.jsx). A chave é o
     * `aria-labelledby` de cada <section>, usado como chave no JSON
     * `secoes_visualizadas` da tabela `entradas`.
     */
    private const SECOES = [
        'hero-title' => 'Hero Banner',
        'lojista-topo-lojista-form-title' => 'Formulário (topo)',
        'timeline-title' => 'Linha do tempo',
        'testimonials-title' => 'Depoimentos',
        'video-testimonials-title' => 'Depoimentos em vídeo',
        'suporte-estrutura-titulo' => 'Estrutura de suporte',
        'unicasa-title' => 'Sobre a Unicasa',
        'lojista-final-lojista-form-title' => 'Formulário (rodapé)',
        'faq-title' => 'Perguntas frequentes',
    ];

    public function handle(): int
    {
        $dias = (int) $this->option('dias');
        $limiar = (int) $this->option('limiar');

        $desde = Carbon::now()->subDays($dias);

        $total = Entrada::query()->where('criado', '>=', $desde)->count();

        if ($total === 0) {
            $this->warn("Nenhuma entrada encontrada nos últimos {$dias} dia(s).");

            return self::SUCCESS;
        }

        $this->info("Funil de rolagem — últimos {$dias} dia(s), limiar de {$limiar}% de visibilidade");
        $this->info("Total de visitas no período: {$total}");
        $this->newLine();

        $linhas = [];
        $anterior = null;

        foreach (self::SECOES as $chave => $rotulo) {
            $chegaram = Entrada::query()
                ->where('criado', '>=', $desde)
                ->where("secoes_visualizadas->{$chave}", '>=', $limiar)
                ->count();

            $percentualTotal = round(($chegaram / $total) * 100, 1);

            $quedaAnterior = $anterior === null
                ? '-'
                : round((($anterior - $chegaram) / max($anterior, 1)) * 100, 1) . '%';

            $linhas[] = [
                $rotulo,
                $chegaram,
                "{$percentualTotal}%",
                $quedaAnterior,
            ];

            $anterior = $chegaram;
        }

        $this->table(
            ['Seção', 'Visitantes que chegaram', '% do total', 'Queda vs. seção anterior'],
            $linhas,
        );

        $iniciadosTopo = Entrada::query()->where('criado', '>=', $desde)->where('formulario_topo_iniciado', true)->count();
        $enviadosTopo = Entrada::query()->where('criado', '>=', $desde)->where('formulario_topo_enviado', true)->count();
        $iniciadosRodape = Entrada::query()->where('criado', '>=', $desde)->where('formulario_rodape_iniciado', true)->count();
        $enviadosRodape = Entrada::query()->where('criado', '>=', $desde)->where('formulario_rodape_enviado', true)->count();

        $this->newLine();
        $this->info('Conversão dos formulários:');
        $this->table(
            ['Formulário', 'Começaram a preencher', 'Enviaram', 'Abandonaram'],
            [
                ['Topo', $iniciadosTopo, $enviadosTopo, max(0, $iniciadosTopo - $enviadosTopo)],
                ['Rodapé', $iniciadosRodape, $enviadosRodape, max(0, $iniciadosRodape - $enviadosRodape)],
            ],
        );

        return self::SUCCESS;
    }
}
