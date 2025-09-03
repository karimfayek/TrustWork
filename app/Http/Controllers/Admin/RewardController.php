<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Reward;
use App\Models\User;

class RewardController extends Controller
{
    public function index()
{
    $rewards = Reward::with('user')
        ->latest()
        ->get()
        ->groupBy('user_id')
        ->map(function ($items) {
            return [
                'user' => $items->first()->user->name ?? 'غير معروف',
                'total_points' => $items->sum('points'),
                'records' => $items->map(function ($reward) {
                    return [
                        'date' => $reward->reward_date,
                        'type' => $reward->type,
                        'reason' => $reward->reason,
                        'points' => $reward->points,
                        'amount' => $reward->amount,
                        'id' => $reward->id,
                    ];
                }),
            ];
        })
        ->values();
        $users = User::all();

    return Inertia::render('Admin/Rewards/Index', [
        'rewards' => $rewards,
        'users' => $users,
    ]);
}
public function store(Request $request)
{
    $validated = $request->validate([
        'user_id' => 'required|exists:users,id',
        'reward_date' => 'required|date',
        'type' => 'nullable|string',
        'reason' => 'nullable|string',
        'points' => 'nullable|integer|min:1',
        'amount' => 'required|integer|min:1',
    ]);

    Reward::create($validated);

    return redirect()->route('rewards.index')->with('message', 'تمت إضافة المكافأة بنجاح');
}

public function delete(Request $request )
{
    
//dd($request->all());
    $reward = Reward::find($request->id);
    $reward->delete();
    return back()->with('message', 'تمت حذف المكافأة بنجاح');
}

}
