<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('brands')->insert([
            [
                'id' => 1,
                'name' => 'tmi',
                'description' => 'tmi aja',
                'logo' => null,
                'created_at' => '2025-12-06 03:19:05',
                'updated_at' => '2025-12-06 03:19:05',
            ],
            [
                'id' => 2,
                'name' => 'a',
                'description' => 'a',
                'logo' => 'a.com',
                'created_at' => '2025-12-06 04:31:18',
                'updated_at' => '2025-12-06 04:31:18',
            ],
        ]);
    }
}
