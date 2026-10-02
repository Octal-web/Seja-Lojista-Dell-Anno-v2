<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LojistasController;
use App\Http\Controllers\PoliticasController;
use App\Http\Controllers\TrackingController;
use App\Http\Middleware\BotRenderer;

Route::prefix('/sejalojista26')->group(function () {
    Route::prefix('/quero-ser-lojista')->group(function () {
        Route::post('/expansao', [LojistasController::class, 'expansao'])->name('Lojistas.expansao');

        Route::post('/primeira-etapa', [LojistasController::class, 'enviar'])->name('Lojistas.enviar');
        Route::get('/segunda-etapa/{token}', [LojistasController::class, 'continuacao'])->name('Lojistas.continuacao');
        Route::post('/segunda-etapa/{token}', [LojistasController::class, 'continuacaoAction'])->name('Lojistas.continuacaoAction');
        Route::get('/concluido/{token}', [LojistasController::class, 'concluido'])->name('Lojistas.concluido');
    });

    Route::prefix('/tracking')->group(function () {
        Route::post('/entrada', [TrackingController::class, 'entrada'])->name('Tracking.entrada');
        Route::post('/atividade', [TrackingController::class, 'atividade'])->name('Tracking.atividade');
        Route::post('/secoes', [TrackingController::class, 'secoes'])->name('Tracking.secoes');
        Route::post('/formulario', [TrackingController::class, 'formulario'])->name('Tracking.formulario');
    });

    Route::get('/politica-de-privacidade', [PoliticasController::class, 'privacidade'])->name('Politicas.privacidade');
    Route::get('/politica-de-cookies', [PoliticasController::class, 'cookies'])->name('Politicas.cookies');

    // Usuários normais -> Inertia (React) como antes
    // Crawlers / IAs -> HTML estático sem Node (via BotRenderer)
    Route::get('/', [HomeController::class, 'index'])
        ->middleware(BotRenderer::class)
        ->name('Home.index');
});
