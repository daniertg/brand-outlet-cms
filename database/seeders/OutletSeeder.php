<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Outlet;

class OutletSeeder extends Seeder
{
    public function run(): void
    {
        Outlet::insert([
            [
                'brand_id' => 1,
                'name' => 'Outlet 1',
                'address' => 'Jl. Raya No. 1',
                'latitude' => -7.953056,
                'longitude' => 112.612778,
                'phone' => '08123456789',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'brand_id' => 2,
                'name' => 'Outlet 2',
                'address' => 'Jl. Sudirman No. 20',
                'latitude' => -7.951112,
                'longitude' => 112.613990,
                'phone' => '08987654321',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
