<?php

use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert(
        	[
        		['cat_name' => 'Small'],
	        	['cat_name' => 'Regular'],
	            ['cat_name' => 'Medium'],
	            ['cat_name' => 'Large']
        	]
        	);
    }
}
