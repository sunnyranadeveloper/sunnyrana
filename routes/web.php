<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/{url}', function () {
    return view('welcome');
})->where(['url'=>'home|orders|payment']);


Route::get('products/{id}/{currencyId}','CartController@index');
Route::post("cart/add", "CartController@add");
Route::post("cart/update", "CartController@update");
Route::post("cart/confirm-order", "CartController@confirmOrder");
Route::get("cart/get/{id}/{currencyId}", "CartController@get");
Route::get("cart/orders/{id}/{currencyId}", "CartController@orders");
Route::get("cart/remove/{id}/{productId}/{currencyId}", "CartController@remove");
