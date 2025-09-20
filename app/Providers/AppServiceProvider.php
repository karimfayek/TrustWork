<?php

namespace App\Providers;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

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
        $this->configureRateLimiting();
        Route::middleware('web')
        ->group(function () {
            // تسجيل ميدل وير مخصص باسم admin
            Route::aliasMiddleware('admin', AdminMiddleware::class);

            // لو عندك Routes في ملفات مستقلة، ضيفهم هنا
            $this->loadRoutesFrom(base_path('routes/web.php'));
        });
        Vite::prefetch(concurrency: 3);
    }
    
protected function configureRateLimiting()
{
    RateLimiter::for('login', function (Request $request) {
        return Limit::perMinute(5)->by($request->ip());
    });

    // مثال: limiter عام للـ API
    RateLimiter::for('api', function (Request $request) {
        return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
    });
}
}
