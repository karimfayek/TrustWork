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
       
        if ($user && in_array($user->role, $roles)) {
            return $next($request);
           
        }
        $redirectTo = match ($user->role) {
            'admin' => 'admin.dashboard',
            'acc' => 'users.index',
            'proj' => 'admin.dashboard',
            'tech' => 'admin.dashboard',
            default => 'dashboard',
        }; 
        //dd($redirectTo);
        return redirect()->intended(route( $redirectTo, absolute: false));
    
       //return redirect()->route('dashboard')->with('error', 'ليس لديك صلاحية الدخول هنا.');
    }
    
}
