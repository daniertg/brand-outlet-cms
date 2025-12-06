<?php

use App\Http\Controllers\Api\OutletApiController;
use Illuminate\Support\Facades\Route;

Route::post('/outlets/nearest', [OutletApiController::class, 'nearest']);
