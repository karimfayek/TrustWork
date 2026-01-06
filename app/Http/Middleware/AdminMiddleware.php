<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, ...$roles)
    {
        //dd($roles);
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();
        /* 
         if ($user && in_array($user->role, $roles)) {
             return $next($request);

         } */
        if ($user && $user->hasAnyRole($roles)) {
            return $next($request);
        }
        /*  $redirectTo = match ($user->role) {
             'admin' => 'admin.dashboard',
             'acc' => 'admin.dashboard',
             'proj' => 'admin.dashboard',
             'tech' => 'admin.dashboard',
             'employee' => 'profile.edit',
             'managment' => 'employee.att.index',
             'hr' => 'users.index',
             default => 'profile.edit',
         };  */
        //dd($redirectTo);
        $redirectTo = match (true) {
            $user->hasRole('admin'),
            $user->hasRole('acc'),
            $user->hasRole('proj'),
            $user->hasRole('tech') => 'admin.dashboard',
            $user->hasRole('driver') => 'driver.dashboard',

            $user->hasRole('employee') => 'profile.edit',

            $user->hasRole('managment') => 'employee.att.index',
            $user->hasRole('hr') => 'users.index',

            default => 'profile.edit',
        };
        return redirect()->intended(route($redirectTo, absolute: false));

        //return redirect()->route('dashboard')->with('error', 'ليس لديك صلاحية الدخول هنا.');
    }

}
