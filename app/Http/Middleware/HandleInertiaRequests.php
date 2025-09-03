<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user() ? $request->user() : null;
        //$user ? $user['rolesnames'] = $user->roles()->pluck('name') : null;
        if($user){
            $user->load('rewards');
            
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? array_merge(
                $user->toArray(), 
                ['rolesnames' => $user->roles()->pluck('name')]
            ) : null,
            ],
            'flash' =>[
                'message' => $request->session()->get('message'),
                'type' => $request->session()->get('type' , 'success'),
            ]
        ];
    }
}
