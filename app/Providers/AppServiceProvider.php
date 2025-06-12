<?php

namespace App\Providers;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::middleware('web')
        ->group(function () {
            // تسجيل ميدل وير مخصص باسم admin
            Route::aliasMiddleware('admin', AdminMiddleware::class);

            // لو عندك Routes في ملفات مستقلة، ضيفهم هنا
            $this->loadRoutesFrom(base_path('routes/web.php'));
        });
        Vite::prefetch(concurrency: 3);
    }
}
