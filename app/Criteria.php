<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Criteria extends Model
{
    protected $table = 'criteria';
    protected $fillable = [ 'code','title', ];

    public static function add($input){
        $data= new Criteria();
        $data->code = $input['code'];
        $data->title = $input['title'];
        $data->formulas = $input['formulas'];
        $data->status = $input['status'];
        $UpOrIn = $data->save();
        return $UpOrIn;
    }
}
