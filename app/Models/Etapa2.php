<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etapa2 extends Model
{
    protected $connection = 'unicasa';

    protected $table = 'expectativa_projetos';

    protected static function booted(): void
    {
        static::creating(function (self $model) {
            $model->updated_at = null;
        });
    }
}
