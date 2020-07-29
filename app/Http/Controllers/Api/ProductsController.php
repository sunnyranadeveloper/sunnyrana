<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Products;
use App\Categories;
use DB;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id,$currencyId)
    {
        $result = DB::table('products')
                ->join('categories', 'category_id', '=', 'categories.id')
                ->join('prices', 'product_id', '=', 'products.id')
                ->join('currencys', 'currency_id', '=', 'currencys.id')
                ->where('currency_id', '=', $currencyId)
                ->get();

        $data = $this->cartDetails($id);

        return ['result'=>$result,'data'=>$data['data'],'totalPrice'=>$data['totalPrice']];
    }

    private function cartDetails($id,) {
        \Cart::session($id);
        $items = \Cart::getContent();
        $totalPrice =0;
        $data= [];
        foreach ($items as $value) {
            $totalPrice += ($value->quantity*$value->price);
            $data[] = [
                        'id'=>$value->associatedModel->id,
                        'name'=>$value->associatedModel->name,
                        'price'=>$value->price,
                        'quantity'=>$value->quantity,
                        'image'=>$value->associatedModel->image,
                        'type'=>$value->associatedModel->type,
                        'totalPrice' => ($value->quantity*$value->price),
                        $value->quantity,
                    ];
        }
        return ["data"=>$data,"totalPrice"=>$totalPrice];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
