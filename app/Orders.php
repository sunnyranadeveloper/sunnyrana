<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $fillable = ['order_no','product_id','price','quantity','user_id','currency_id'];

}
