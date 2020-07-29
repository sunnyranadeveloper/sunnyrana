<?php

use Illuminate\Database\Seeder;

class PricesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('prices')->insert(
        	[
        		[
        			'product_id' => 1,
        			'currency_id' => 1,
        			'price' => 3.00,
        		],
        		[
        			'product_id' => 1,
        			'currency_id' => 2,
        			'price' => 5.00,
        		],
        		[
        			'product_id' => 2,
        			'currency_id' => 1,
        			'price' => 3.00,
        		],
        		[
        			'product_id' => 2,
        			'currency_id' => 2,
        			'price' => 5.00,
        		],
        		[
        			'product_id' => 3,
        			'currency_id' => 1,
        			'price' => 4.00,
        		],
        		[
        			'product_id' => 3,
        			'currency_id' => 2,
        			'price' => 6.00,
        		],
        		[
        			'product_id' => 4,
        			'currency_id' => 1,
        			'price' => 4.00,
        		],
        		[
        			'product_id' => 4,
        			'currency_id' => 2,
        			'price' => 6.00,
        		],
        		[
        			'product_id' => 5,
        			'currency_id' => 1,
        			'price' => 6.00,
        		],
        		[
        			'product_id' => 5,
        			'currency_id' => 2,
        			'price' => 8.00,
        		],
        		[
        			'product_id' => 6,
        			'currency_id' => 1,
        			'price' => 6.00,
        		],
        		[
        			'product_id' => 6,
        			'currency_id' => 2,
        			'price' => 8.00,
        		],
        		[
        			'product_id' => 7,
        			'currency_id' => 1,
        			'price' => 7.00,
        		],
        		[
        			'product_id' => 7,
        			'currency_id' => 2,
        			'price' => 9.00,
        		],
        		[
        			'product_id' => 8,
        			'currency_id' => 1,
        			'price' => 7.00,
        		],
        		[
        			'product_id' => 8,
        			'currency_id' => 2,
        			'price' => 9.00,
        		],
        		[
        			'product_id' => 9,
        			'currency_id' => 1,
        			'price' => 6.00,
        		],
        		[
        			'product_id' => 9,
        			'currency_id' => 2,
        			'price' => 8.00,
        		],
        		[
        			'product_id' => 10,
        			'currency_id' => 1,
        			'price' => 3.00,
        		],
        		[
        			'product_id' => 10,
        			'currency_id' => 2,
        			'price' => 5.00,
        		],
        		[
        			'product_id' => 11,
        			'currency_id' => 1,
        			'price' => 4.00,
        		],
        		[
        			'product_id' => 11,
        			'currency_id' => 2,
        			'price' => 6.00,
        		],
        		[
        			'product_id' => 12,
        			'currency_id' => 1,
        			'price' => 4.00,
        		],
        		[
        			'product_id' => 12,
        			'currency_id' => 2,
        			'price' => 6.00,
        		],
        		[
        			'product_id' => 13,
        			'currency_id' => 1,
        			'price' => 4.00,
        		],
        		[
        			'product_id' => 13,
        			'currency_id' => 2,
        			'price' => 6.00,
        		],
        		[
        			'product_id' => 14,
        			'currency_id' => 1,
        			'price' => 4.00,
        		],
        		[
        			'product_id' => 14,
        			'currency_id' => 2,
        			'price' => 6.00,
        		],
        		[
        			'product_id' => 15,
        			'currency_id' => 1,
        			'price' => 4.00,
        		],
        		[
        			'product_id' => 15,
        			'currency_id' => 2,
        			'price' => 6.00,
        		],
        		[
        			'product_id' => 16,
        			'currency_id' => 1,
        			'price' => 4.00,
        		],
        		[
        			'product_id' => 16,
        			'currency_id' => 2,
        			'price' => 6.00,
        		],
        	]
        );
    }
}