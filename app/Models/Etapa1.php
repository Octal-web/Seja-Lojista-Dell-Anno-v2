<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etapa1 extends Model
{
    protected $connection = 'unicasa';

    protected $table = 'clientes';

    protected static function booted(): void
    {
        static::creating(function (self $model) {
            $model->updated_at = null;
        });
    }
}
