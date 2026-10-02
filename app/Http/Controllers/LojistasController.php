<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;
use App\Http\Requests\PostStoreComplete;
use App\Models\Estado;
use App\Models\Etapa1;
use App\Services\EntradaTrackingService;
use App\Services\StoreService;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LojistasController extends Controller
{
    protected StoreService $storeService;

    protected EntradaTrackingService $tracking;

    public function __construct(StoreService $storeService, EntradaTrackingService $tracking)
    {
        parent::__construct();

        $this->storeService = $storeService;
        $this->tracking = $tracking;
    }

    /**
     * Salva os dados da primeira etapa do cadastro.
     */
    public function enviar(PostStoreComplete $request): RedirectResponse
    {
        $data = $request->validated();

        $result = $this->storeService->create($data);

        $token = $result['etapa1']->token;

        try {
            $formulario = trim((string) ($data['posicao_formulario'] ?? '')) === 'Rodapé'
                ? 'rodape'
                : 'topo';

            $this->tracking->marcarFormularioEnviado($request, $formulario, $token);
        } catch (\Throwable $exception) {
            report($exception);
        }

        $parameters = array_filter([
            'token' => $token,
            'origin' => $data['origem'] ?? null,
            'campaign' => $data['campanha'] ?? null,
            'group' => $data['grupo'] ?? null,
            'ad' => $data['anuncio'] ?? null,
        ], fn($value) => $value !== null && $value !== '');

        return to_route('Lojistas.concluido', $parameters);
    }

    /**
     * Exibe a segunda etapa do cadastro.
     */
    public function continuacao(string $token): Response|RedirectResponse
    {
        $etapa1 = Etapa1::query()
            ->where([
                'deleted_at' => null,
                'token' => $token,
            ])
            ->first();

        if (!$etapa1) {
            return to_route('Home.index');
        }

        $estados = Estado::query()
            ->orderBy('id')
            ->get()
            ->map(function ($estado) {
                return [
                    'value' => $estado->abbreviation,
                    'label' => $estado->name,
                ];
            });

        return Inertia::render('LojistasSegundaEtapa', [
            'token' => $token,
            'etapa1' => $etapa1,
            'estados' => $estados,
        ]);
    }

    /**
     * Salva os dados da segunda etapa do cadastro.
     */
    public function continuacaoAction(PostStoreRequest $request, string $token): RedirectResponse
    {
        $data = $request->validated();

        $this->storeService->complete($token, $data);

        return to_route('Lojistas.concluido', [
            'token' => $token,
        ]);
    }

    /**
     * Exibe a página de conclusão do cadastro.
     */
    public function concluido(string $token): Response|RedirectResponse
    {
        $etapa1 = Etapa1::query()
            ->where([
                'deleted_at' => null,
                'token' => $token,
            ])
            ->first();

        if (!$etapa1) {
            return to_route('Home.index');
        }

        $vacation = Carbon::now()->between(
            Carbon::parse('2022-12-14 10:00:00'),
            Carbon::parse('2023-01-04 00:00:00'),
        );

        return Inertia::render('LojistasConcluido', [
            'etapa1' => $etapa1,
            'vacation' => $vacation
        ]);
    }

    /**
     * Exibe a página de conclusão usada para testes.
     */
    public function concluidoTeste(): Response
    {
        $estados = Estado::query()
            ->orderBy('id')
            ->get();

        return Inertia::render('LojistasConcluidoTeste', [
            'estados' => $estados,
        ]);
    }
}
