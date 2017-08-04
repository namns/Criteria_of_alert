<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class saveCriteriaRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code'   => 'required',
            'title'   => 'required',
            'formulas' => 'required',
        ];
    }
    public function messages()
    {
        return [
            'code.required'      => 'vui lòng nhập code',
            'title.exists'       => 'vui lòng nhập tiêu đề',
            'formulas.required'  => 'vui lòng nhập công thức',
        ];
    }
}
