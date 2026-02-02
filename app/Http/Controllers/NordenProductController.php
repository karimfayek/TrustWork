<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NordenProduct;
use App\Models\Category;

use Inertia\Inertia;
class NordenProductController extends Controller
{
    public function index(Request $request)
    {

        $query = NordenProduct::query();

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('part_number', 'like', '%' . $request->search . '%')
                    ->orWhereHas('category', function ($q) use ($request) {
                        $q->where('name', 'like', '%' . $request->search . '%');
                    });
            });
        }

        // Stock filter
        if ($request->filled('stock')) {
            $query->where('stock', $request->stock); // 0 or 1
        }

        // Category
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        return Inertia::render('Admin/Products/ProductsIndex', [
            'products' => $query->with('category')->latest()->paginate(50)->withQueryString(),
            'categories' => Category::whereNull('parent_id')
                ->with('children')
                ->get(),
            'filters' => $request->only('search', 'stock'),
        ]);
    }
    //create new product
    public function create()
    {
        return Inertia::render('Admin/Products/ProductCreate', [
            'categories' => Category::all(),
        ]);
    }
    //edit
    public function edit(NordenProduct $product)
    {
        if (!auth()->user()->hasRole('admin')) {
            abort(403);
        }
        return Inertia::render('Admin/Products/ProductEdit', [
            'product' => $product,
            'categories' => Category::all(),
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'stock' => 'required|boolean',
            'quantity' => 'nullable|numeric',
            'description' => 'nullable|string|max:255',
            'price' => 'required|numeric',
            'currency' => 'required|string|max:3',
            'cost_price' => 'nullable|numeric',
            'part_number' => 'required|string|unique:norden_products,part_number|max:255',
            'data_sheet' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
        ]);

        NordenProduct::create($request->all());

        return back()->with('message', 'Product created');
    }

    public function update(Request $request, NordenProduct $product)
    {
        if (!auth()->user()->hasRole('admin')) {
            abort(403);
        }
        $request->validate([
            'name' => 'nullable|string|max:255',
            'stock' => 'required|boolean',
            'quantity' => 'nullable|numeric',
            'description' => 'nullable|string|max:255',
            'price' => 'required|numeric',
            'currency' => 'required|string|max:3',
            'cost_price' => 'nullable|numeric',
            'part_number' => 'required|string|unique:norden_products,part_number,' . $product->id . ',id|max:255',
            'data_sheet' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product->update($request->all());

        return redirect()->route('products.index')->with('message', 'Product updated');
    }

    public function destroy(NordenProduct $product)
    {
        if (!auth()->user()->hasRole('admin')) {
            abort(403);
        }
        $product->delete();
        return redirect()->route('products.index')->with('message', 'Product deleted');
    }
}
