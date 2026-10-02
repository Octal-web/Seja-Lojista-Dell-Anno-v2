<?php

namespace App\Services;

use App\Models\Etapa1;
use App\Models\Etapa2;
use App\Models\Lead;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use RuntimeException;

class StoreService
{
    public const CEP_PADRAO = '00000-000';

    private const CLIENTE = 'dellanno';
    private const PROJETO = 'sejalojista26';
    private const COD_MARCA_ETAPA_1 = 'expansao';
    private const COD_MARCA_ETAPA_2 = 'dellanno';
    private const CANAL_ATENDIMENTO_ID = 40;

    private const CAPITAIS_DISPONIVEIS = [
        1 => 'ENTRE R$ 900.000,00 A 1.500.000,00',
        2 => 'ENTRE R$ 1.500.000,00 A 3.000.000,00',
    ];

    private const ESTADOS_CIVIS = [
        1 => 'Solteiro',
        2 => 'Casado',
        3 => 'Separado',
        4 => 'Divorciado',
        5 => 'Viúvo',
    ];

    /**
     * Cria o cadastro inicial e registra a conversão.
     *
     * @return array{etapa1: Etapa1, lead: Lead}
     */
    public function create(array $data): array
    {
        $cepData = $data['cep'] === self::CEP_PADRAO
            ? []
            : $this->fetchCepData($data['cep']);

        if ($cepData === null) {
            throw ValidationException::withMessages([
                'cep' => 'Por favor, informe um CEP válido.',
            ]);
        }

        $result = DB::transaction(function () use ($data, $cepData) {

            $etapa1 = $this->createEtapa1($data, $cepData);

            $etapa2 = $this->createEtapa2(
                etapa1: $etapa1,
                data: $data,
            );

            $conversoes = $this->countConversions($etapa1->email);

            $lead = $this->createLead(
                $etapa1,
                $data,
                $conversoes,
            );

            $lead->forceFill([
                'expectativa_investimento' => $etapa2->expectativa_investimento,
            ])->save();

            return [
                'etapa1' => $etapa1,
                'etapa2' => $etapa2,
                'lead' => $lead,
            ];
        });

        $this->sendFirstStepEmail($result['etapa1']);

        return $result;
    }

    /**
     * Finaliza o cadastro e atualiza os dados do lead.
     *
     * @return array{etapa1: Etapa1, etapa2: Etapa2, lead: Lead}
     */
    public function complete(string $token, array $data): array
    {
        $result = DB::transaction(function () use ($token, $data) {
            $etapa1 = Etapa1::query()
                ->whereNull('deleted_at')
                ->where('token', $token)
                ->first();

            if (!$etapa1) {
                throw ValidationException::withMessages([
                    'token' => 'Não foi possível localizar o cadastro iniciado.',
                ]);
            }

            $dataNascimento = Carbon::createFromFormat(
                'd/m/Y',
                $data['nascimento'],
            );

            $etapa2 = $this->createEtapa2(
                etapa1: $etapa1,
                data: $data,
            );

            $etapa1->forceFill([
                'mkt_dt_nascimento' => $dataNascimento->toDateString(),
                'mkt_instrucao' => $data['formacao_escolar'],
                'rg' => $data['rg'],
                'cpf' => $data['cpf'],
            ])->save();

            $lead = Lead::query()
                ->whereNull('excluido')
                ->where('token', $token)
                ->latest('id')
                ->first();

            if (!$lead) {
                throw new RuntimeException(
                    'Não foi possível localizar o lead relacionado ao cadastro.',
                );
            }

            $lead->forceFill([
                'expectativa_investimento' => $etapa2->expectativa_investimento,
                'data_nascimento' => $dataNascimento,
                'grau' => $data['formacao_escolar'],
                'conhecimento' => $data['conhecimento_marca'] ?? null,
            ])->save();

            return [
                'etapa1' => $etapa1,
                'etapa2' => $etapa2,
                'lead' => $lead,
            ];
        });

        // $this->sendSecondStepEmail($result['etapa1']);

        return $result;
    }

    protected function fetchCepData(string $cep): ?array
    {
        $cep = preg_replace('/[^0-9]/', '', $cep);

        try {
            $response = Http::timeout(30)
                ->acceptJson()
                ->get("https://viacep.com.br/ws/{$cep}/json/");

            if (!$response->successful()) {
                return null;
            }

            $data = $response->json();

            if (($data['erro'] ?? false) === true) {
                return null;
            }

            return $data;
        } catch (\Throwable $exception) {
            report($exception);

            return null;
        }
    }

