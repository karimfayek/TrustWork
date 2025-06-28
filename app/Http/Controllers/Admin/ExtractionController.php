<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Project;
use App\Models\Extraction;
class ExtractionController extends Controller
{
    public function list(Project $project)
    { 
        return Inertia::render('Admin/Extraction/ExtractionList', [
            'project' => $project->load('extractions'),
        ]);
    }
    public function index(Project $project)
    { 
        $deductionsList = [
            ['key' => 'initial_insurance', 'label' => 'تأمين أعمال %'],
            ['key' => 'profit_tax', 'label' => 'أرباح تجارية وصناعية %'],
            ['key' => 'social_insurance', 'label' => 'تأمينات اجتماعية %'],
            ['key' => 'other_tax', 'label' => 'ضريبة أخرى نسبة مئوية'],
            ['key' => 'vat', 'label' => 'ض قيمة مضافة'],
            ['key' => 'advance_payment', 'label' => ' خصم دفعة مقدمة    '],
            ['key' => 'previous_payments', 'label' => ' ما سبق صرفة'],
        ];
        $numExtractions = $project->extractions()->where('type' , 'partial')->count();
        return Inertia::render('Admin/Extraction/ExtractionForm', [
            'project' => $project->load('tasks'),
            'deductionsList' => $deductionsList,
            'extractionsCount' => $numExtractions,
            'prevPay' =>  $project->extractions()->sum('net_total'),
        ]);
    }
    public function show(Project $project)
    {
       
        $deductionsList = [
            ['key' => 'initial_insurance', 'label' => 'تأمين ابتدائي 5%'],
            ['key' => 'final_insurance', 'label' => 'تأمين نهائي 5%'],
            ['key' => 'taxes', 'label' => 'ضرائب مقاولات 5%'],
            ['key' => 'profit_tax', 'label' => 'أرباح تجارية وصناعية 1%'],
            ['key' => 'social_insurance', 'label' => 'تأمينات اجتماعية 3.6%'],
            ['key' => 'other_tax', 'label' => 'ضريبة أخرى نسبة مئوية'],
            ['key' => 'vat', 'label' => 'قيمة مضافة'],
        ];
    
        return Inertia::render('Admin/Extraction/ExtractionPreview', [
            'project' => $project,
        ]);
    }

    public function store(Request $request, Project $project)
    {
      //dd($request->all());
        $validated = $request->validate([
            'type' => 'required|in:partial,final',
            'date' => 'required|date',
            'customer_name' => 'nullable|string',
            'netTotal'=>'required|numeric',
            'project_code' => 'nullable|string',
            'notes' => 'nullable|string',
            'items' => 'required|array',
            'items.*.title' => 'required|string',
            'items.*.unit' => 'required|string',
            'items.*.quantity' => 'required|numeric',
            'items.*.unit_price' => 'required|numeric',
            'items.*.previous_done' => 'required|numeric',
            'items.*.current_done' => 'required|numeric',
            'items.*.total_done' => 'required|numeric',
            'items.*.progress_percentage' => 'required|numeric',
            'items.*.total' => 'required|numeric',
        ]);
        $extraction = $project->extractions()->create([
            'type' => $request->type,
            'date'=>$request->date,
            'customer_name' => $request->customer_name,
            'project_code' => $request->project_code,
            'notes' => $request->notes,
            'deductions_json' => $request->deductions,
            'net_total'=>  $request->netTotal,
            'partial_number' => $project->extractions()->where('type' , 'partial')->count() +1,
        ]);
        foreach ($validated['items'] as $itemData) {
            $extraction->items()->create($itemData);
        }
        return redirect()->route('extractions.preview', [$project->id, $extraction->id]);
    }

    public function preview(Project $project, Extraction $extraction)
    {
        return Inertia::render('Admin/Extraction/ExtractionView', [
            'project' => $project,
            'extraction' => $extraction->load('items'),
        ]);
    }

    public function delete(Request $request)
    {

        Extraction::find($request->id)
        ->delete();
        return back()->with('message' , 'تم الحذف');
    }


}
