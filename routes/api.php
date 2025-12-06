<?php

use App\Http\Controllers\Api\OutletApiController;
use Illuminate\Support\Facades\Route;

Route::get('/outlets/nearest', [OutletApiController::class, 'nearest']);