    protected function createEtapa1(array $data, array $cepData): Etapa1
    {
        $token = md5(uniqid((string) mt_rand(), true));

        $etapa1 = new Etapa1();
        $origem = $this->normalizeOrigin($data['origem'] ?? null);

        $etapa1->forceFill([
            'nome' => $data['nome'],
            'email' => $data['email'],
            'uf' => $cepData['uf'] ?? $data['estado_uf'] ?? null,
            'telefone' => $data['telefone'],
            'celular' => null,
            'cpf' => null,
            'rg' => null,
            'cep' => $cepData['cep'] ?? $data['cep'],
            'endereco' => $cepData['logradouro'] ?? null,
            'bairro' => $cepData['bairro'] ?? null,
            'cidade' => $cepData['localidade'] ?? null,
            'tipo_cadastro' => 'L',
            'status_cliente' => 'C',
            'cod_marca' => self::COD_MARCA_ETAPA_1,
            'data' => Carbon::today()->toDateString(),
            'genero' => null,
            'compartilhado' => 'N',
            'canal_atendimento_id' => self::CANAL_ATENDIMENTO_ID,
            'codigo_antigo' => null,
            'token' => $token,
            'mkt_midia_origem' => $origem,
            'mkt_campanha_origem' => $data['campanha'] ?? null,
            'mkt_grupo_origem' => $data['grupo'] ?? null,
            'mkt_anuncio_origem' => $data['anuncio'] ?? null,
        ])->save();

        return $etapa1;
    }

    protected function createEtapa2(Etapa1 $etapa1, array $data): Etapa2
    {
        $etapa2 = new Etapa2();

        $etapa2->forceFill([
            'cliente_id' => $etapa1->id,
            'cod_marca' => self::COD_MARCA_ETAPA_2,
            'expectativa_investimento' => self::CAPITAIS_DISPONIVEIS[$data['expectativa_investimento']],
            'metragem' => null,
            'observacao_cliente' => $this->buildObservations($data),
            'status_imovel' => null,
            'previsao_entrega' => null,
            'updated_at' => null,
        ])->save();

        return $etapa2;
    }

    protected function countConversions(string $email): int
    {
        return Lead::query()
            ->where([
                'email' => $email,
                'cliente' => self::CLIENTE,
                'projeto' => self::PROJETO,
            ])
            ->count();
    }

    protected function createLead(
        Etapa1 $etapa1,
        array $data,
        int $conversoes,
    ): Lead {
        $lead = new Lead();

        $lead->forceFill([
            'nome' => $etapa1->nome,
            'email' => $etapa1->email,
            'uf' => $etapa1->uf,
            'telefone' => $etapa1->telefone,
            'cep' => $etapa1->cep,
            'cidade' => $etapa1->cidade,
            'posicao_formulario' => $data['posicao_formulario'] ?? null,
            'origem' => $this->normalizeOrigin($data['origem'] ?? null),
            'campanha' => $data['campanha'] ?? null,
            'grupo' => $data['grupo'] ?? null,
            'anuncio' => $data['anuncio'] ?? null,
            'conversoes' => $conversoes,
            'cliente' => self::CLIENTE,
            'projeto' => self::PROJETO,
            'token' => $etapa1->token,
            'entrada' => $this->parseEntryTime($data['entrada'] ?? null),
            'dispositivo' => $this->detectDevice(),
        ])->save();

        return $lead;
    }

    protected function buildObservations(array $data): ?string
    {
        $observations = [];

        $this->appendObservation(
            $observations,
            'Profissão',
            $data['cargo'] ?? null,
        );

        if (isset($data['possui_socio'])) {
            $this->appendObservation($observations, 'Possui sócio', $data['possui_socio'] ? 'Sim' : 'Não');
        }

        if (empty($observations)) {
            return null;
        }

        return implode(";\n", $observations) . ";\n";
    }

    protected function appendObservation(
        array &$observations,
        string $label,
        mixed $value,
    ): void {
        if ($value === null || $value === '') {
            return;
        }

        $observations[] = "{$label}: {$value}";
    }

    protected function sendFirstStepEmail(Etapa1 $etapa1): void
    {
        $data = [
            'nome' => $etapa1->nome,
            'email' => $etapa1->email,
            'token' => $etapa1->token,
        ];

        Mail::send('emails.contact', $data, function ($message) use ($data) {
            $message->from('naoresponder@dellanno.com.br', 'Dell Anno')
                ->to($data['email'])
                ->bcc('rafael@8poroito.com.br')
                ->subject('[DELL ANNO] Entraremos em contato com você logo em seguida');
        });
    }

    protected function sendSecondStepEmail(Etapa1 $etapa1): void
    {
        $data = [
            'email' => $etapa1->email,
        ];

        Mail::send('emails.contact2', $data, function ($message) use ($data) {
            $message->from('naoresponder@dellanno.com.br', 'Dell Anno')
                ->to($data['email'])
                ->bcc('rafael@8poroito.com.br')
                ->subject('[DELL ANNO] Entraremos em contato com você logo em seguida');
        });
    }

    protected function normalizeOrigin(?string $origin): ?string
    {
        if ($origin === null || $origin === '') {
            return null;
        }

        return rtrim($origin, '/');
    }

    protected function parseEntryTime(mixed $entry): ?Carbon
    {
        if ($entry === null || $entry === '') {
            return null;
        }

        try {
            return Carbon::parse($entry);
        } catch (\Throwable $exception) {
            report($exception);

            return null;
        }
    }

    protected function detectDevice(): string
    {
        $mobileAgents = [
            'iPhone',
            'iPad',
            'Android',
            'BlackBerry',
            'Windows Phone',
        ];

        $userAgent = request()->userAgent() ?? '';

        foreach ($mobileAgents as $agent) {
            if (stripos($userAgent, $agent) !== false) {
                return 'Mobile';
            }
        }

        return 'Computador';
    }
}
