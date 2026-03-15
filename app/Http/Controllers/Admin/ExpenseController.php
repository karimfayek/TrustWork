<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CompanyExpense;
use App\Models\ExpenseCategory;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use App\Models\Project;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $query = CompanyExpense::query();
        if ($request->search) {
            $query->where('category_id', $request->search);
        }
        $categories = ExpenseCategory::all();
        $filters = [
            'category_id' => $request->category_id,
        ];
        $sum = $query->sum('amount');
        $expenses = $query->with('category')->paginate(20)->withQueryString();

        return Inertia::render('Admin/Expenses/Index', compact('expenses', 'categories', 'filters', 'sum'));
    }
    public function create()
    {
        return Inertia::render('Admin/Expenses/Create', [
            'users' => User::select('id', 'name')->get(),
            'projects' => Project::all(),
            'categories' => ExpenseCategory::all()
        ]);
    }
    public function store(Request $request)
    {

        $data = $request->all();
        $data['stored_by'] = auth()->id();
        if ($request->hasFile('file')) {

            $file = $request->file('file');

            $path = $file->store('expenses', 'local');

            $data['file_path'] = $path;
        }
        CompanyExpense::create($data);
        return redirect()->route('expenses.index');
    }
    public function show($id)
    {
        $expense = CompanyExpense::find($id);
        return Inertia::render('Admin/Expenses/Show', compact('expense'));
    }
    public function edit($id)
    {
        $projects = Project::all();
        $categories = ExpenseCategory::all();
        $expense = CompanyExpense::find($id);
        return Inertia::render('Admin/Expenses/Edit', compact('expense', 'projects', 'categories'));
    }
    public function update(Request $request, $id)
    {
        $expense = CompanyExpense::find($id);
        $data = $request->all();
        if ($request->hasFile('file')) {

            $file = $request->file('file');

            $path = $file->store('expenses', 'local');

            $data['file_path'] = $path;
        }
        $data['stored_by'] = auth()->id();
        //delete old file if exists
        if ($expense->file_path) {
            Storage::delete($expense->file_path);
        }
        $expense->update($data);
        return redirect()->route('expenses.index');
    }
    public function destroy($id)
    {
        $expense = CompanyExpense::find($id);
        if ($expense->file_path) {
            Storage::delete($expense->file_path);
        }
        $expense->delete();
        return redirect()->route('expenses.index');
    }
    public function CategoryIndex()
    {
        $categories = ExpenseCategory::withSum('expenses', 'amount')->get();
        return Inertia::render('Admin/Expenses/Categories/Index', compact('categories'));
    }
    public function CategoryCreate()
    {
        return Inertia::render('Admin/Expenses/Categories/Create');
    }
    public function CategoryStore(Request $request)
    {

        ExpenseCategory::create($request->all());
        return redirect()->route('expense-categories.index')->with('message', 'تم إضافة تصنيف جديد بنجاح');
    }
    public function CategoryShow($id)
    {
        $expenseCategory = ExpenseCategory::find($id);
        return Inertia::render('Admin/Expenses/Categories/Show', compact('expenseCategory'));
    }
    public function CategoryEdit($id)
    {
        $category = ExpenseCategory::find($id);
        return Inertia::render('Admin/Expenses/Categories/Edit', compact('category'));
    }
    public function CategoryUpdate(Request $request, $id)
    {
        $expenseCategory = ExpenseCategory::find($id);
        $expenseCategory->update($request->all());
        return redirect()->route('expense-categories.index')->with('message', 'تم تحديث التصنيف بنجاح');
    }
    public function CategoryDestroy($id)
    {
        $expenseCategory = ExpenseCategory::find($id);
        $expenseCategory->delete();
        return back()->with('message', 'تم حذف التصنيف بنجاح');
    }
    public function viewFile($id)
    {
        $expense = CompanyExpense::findOrFail($id);

        if (!$expense->file_path) {
            abort(404);
        }

        return Storage::response($expense->file_path);
    }
}
