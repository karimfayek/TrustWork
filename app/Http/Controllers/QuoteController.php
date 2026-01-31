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
    public function show($id)
    {
        $quotation = Quotation::with('items', 'items.product', 'user')->find($id);
        //dd($quotation);
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
        $year = now()->year;

        // آخر عرض سعر في نفس السنة
        $lastQuotation = Quotation::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();

        if ($lastQuotation) {
            // استخراج الرقم بعد /
            $lastNumber = intval(substr($lastQuotation->quotationNumber, -2));
            $newNumber = str_pad($lastNumber + 1, 2, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '01';
        }
        return inertia('Admin/Quotes/Preview', [
            'groupedProducts' => $products,
            'quotationNumber' => 'QT-' . $year . '/' . $newNumber,
            'today' => now()->toDateString(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'quotation_number' => 'required|unique:quotations',
            'quotation_date' => 'required|date',
            'company_name' => 'required|string',
            'body' => 'nullable|string',
            'items' => 'required|array',

        ]);

        DB::transaction(function () use ($request) {
            $quotation = Quotation::create([
                'quotation_number' => $request->quotation_number,
                'quotation_date' => $request->quotation_date,
                'company_name' => $request->company_name,
                'body' => $request->body,
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
    public function destroy($id)
    {
        $quotation = Quotation::find($id);
        $quotation->delete();
        return redirect()
            ->route('quotes.index')
            ->with('message', 'تم حذف عرض السعر بنجاح');
    }
}
