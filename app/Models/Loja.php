<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Loja extends Model
{
    protected $connection = 'stores';

    protected $table = 'unicasa_pdvs_ativos';

    protected $guarded = ['*'];

    public function cidade()
    {
        return $this->belongsTo(Cidade::class, 'id_cidade');
    }

    public function estado()
    {
        return $this->belongsTo(Estado::class, 'id_uf');
    }
}
