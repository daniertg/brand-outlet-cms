<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('outlets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')
                ->constrained('brands')
                ->cascadeOnDelete();
            $table->string('name')->index('idx_outlets_name');
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->string('phone', 50)->nullable();
            $table->timestamps();

            $table->index(['latitude', 'longitude'], 'idx_outlets_coordinates');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('outlets');
    }
};
