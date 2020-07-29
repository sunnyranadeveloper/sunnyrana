<?php

use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('currencys')->insert(
        	[
        		['sym' => '$','country'=>'Doller'],
        		['sym' => '€','country'=>'Euro'],
        	]
        	);
    }
}
