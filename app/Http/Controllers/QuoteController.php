<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NordenProduct;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Quotation;
use Illuminate\Support\Facades\Mail;
use App\Mail\QuotationApproved;

class QuoteController extends Controller
{
    public function index()
    {
        //if admin retirn all quotations
        if (auth()->user()->hasRole('admin')) {
            $quotations = Quotation::with('user')
                ->latest()
                ->paginate(10);
        } else {
            $quotations = Quotation::with('user')
                ->where('user_id', auth()->user()->id)
                ->latest()
                ->paginate(10);
        }


        return inertia('Admin/Quotations/Index', [
            'quotations' => $quotations
        ]);
    }
    public function show($id)
    {
        //if admin retirn all quotations
        if (auth()->user()->hasRole('admin')) {
            $quotation = Quotation::with('items', 'items.product', 'user')->find($id);
        } else {
            $quotation = Quotation::with('items', 'items.product', 'user')->where('user_id', auth()->user()->id)->find($id);
        }
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
    public function edit($id)
    {
        $quotation = Quotation::with('items', 'items.product', 'user')->find($id);
        if (!$quotation) {
            abort(403);
        }
        return inertia('Admin/Quotations/Edit', [
            'quotation' => $quotation
        ]);
    }
    public function update(Request $request, $id)
    {
        $quotation = Quotation::find($id);
        if (!$quotation) {
            abort(403);
        }
        // dd($request->all());
        DB::transaction(function () use ($request, $quotation) {
            $quotation->update([
                'quotation_date' => $request->quotation_date,
                'company_name' => $request->company_name,
                'currency' => $request->currency,
                'body' => $request->body,
                'total' => collect($request->items)->sum('total'),
                'notes' => $request->notes,
                'user_id' => auth()->user()->id,
            ]);
            //dd($request->all());
            $quotation->items()->delete();
            foreach ($request->items as $item) {
                $quotation->items()->create($item);
            }
        });
        return redirect()
            ->route('quotes.index')
            ->with('message', 'تم تحديث عرض السعر بنجاح');
    }

    public function preview()
    {


        $products = NordenProduct::with('category')
            ->whereIn('id', session('quote_products', []))
            ->get()
            ->groupBy('category.name');
        $year = now()->year;
        $lastQuotation = Quotation::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();

        if ($lastQuotation) {
            preg_match('/(\d+)$/', $lastQuotation->quotation_number, $matches);
            $lastNumber = intval($matches[1] ?? 0);
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
            'currency' => 'required|string|in:EGP,USD',//only EGP or USD
            'company_name' => 'required|string',
            'body' => 'nullable|string',
            'items' => 'required|array',

        ]);

        DB::transaction(function () use ($request) {
            $quotation = Quotation::create([
                'quotation_number' => $request->quotation_number,
                'quotation_date' => $request->quotation_date,
                'company_name' => $request->company_name,
                'currency' => $request->currency,
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
    public function approve($id)
    {
        $quotation = Quotation::find($id);
        if (!$quotation) {
            abort(403);
        }
        if ($quotation->approved) {
            $quotation->approved = false;
            $quotation->save();
            return redirect()
                ->route('quotes.index')
                ->with('message', 'تم إلغاء الموافقة على عرض السعر بنجاح');
        }
        $quotation->approved = true;
        $quotation->save();
        //send email to acc
        $emails = explode(',', \App\Models\Setting::where('key', 'quote_notify')->value('value'));
        if (!empty($emails)) {
            $emailsArray = array_filter(array_map('trim', $emails));

            if (!empty($emailsArray)) {
                Mail::to($emailsArray)->send(new QuotationApproved($quotation));
            }
        }

        return redirect()
            ->route('quotes.index')
            ->with('message', 'تم الموافقة على عرض السعر بنجاح');
    }
    public function destroy($id)
    {
        //if admin ok if not and he is the owner of the quotation
        if (!auth()->user()->hasRole('admin')) {
            $quotation = Quotation::where('user_id', auth()->user()->id)->find($id);
        } else {
            $quotation = Quotation::find($id);
        }
        if (!$quotation) {
            abort(403);
        }
        $quotation->delete();
        return redirect()
            ->route('quotes.index')
            ->with('message', 'تم حذف عرض السعر بنجاح');
    }
}
