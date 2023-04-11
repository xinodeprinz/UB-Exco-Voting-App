<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)
    ->middleware(['guest'])
    ->group(function () {
        Route::match(['GET', 'POST'], '/', 'login')->name('login');
    });

Route::controller(HomeController::class)
    ->middleware(['auth'])
    ->group(function () {
        Route::get('/home', 'index');
        Route::get('/posts', 'posts');
        Route::get('/user', 'authUser');
    });
