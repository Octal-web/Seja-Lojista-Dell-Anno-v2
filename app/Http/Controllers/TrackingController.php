<?php

namespace App\Http\Controllers;

use App\Services\EntradaTrackingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function __construct(protected EntradaTrackingService $tracking)
    {
    }

    /**
     * Registra a chegada/navegação do visitante no site.
     */
    public function entrada(Request $request): JsonResponse
    {
        $data = $request->validate([
            'url' => 'nullable|string|max:2048',
            'referrer' => 'nullable|string|max:2048',
            'origem' => 'nullable|string|max:2048',
            'campanha' => 'nullable|string|max:255',
            'grupo' => 'nullable|string|max:255',
            'anuncio' => 'nullable|string|max:255',
        ]);

        try {
            $this->tracking->registrarEntrada($request, $data);
        } catch (\Throwable $exception) {
            report($exception);
        }

        return response()->json(['ok' => true]);
    }

    /**
     * Acumula o tempo ativo do visitante (heartbeat).
     */
    public function atividade(Request $request): JsonResponse
    {
        $data = $request->validate([
            'segundos' => 'required|integer|min:0|max:120',
            'url' => 'nullable|string|max:2048',
        ]);

        try {
            $this->tracking->registrarAtividade($request, (int) $data['segundos']);
        } catch (\Throwable $exception) {
            report($exception);
        }

        return response()->json(['ok' => true]);
    }

    /**
     * Registra o scroll máximo e a visibilidade de cada seção/dobra da página.
     */
    public function secoes(Request $request): JsonResponse
    {
        $data = $request->validate([
            'scroll_percentual' => 'required|integer|min:0|max:100',
            'secoes' => 'required|array',
            'secoes.*' => 'integer|min:0|max:100',
        ]);

        try {
            $this->tracking->registrarSecoes(
                $request,
                (int) $data['scroll_percentual'],
                $data['secoes'],
            );
        } catch (\Throwable $exception) {
            report($exception);
        }

        return response()->json(['ok' => true]);
    }

    /**
     * Salva o preenchimento parcial de um dos formulários de lead.
     */
    public function formulario(Request $request): JsonResponse
    {
        $data = $request->validate([
            'formulario' => 'required|string|in:topo,rodape',
            'dados' => 'required|array',
        ]);

        try {
            $this->tracking->registrarFormulario($request, $data['formulario'], $data['dados']);
        } catch (\Throwable $exception) {
            report($exception);
        }

        return response()->json(['ok' => true]);
    }
}
