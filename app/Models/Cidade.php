<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cidade extends Model
{
    protected $connection = 'stores';

    protected $table = 'cities';
    protected $primaryKey = 'city_id';

    protected $guarded = ['*'];

    public function estado()
    {
        return $this->belongsTo(Estado::class, 'uf_id');
    }
}
