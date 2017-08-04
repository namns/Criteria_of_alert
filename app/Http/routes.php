<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});
Route::get('/', ['as' => 'get.criteria', 'uses' => 'HomeController@index']);
Route::get('/addcriteria', ['as' => 'addcriteria', 'uses' => 'HomeController@addcriteria']);
Route::post('/deleteRecruit', ['as' => 'deleteRecruit', 'uses' => 'HomeController@deleteRecruit']);
Route::post('/saveCriteria', ['as' => 'saveCriteria', 'uses' => 'HomeController@saveCriteria']);

