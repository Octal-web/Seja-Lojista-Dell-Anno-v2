<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if ($this->isContinuationRequest()) {
            return $this->continuationRules();
        }

        return $this->storeRules();
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nome.required' => 'Por favor, informe seu nome.',
            'email.required' => 'Por favor, informe seu e-mail.',
            'email.email' => 'Por favor, informe um e-mail válido.',
            'estado_uf.required' => 'Por favor, informe o seu estado.',
            'telefone.required' => 'Por favor, informe seu telefone.',
            'telefone_confirmation.required' => 'Por favor, confirme seu telefone.',
            'telefone_confirmation.same' => 'A confirmação do telefone deve ser igual ao telefone informado.',
            'telefone.celular_com_ddd' => 'Por favor, informe um telefone válido.',
            'cep.required' => 'Por favor, informe seu CEP.',
            'cep.formato_cep' => 'Por favor, informe um CEP válido.',
            'politica.required' => 'Para continuar, você deve concordar com os termos.',
            'politica.accepted' => 'Para continuar, você deve concordar com os termos.',

            'nascimento.required' => 'Por favor, informe sua data de nascimento.',
            'nascimento.date_format' => 'Por favor, informe uma data válida.',
            'cpf.required' => 'Por favor, informe seu CPF.',
            'cpf.cpf' => 'Por favor, informe um CPF válido.',
            'cpf.formato_cpf' => 'Por favor, informe um CPF válido.',
            'estado_civil.required' => 'Por favor, informe o seu estado civil.',
            'estado_civil.in' => 'Por favor, informe um estado civil válido.',
            'ocupacao_atual.required' => 'Por favor, informe sua ocupação atual.',
            'formacao_escolar.required' => 'Por favor, informe sua formação escolar.',
            'estado_interesse.required' => 'Por favor, informe o estado de interesse.',
            'expectativa_investimento.required' => 'Por favor, informe o capital disponível.',
            'expectativa_investimento.in' => 'Por favor, informe uma faixa de investimento válida.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'estado_uf' => $this->input('estado_uf', $this->input('uf')),
            'origem' => $this->input(
                'origem',
                $this->input('origin', $this->input('utm_source')),
            ),
            'campanha' => $this->input(
                'campanha',
                $this->input('campaign', $this->input('utm_campaign')),
            ),
            'grupo' => $this->input(
                'grupo',
                $this->input('group', $this->input('utm_term')),
            ),
            'anuncio' => $this->input(
                'anuncio',
                $this->input('ad', $this->input('utm_content')),
            ),
        ]);
    }

    /**
     * Regras da primeira etapa.
     *
     * @return array<string, string>
     */
    protected function storeRules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefone' => 'required|celular_com_ddd',
            'telefone_confirmation' => 'required|string|same:telefone',
            'cep' => 'required|formato_cep',
            'entrada' => 'nullable',
            'posicao_formulario' => 'nullable|string|max:255',
            'politica' => 'required|accepted',

            'origem' => 'nullable|string|max:2048',
            'campanha' => 'nullable|string|max:255',
            'grupo' => 'nullable|string|max:255',
            'anuncio' => 'nullable|string|max:255',
        ];
    }

    /**
     * Regras da segunda etapa.
     *
     * @return array<string, string>
     */
    protected function continuationRules(): array
    {
        return [
            'nascimento' => 'required|date_format:d/m/Y',
            'naturalidade' => 'nullable|string|max:255',
            'nacionalidade' => 'nullable|string|max:255',
            'rg' => 'nullable|string|max:50',
            'orgao_emissor' => 'nullable|string|max:50',
            'data_emissao' => 'nullable|date_format:d/m/Y',
            'cpf' => 'required|cpf|formato_cpf',
            'estado_civil' => 'required|integer|in:1,2,3,4,5',
            'ocupacao_atual' => 'required|string|max:255',
            'empresa' => 'nullable|string|max:255',
            'formacao_escolar' => 'required|string|max:255',
            'experiencia' => 'nullable|string|max:255',
            'outra_atividade' => 'nullable|boolean',
            'outra_sociedade' => 'nullable|boolean',
            'cidade_interesse' => 'nullable|string|max:255',
            'estado_interesse' => 'required|string|max:255',
            'expectativa_investimento' => 'required|integer|in:1,2',
            'conhecimento_marca' => 'nullable|string|max:255',
            'observacoes' => 'nullable|string',
        ];
    }

    protected function isContinuationRequest(): bool
    {
        return $this->route('token') !== null;
    }
}
