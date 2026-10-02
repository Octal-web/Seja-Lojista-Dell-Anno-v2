<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entrada extends Model
{
    protected $table = 'entradas';

    const CREATED_AT = 'criado';
    const UPDATED_AT = 'modificado';

    protected $casts = [
        'formulario_topo_iniciado' => 'boolean',
        'formulario_topo_enviado' => 'boolean',
        'formulario_topo_dados' => 'array',
        'formulario_rodape_iniciado' => 'boolean',
        'formulario_rodape_enviado' => 'boolean',
        'formulario_rodape_dados' => 'array',
        'secoes_visualizadas' => 'array',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $model) {
            $model->modificado = null;
        });
    }
}
