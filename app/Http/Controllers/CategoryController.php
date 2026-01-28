<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::query();

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        return Inertia::render('Admin/Categories/CatsIndex', [
            'categories' => $query->with('parent')->latest()->paginate(20)->withQueryString(),
            'filters' => $request->only('search'),
        ]);
    }
    //create function
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Categories/CatsCreate', [
            'categories' => $categories,
        ]);
    }
    //edit function
    public function edit(Category $category)
    {
        $categories = Category::all();
        return Inertia::render('Admin/Categories/CatsEdit', [
            'category' => $category,
            'categories' => $categories,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,name|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        Category::create($request->only('name', 'parent_id'));

        return back()->with('message', 'Category created');
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,name,' . $category->id . '|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $category->update($request->only('name', 'parent_id'));

        return redirect()->route('categories.index')->with('message', 'Category updated');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index')->with('message', 'Category deleted');
    }
}
