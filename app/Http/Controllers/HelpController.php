<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Validator;

class HelpController extends Controller
{
    public static function ValError(Validator $val)
    {
        return array_values($val->getMessageBag()->toArray())[0][0];
    }
}
