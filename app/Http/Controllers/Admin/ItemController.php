<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::with('transactions')->orderBy('name')->get();

        return Inertia::render('Items/Index', [
            'items' => $items
        ]);
    }

    public function create()
    {
        return Inertia::render('Items/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'quantity' => 'required|numeric|min:0',
            'alert_quantity' => 'nullable|numeric|min:0',
        ]);

        Item::create($request->all());

        return redirect()->route('items.index')->with('success', 'تم إضافة الصنف بنجاح');
    }

    public function edit(Item $item)
    {
        return Inertia::render('Items/Edit', [
            'item' => $item
        ]);
    }

    public function update(Request $request, Item $item)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'alert_quantity' => 'nullable|numeric|min:0',
        ]);

        $item->update($request->all());

        return redirect()->route('items.index')->with('success', 'تم التحديث بنجاح');
    }

    public function destroy(Item $item)
    {
        $item->delete();
        return redirect()->route('items.index')->with('success', 'تم الحذف');
    }
}
