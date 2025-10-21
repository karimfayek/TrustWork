<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Transaction;
use Inertia\Inertia;

class ItemsDashboardController  extends Controller
{
    public function index()
    {
        $itemsCount = Item::count();

        $alertCount = Item::whereNotNull('alert_quantity')
                          ->whereColumn('quantity', '<=', 'alert_quantity')
                          ->count();

        $totalQuantity = Item::sum('quantity');

        $recentTransactions = Transaction::with('item')
                                ->latest()
                                ->paginate(5);

        return Inertia::render('Items/Dashboard', [
            'itemsCount' => $itemsCount,
            'alertCount' => $alertCount,
            'totalQuantity' => $totalQuantity,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}