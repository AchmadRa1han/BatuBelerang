<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

use App\Http\Controllers\DebugDatabaseController;

Route::get('/debug/database', [DebugDatabaseController::class, 'index'])->name('debug.database');

require __DIR__.'/settings.php';
