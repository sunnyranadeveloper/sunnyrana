<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Products;
use App\Orders;
use App\Currencys;
use DB;

class CartController extends Controller
{
	private $status_code    =    200;

    public function index($id,$currencyId)
    {
        $result = DB::table('products')
                ->join('categories', 'category_id', '=', 'categories.id')
                ->join('prices', 'product_id', '=', 'products.id')
                ->join('currencys', 'currency_id', '=', 'currencys.id')
                ->where('currency_id', '=', $currencyId)
                ->get();

        $data = $this->cartDetails($id,$currencyId);

        return ['result'=>$result,'data'=>$data['data'],'totalPrice'=>$data['totalPrice']];
    }

    public function add(Request $request) {
    	if($request->id!=null && $request->quantity!=null) {

    		$product = $this->getProductDetails($request->id,$request->currency_id);
    		\Cart::session($request->user_id);
	    	\Cart::add(array(
			    'id' => $product->product_id,
			    'quantity' => $request->quantity,
                'name' => $product->name,
                'price' => $product->price,
			    'attributes' => array(),
			    'associatedModel' => $product
			));

			$data = $this->cartDetails($request->user_id,$request->currency_id);

			return response()->json(["status" => $this->status_code, "success" => true, "message" => "Produced Added Successfully.","data"=>$data['data'],"totalPrice"=>$data['totalPrice']]);
    	} else {
    		return response()->json(["status" => "fail", "success" => false, "message" => "Please try after some time."]);
    	}

    }

    private function getProductDetails($product_id,$currency_id) {
        $product = DB::table('products')
                ->join('categories', 'category_id', '=', 'categories.id')
                ->join('prices', 'product_id', '=', 'products.id')
                ->join('currencys', 'currency_id', '=', 'currencys.id')
                ->where('currency_id', '=', $currency_id)
                ->where('products.id', '=', $product_id)
                ->first();
        return $product;
    }
    public function get($id,$currency_id) {
    	$data = $this->cartDetails($id,$currency_id);
        $currency = Currencys::all();
        $currencyId = Currencys::where(['id'=>$currency_id])->first();
    	return response()->json(["status" => "true", "success" => true, "data"=>$data['data'],"totalPrice"=>$data['totalPrice'],"isRecords"=>$data['isRecords'],'currency'=>$currency,'currencyId'=>$currencyId->id,'currencySym'=>$currencyId->sym]);
    }

    private function cartDetails($id,$currency_id) {
    	\Cart::session($id);
    	$items = \Cart::getContent();
    	$totalPrice =0;
    	$data= [];

    	if(count($items)) {
    		$isRecords=true;
	    	foreach ($items as $value) {
                $product = $this->getProductDetails($value->id,$currency_id);

	    		$totalPrice += ($value->quantity*$product->price);
	    		$data[] = [
    					'id'=>$product->product_id,
    					'name'=>$product->name,
    					'price'=>$product->price,
    					'quantity'=>$value->quantity,
    					'image'=>$product->image,
    					'type'=>($product->type==0)?'Veg':'Non Veg',
    					'cat_name'=>$product->cat_name,
                        'sym'=>$product->sym,
    					'totalPrice' => ($value->quantity*$product->price),
    				];
    		}

    	} else {
    		$isRecords=false;
    	}
    	
    	return ["data"=>$data,"totalPrice"=>$totalPrice,'isRecords'=>$isRecords];
    }

    public function update(Request $request) {
    	if($request->id!=null && $request->quantity!=null) {
    		\Cart::session($request->user_id);
	    	\Cart::update($request->id,array(
			    'quantity' => $request->quantity,
			));

			$data = $this->cartDetails($request->user_id,$request->currency_id);

			return response()->json(["status" => "success", "success" => true, "message" => "Produced Updated Successfully.","data"=>$data['data'],"totalPrice"=>$data['totalPrice']]);
    	} else {
    		return response()->json(["status" => "fail", "success" => false, "message" => "Please try after some time."]);
    	}
    }


    public function remove($id,$productId,$currency_id) {
    	\Cart::session($id);
    	$items = \Cart::remove($productId);
		$data = $this->cartDetails($id,$currency_id);
		return response()->json(["status" => "true", "success" => true, "data"=>$data['data'],"totalPrice"=>$data['totalPrice'],"isRecords"=>$data['isRecords']]);
    }

    public function confirmOrder(Request $request) {
    	$user_status   = DB::table('orders')->latest()->first();

    	$order_no = isset($user_status->order_no)?($user_status->order_no+1):101;

    	\Cart::session($request->user_id);
    	$items = \Cart::getContent();
    	$totalPrice =0;
    	$data= [];
    	foreach ($items as $value) {
    		$totalPrice += ($value->quantity*$value->price);
    		$data = [
    					'order_no'=>$order_no,
    					'user_id'=>$request->user_id,
                        'currency_id'=>$request->currency_id,
    					'product_id'=>$value->associatedModel->product_id,
    					'price'=>$value->price,
    					'quantity'=>$value->quantity,
    					'created_at' => date('Y-m-d H:i:s'),
    					'update_at' => date('Y-m-d H:i:s'),
    				];
    		// print_r($data);die;
    		Orders::create($data);
    	}
    	\Cart::clear();
    	$data = $this->cartDetails($request->user_id,$request->currency_id);
		return response()->json(["status" => "true", "success" => true, "data"=>$data['data'],"totalPrice"=>$data['totalPrice'],"isRecords"=>$data['isRecords']]);
    }

    public function orders($id,$currency_id)
    {
        $result = DB::table('orders')
        		->select("orders.order_no","currencys.sym","orders.created_at",
        			DB::raw("(GROUP_CONCAT(products.name,'(',orders.quantity,')' SEPARATOR ',')) as name"),
        			DB::raw("(sum(orders.price*orders.quantity)) as price"),
        			DB::raw("(sum(orders.quantity)) as quantity"),
            	)
                ->join('products', 'orders.product_id', '=', 'products.id')
                ->join('currencys', 'orders.currency_id', '=', 'currencys.id')
                ->where('orders.user_id', '=', $id)
                ->groupBy('orders.order_no','currencys.sym','orders.created_at')
                ->orderBy('orders.id','desc')
                ->get();

        $data = $this->cartDetails($id,$currency_id);

        return ['result'=>$result,"data"=>$data['data'],"totalPrice"=>$data['totalPrice'],"isRecords"=>$data['isRecords']];
    }
}