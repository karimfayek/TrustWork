<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $finalSalary = $user->salary->final_salary;
        $advances = $user->advances()->get()->load('project');
        $expenses = $user->expenses()->get()->load('by', 'advance' , 'advance.project');
        $leaves = $user->leaves()->get();
        $loans = $user->loans()->get();

        $totalAdvance = $user->advances()->accepted()->sum('amount');
      // dd($totalAdvance);
       $userProjects = $user->projects();
       $activeProjects = $userProjects->whereDate('end_date', '>=', now()->toDateString())
       ->get();
      //dd($activeProjects);
        $totalExpense = $expenses->sum('amount');
        $remaining = $totalAdvance - $totalExpense;
        return Inertia::render('Profile/Edit', [
            'advances' => $advances,
            'expenses' => $expenses,
            'totalAdvance' => $totalAdvance,
            'totalExpense' => $totalExpense,
            'remaining' => $remaining,
            'activeProjects' => $activeProjects,
            'finalSalary'=>  (int)$finalSalary,
            'leaves'=> $leaves,
            'loans' =>$loans
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
