<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\WinnerController;
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
        Route::post('/candidates/create', 'createCandidate');
        Route::get('/{name}/about', 'aboutPost');
    });

Route::controller(CandidateController::class)
    ->middleware(['auth'])
    ->group(function () {
        Route::get('/{type}/{postName}/candidates', 'index');
        Route::get('/{type}/{postName}/elections', 'elections');
        Route::patch('/vote/{candidateId}', 'vote');
        Route::get('/{postName}/{type}/refetch-candidates', 'fetchCandidates');
    });

Route::controller(WinnerController::class)
    ->middleware(['auth'])
    ->group(function () {
        Route::patch('/winners/{type}/store', 'store');
    });
