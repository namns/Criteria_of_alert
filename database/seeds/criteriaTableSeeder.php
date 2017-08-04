<?php

use Illuminate\Database\Seeder;

class criteriaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('criteria')->delete();
        DB::table('criteria')->insert([
            [
                'code'	        => 'test1',
                'title'	        => 'tiêu chí 1',
                'formulas'	    => 'a+a',
                'status'	    => 1,
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ],
            [
                'code'	        => 'test2',
                'title'	        => 'tiêu chí 2',
                'formulas'	    => 'b+b',
                'status'	    => 0,
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ]
        ]);
    }
}
