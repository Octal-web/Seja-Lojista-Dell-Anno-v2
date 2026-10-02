<?php

namespace App\Services;

use App\Models\Entrada;
use Carbon\Carbon;
use Illuminate\Http\Request;
use InvalidArgumentException;

class EntradaTrackingService
{
    private const JANELA_SESSAO_HORAS = 8;

    private const FORMULARIOS_VALIDOS = ['topo', 'rodape'];

    /**
     * Registra a chegada/navegação do visitante, criando ou atualizando
     * a entrada correspondente ao IP dentro da janela de sessão.
     */
    public function registrarEntrada(Request $request, array $data): Entrada
    {
        $entrada = $this->resolve($request);

        $entrada->paginas_visitadas += 1;

        if ($data['url'] ?? null) {
            $entrada->url_atual = $data['url'];
        }

        if ($data['referrer'] ?? null) {
            $entrada->referrer = $data['referrer'];
        }

        if (!$entrada->url_entrada) {
            $entrada->url_entrada = $data['url'] ?? null;
            $entrada->origem = $this->normalizeOrigin($data['origem'] ?? null);
            $entrada->campanha = $data['campanha'] ?? null;
            $entrada->grupo = $data['grupo'] ?? null;
            $entrada->anuncio = $data['anuncio'] ?? null;
        }

        $entrada->save();

        return $entrada;
    }

    /**
     * Acumula o tempo ativo do visitante na entrada atual.
     */
    public function registrarAtividade(Request $request, int $segundos): Entrada
    {
        $entrada = $this->resolve($request);

        $entrada->tempo_total_segundos += max(0, $segundos);
        $entrada->save();

        return $entrada;
    }

    /**
     * Atualiza o scroll máximo e a visibilidade (em %) de cada seção/dobra
     * já observada, sempre mantendo o maior valor visto na sessão.
     */
    public function registrarSecoes(Request $request, int $scrollPercentual, array $secoes): Entrada
    {
        $entrada = $this->resolve($request);

        $entrada->scroll_maximo_percentual = max(
            $entrada->scroll_maximo_percentual,
            min(100, max(0, $scrollPercentual)),
        );

        $atuais = $entrada->secoes_visualizadas ?? [];

        foreach ($secoes as $chave => $percentual) {
            $chave = (string) $chave;
            $percentual = min(100, max(0, (int) $percentual));

            $atuais[$chave] = max($atuais[$chave] ?? 0, $percentual);
        }

        $entrada->secoes_visualizadas = $atuais;

        $entrada->save();

        return $entrada;
    }

    /**
     * Salva o preenchimento parcial (ou total) de um dos formulários.
     */
    public function registrarFormulario(Request $request, string $formulario, array $dados): Entrada
    {
        $formulario = $this->normalizeFormulario($formulario);
        $entrada = $this->resolve($request);

        $preenchido = collect($dados)->contains(
            fn ($valor) => $valor !== null && $valor !== '' && $valor !== false,
        );

        $entrada->{"formulario_{$formulario}_dados"} = $dados;
        $entrada->{"formulario_{$formulario}_atualizado_em"} = Carbon::now();

        if ($preenchido) {
            $entrada->{"formulario_{$formulario}_iniciado"} = true;
        }

        $entrada->save();

        return $entrada;
    }

    /**
     * Marca um dos formulários como efetivamente enviado (conversão).
     */
    public function marcarFormularioEnviado(Request $request, string $formulario, ?string $leadToken = null): Entrada
    {
        $formulario = $this->normalizeFormulario($formulario);
        $entrada = $this->resolve($request);

        $entrada->{"formulario_{$formulario}_iniciado"} = true;
        $entrada->{"formulario_{$formulario}_enviado"} = true;

        if ($leadToken) {
            $entrada->lead_token = $leadToken;
        }

        $entrada->save();

        return $entrada;
    }

    /**
     * Encontra a entrada ativa do IP (últimas 8h) ou cria uma nova.
     */
    protected function resolve(Request $request): Entrada
    {
        $ip = $request->ip();
        $limite = Carbon::now()->subHours(self::JANELA_SESSAO_HORAS);

        return Entrada::query()->getConnection()->transaction(function () use ($ip, $limite, $request) {
            $entrada = Entrada::query()
                ->where('ip', $ip)
                ->where('modificado', '>=', $limite)
                ->latest('modificado')
                ->lockForUpdate()
                ->first();

            if ($entrada) {
                return $entrada;
            }

            $entrada = new Entrada();

            $entrada->forceFill([
                'ip' => $ip,
                'session_id' => $request->hasSession() ? $request->session()->getId() : null,
                'user_agent' => $request->userAgent(),
                'dispositivo' => $this->detectarDispositivo($request->userAgent()),
                'paginas_visitadas' => 0,
                'tempo_total_segundos' => 0,
            ])->save();

            return $entrada;
        });
    }

    protected function normalizeFormulario(string $formulario): string
    {
        $formulario = strtolower($formulario);

        if (!in_array($formulario, self::FORMULARIOS_VALIDOS, true)) {
            throw new InvalidArgumentException("Formulário inválido: {$formulario}");
        }

        return $formulario;
    }

    protected function normalizeOrigin(?string $origin): ?string
    {
        if ($origin === null || $origin === '') {
            return null;
        }

        return rtrim($origin, '/');
    }

    protected function detectarDispositivo(?string $userAgent): string
    {
        $mobileAgents = ['iPhone', 'iPad', 'Android', 'BlackBerry', 'Windows Phone'];

        foreach ($mobileAgents as $agent) {
            if (stripos($userAgent ?? '', $agent) !== false) {
                return 'Mobile';
            }
        }

        return 'Computador';
    }
}
