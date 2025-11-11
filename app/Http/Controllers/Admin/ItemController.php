<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product as Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index()
    {
        $old = \App\Models\Item::all();
        foreach($old as $index => $i)(
            Item::create([
                'name' => $i->name,
                'code' => $index +1,
                'unit' => $i->unit,
                'minimum_stock' => $i->alert_quantity,
            ])
            );
       
        $items = Item::orderBy('name')->get();

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
        $data = $request->validate([
            'name' => 'required|string|max:255',
'code' => 'required|string|unique:products,code',
'unit' => 'required|string|max:50',
'minimum_stock' => 'nullable|numeric|min:0',
        ]);

        Item::create($data);

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
