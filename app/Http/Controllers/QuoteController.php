<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NordenProduct;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Quotation;

class QuoteController extends Controller
{
    public function index()
    {
        $quotations = Quotation::with('user')
            ->latest()
            ->paginate(10);

        return inertia('Admin/Quotations/Index', [
            'quotations' => $quotations
        ]);
    }
    public function show(Quotation $quotation)
    {
        $quotation->load(['items.product.category', 'user']);

        return inertia('Admin/Quotations/Show', [
            'quotation' => $quotation
        ]);
    }
    public function create(Request $request)
    {
        session([
            'quote_products' => $request->products
        ]);

        return redirect()->route('quotes.preview');
    }

    public function preview()
    {
        $products = NordenProduct::with('category')
            ->whereIn('id', session('quote_products', []))
            ->get()
            ->groupBy('category.name');

        return inertia('Admin/Quotes/Preview', [
            'groupedProducts' => $products,
            'quotationNumber' => 'QT-' . now()->format('Ymd-His'),
            'today' => now()->toDateString(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'quotation_number' => 'required|unique:quotations',
            'quotation_date' => 'required|date',
            'company_name' => 'required|string',
            'items' => 'required|array',

        ]);

        DB::transaction(function () use ($request) {
            $quotation = Quotation::create([
                'quotation_number' => $request->quotation_number,
                'quotation_date' => $request->quotation_date,
                'company_name' => $request->company_name,
                'total' => collect($request->items)->sum('total'),
                'notes' => $request->notes,
                'user_id' => auth()->user()->id,
            ]);

            foreach ($request->items as $item) {
                $quotation->items()->create($item);
            }
        });

        session()->forget('quote_products');

        return redirect()
            ->route('products.index')
            ->with('success', 'تم حفظ عرض السعر بنجاح');
    }
}
