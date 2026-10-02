<?php

namespace App\Http\Controllers;

use App\Models\Loja;

class LojasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lojas = Loja::query()
            ->where([
                'segmento' => 'EXCLUSIVO',
                'marca' => 'dellanno',
                'PDV' => 'S',
            ])
            ->get()
            ->map(function ($loja) {
                return [
                    'id' => str()->slug($loja->cidade),
                    'cidade' => $this->formatarNome($loja->cidade),
                    'estado' => strtoupper($loja->uf),
                    'nome' => $this->formatarNome($loja->fantasia),
                    'endereco' => $this->formatarNome($loja->endereco . ' - ' . $loja->bairro),
                    'telefone' => $this->formatTelefone($loja->telefone),
                    'email' => $loja->email,
                    'instagram' => $loja->instagram,
                    'whatsapp' => $loja->whatsapp,
                ];
            });

        return response()->json([
            'lojas' => $lojas
        ]);
    }

    private function formatarNome($texto)
    {
        $texto = preg_replace('/\bautorizada\b/i', '', $texto);
        $texto = trim(preg_replace('/\s+/', ' ', $texto));
        $texto = mb_strtolower($texto, 'UTF-8');
        $excecoes = ['de', 'da', 'do', 'das', 'dos', 'e'];
        $palavras = explode(' ', $texto);

        foreach ($palavras as $i => $palavra) {
            if ($i === 0 || !in_array($palavra, $excecoes)) {
                $palavras[$i] = mb_convert_case($palavra, MB_CASE_TITLE, 'UTF-8');
            }
        }

        return implode(' ', $palavras);
    }

    private function formatTelefone($telefone)
    {
        $numeros = preg_replace('/\D/', '', $telefone);

        if (strlen($numeros) === 11) {
            return preg_replace('/(\d{2})(\d{5})(\d{4})/', '($1) $2-$3', $numeros);
        }

        if (strlen($numeros) === 10) {
            return preg_replace('/(\d{2})(\d{4})(\d{4})/', '($1) $2-$3', $numeros);
        }

        return $telefone;
    }
}
