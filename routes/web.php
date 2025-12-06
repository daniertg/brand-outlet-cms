<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\OutletController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Brand routes
    Route::resource('brands', BrandController::class)->except(['show']);

    // Outlet routes
    Route::resource('outlets', OutletController::class)->except(['show']);
});

require __DIR__.'/settings.php';
