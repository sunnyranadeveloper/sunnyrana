<?php

use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert(
        	[
        		[
        			'category_id' => 1,
        			'name' => 'Peppy Paneer',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img5.png',
        			'type' => '0'
        		],
        		[
        			'category_id' => 1,
        			'name' => 'Deluxe Veggie',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img7.png',
        			'type' => '0'
        		],
        		[
        			'category_id' => 2,
        			'name' => 'Peppy Paneer',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img5.png',
        			'type' => '0'
        		],
        		[
        			'category_id' => 2,
        			'name' => 'Deluxe Veggie',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img7.png',
        			'type' => '0'
        		],
        		[
        			'category_id' => 3,
        			'name' => 'Peppy Paneer',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img5.png',
        			'type' => '0'
        		],
        		[
        			'category_id' => 3,
        			'name' => 'Deluxe Veggie',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img7.png',
        			'type' => '0'
        		],
        		[
        			'category_id' => 4,
        			'name' => 'Peppy Paneer',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img5.png',
        			'type' => '0'
        		],
        		[
        			'category_id' => 4,
        			'name' => 'Deluxe Veggie',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img7.png',
        			'type' => '0'
        		],
        		[
        			'category_id' => 1,
        			'name' => 'CHICKEN SAUSAGE',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img8.png',
        			'type' => '1'
        		],
        		[
        			'category_id' => 1,
        			'name' => 'Chicken Dominator',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img1.png',
        			'type' => '1'
        		],
        		[
        			'category_id' => 2,
        			'name' => 'CHICKEN SAUSAGE',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img8.png',
        			'type' => '1'
        		],
        		[
        			'category_id' => 2,
        			'name' => 'Chicken Dominator',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img1.png',
        			'type' => '1'
        		],
        		[
        			'category_id' => 3,
        			'name' => 'CHICKEN SAUSAGE',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img8.png',
        			'type' => '1'
        		],
        		[
        			'category_id' => 3,
        			'name' => 'Chicken Dominator',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img1.png',
        			'type' => '1'
        		],
        		[
        			'category_id' => 4,
        			'name' => 'CHICKEN SAUSAGE',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img8.png',
        			'type' => '1'
        		],
        		[
        			'category_id' => 4,
        			'name' => 'Chicken Dominator',
        			'desc' => 'Chunky paneer with crisp capsicum and spicy red pepper',
        			'image' => 'p-img1.png',
        			'type' => '1'
        		],
        	]
        	);
    }
}
