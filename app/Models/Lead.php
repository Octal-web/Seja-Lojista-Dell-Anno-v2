<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $connection = '8poroito';

    protected $table = 'leads';

    const CREATED_AT = 'criado';
    const UPDATED_AT = 'modificado';

    protected static function booted(): void
    {
        static::creating(function (self $model) {
            $model->modificado = null;
        });
    }
}
