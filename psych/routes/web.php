<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('post')->group(function() {
        Route::post('/add_post', [PostController::class, 'store'])->name('add.post');
        Route::get('/get_posts', [PostController::class, 'index'])->name('get.posts');
        Route::post('/{post}/like', [PostController::class, 'toggleLike'])->name('like.post');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
