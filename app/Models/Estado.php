<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    protected $connection = 'stores';

    protected $table = 'states';
    protected $primaryKey = 'state_id';

    protected $guarded = ['*'];

    public function cidades()
    {
        return $this->hasMany(Cidade::class, 'uf_id')->orderBy('city');
    }
}
