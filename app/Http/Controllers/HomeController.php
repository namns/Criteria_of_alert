<?php

namespace App\Http\Controllers;

use App\Criteria;
use Illuminate\Http\Request;
use App\Http\Requests\saveCriteriaRequest;

use App\Http\Requests;

class HomeController extends Controller
{
    public function index(Request $request){
        $criteria = Criteria::orderBy('id', 'ASC')->paginate(10);
        return view('criteria',['criteria' => $criteria]);
    }
    public function deleteRecruit(Request $request){

        $id = $request->input('ID');
        try {
            if (Criteria::where('id', $id)->delete()){
                return response()->json([
                    'status' => 'success',
                    'errors' => [],
                ]);
            } else {
                return response()->json([
                    'status' => 'fail',
                    'errors' => 'do not delete',
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'errors' => $e,
            ]);
        }
    }
    public function addcriteria(){
        return view('addcriteria');
    }
    public function search(Request $request){
        $code = $request->input('code');
        $title = $request->input('title');
        $status = $request->input('status');
        if ($code != "" && $title != ""){
             $search = Criteria::where('code', 'like', '%'.$code.'%')->where('title', 'like', '%'.$title.'%')->where(['status' => intval($status)])->get();
        }
        elseif($code != "" && $title == ""){
           $search = Criteria::where('code', 'like', '%'.$code.'%')->where('status' , intval($status))->get();
        }
        elseif($code == "" && $title != ""){
            $search = Criteria::where('title', 'like', '%'.$title.'%')->where('status' , intval($status))->get();
        }
        else{
            $search = Criteria::where('status',intval($status))->get();
        }
        return view('search',['search' => $search]);
    }
    public function saveCriteria(saveCriteriaRequest $request){
        $input = $request->all();
        $addon = Criteria::add($input);
        if($addon){
            $messages = "thêm tiêu chí thành công";
        }
        else{
            $messages = "lỗi khi thêm tiêu chí";
        }
        return redirect()->route('get.criteria')->with('success', $messages);;
    }
}
