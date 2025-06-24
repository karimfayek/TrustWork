<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
class ChangePasswordController extends Controller
{
    public function showForm()
    {
        return Inertia::render('Auth/ChangePassword');
    }
    
    public function update(Request $request)
    {
        $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    
        $user = $request->user();
        $user->update([
            'password' => \Hash::make($request->password),
            'must_change_password' => false,
        ]);
    
        return redirect()->route('admin.dashboard')->with('success', 'تم تغيير كلمة السر بنجاح');
    }
    
}
