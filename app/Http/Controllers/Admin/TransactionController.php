<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'item_id' => 'required|exists:items,id',
            'type' => 'required|in:in,out,return',
            'quantity' => 'required|numeric|min:0.01',
            'note' => 'nullable|string'
        ]);

        $item = Item::findOrFail($request->item_id);
        $quantity = $request->quantity;

        if ($request->type === 'out' && $item->quantity < $quantity) {
            return back()->withErrors(['quantity' => 'الكمية غير كافية']);
        }

        // تعديل الكمية حسب نوع العملية
        switch ($request->type) {
            case 'in':
            case 'return':
                $item->quantity += $quantity;
                break;
            case 'out':
                $item->quantity -= $quantity;
                break;
        }

        $item->save();

        Transaction::create([
            'item_id' => $item->id,
            'type' => $request->type,
            'quantity' => $quantity,
            'note' => $request->note,
        ]);

        return redirect()->back()->with('success', 'تم تسجيل العملية بنجاح');
    }
}
