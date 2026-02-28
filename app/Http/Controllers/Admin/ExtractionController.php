<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Extraction;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
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

        $numExtractions = $project->extractions()
            ->where('supply', 0)
            ->where('type', '!=', 'mir')->where('type', '!=', 'ir')->where('type', '!=', 'qs')->where('type', '!=', 'delevery')
            ->count();
        $projectId = $project->id;

        // 1. نجيب كل المستخلصات السابقة (بدون المستخلص الحالي لو فيه)
        $previousExtractionIds = Extraction::where('project_id', $projectId)->where('supply', 0)
            ->where('type', '!=', 'mir')->where('type', '!=', 'ir')->where('type', '!=', 'qs')->where('type', '!=', 'delevery')
            ->pluck('id');

        // 2. نجيب مجموع المنصرف لكل task من البنود السابقة
        $previousQuantities = DB::table('extraction_items')
            ->whereIn('extraction_id', $previousExtractionIds)
            ->select('task_id', DB::raw('SUM(current_done) as total_prev_done'))
            ->groupBy('task_id')
            ->pluck('total_prev_done', 'task_id'); // array: [task_id => sum]
        return Inertia::render('Admin/Extraction/ExtractionForm', [
            'project' => $project->load('tasks', 'tasks.extractionItems'),
            'deductionsList' => $deductionsList,
            'prevQTYs' => $previousQuantities,
            'extractionsCount' => $numExtractions,
            'prevPay' => $project->extractions()->sum('net_total'),
        ]);
    }
    public function getPrevQTYs(Project $project, $type)
    {
        // dd($project);
        if ($type == 'delevery' || $type == 'mir' || $type == 'qs' || $type == 'ir' || $type == 'report' || $type == 'site_receipt') {

            $previousExtractionIds = Extraction::where('project_id', $project->id)
                ->where('type', '=', $type)
                ->pluck('id');
        } else {
            $previousExtractionIds = Extraction::where('project_id', $project->id)->where('supply', 0)
                ->where('type', '!=', 'mir')->where('type', '!=', 'ir')->where('type', '!=', 'qs')
                ->where('type', '!=', 'delevery')->where('type', '!=', 'report')->where('type', '!=', 'site_receipt')
                ->pluck('id');
        }
        // dd($previousExtractionIds);
        $previousQuantities = DB::table('extraction_items')
            ->whereIn('extraction_id', $previousExtractionIds)
            ->select('task_id', DB::raw('SUM(current_done) as total_prev_done'))
            ->groupBy('task_id')
            ->pluck('total_prev_done', 'task_id');
        return response()->json($previousQuantities);
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
            'type' => 'required|in:partial,final,delevery,mir,ir,qs,report,site_receipt',
            'date' => 'required|date',
            'customer_name' => 'nullable|string',
            'netTotal' => 'required|numeric',
            'total' => 'required|numeric',
            'project_code' => 'nullable|string',
            'notes' => 'nullable|string',
            'items' => 'required|array',
            'items.*.title' => 'required|string',
            'items.*.task_id' => 'required',
            'items.*.unit' => 'required|string',
            'items.*.quantity' => 'required|numeric',
            'items.*.unit_price' => 'required|numeric',
            'items.*.previous_done' => 'required|numeric',
            'items.*.current_done' => 'required|numeric',
            'items.*.total_done' => 'required|numeric',
            'items.*.progress_percentage' => 'required|numeric',
            'items.*.total' => 'required|numeric',
        ]);
        // dd($request->supply);
        //dd($request->all());
        $extraction = $project->extractions()->create([
            'type' => $request->type,
            'supply' => $request->supply,
            'isnotinclusive' => $request->isnotinclusive,
            'date' => $request->date,
            'customer_name' => $request->customer_name,
            'project_code' => $request->project_code,
            'notes' => $request->notes,
            'deductions_json' => $request->deductions,
            'total' => $request->type == 'mir' || $request->type == 'ir' || $request->type == 'qs' || $request->type == 'delevery' || $request->type == 'report' || $request->type == 'site_receipt' ? 0 : $request->total,
            'net_total' => $request->type == 'mir' || $request->type == 'ir' || $request->type == 'qs' || $request->type == 'delevery' || $request->type == 'report' || $request->type == 'site_receipt' ? 0 : $request->netTotal,
            'partial_number' => $request->num,
        ]);
        foreach ($validated['items'] as $itemData) {
            //dd($itemData);
            $extraction->items()->create($itemData);
        }
        return redirect()->route('extractions.preview', [$project->id, $extraction->id]);
    }
    public function update(Request $request, $extraction)
    {
        //dd($request->all());
        $validated = $request->validate([
            'type' => 'required|in:partial,final,delevery,mir,ir,qs,report,site_receipt',
            'date' => 'required|date',
            'customer_name' => 'nullable|string',
            'netTotal' => 'required|numeric',
            'total' => 'required|numeric',
            'project_code' => 'nullable|string',
            'notes' => 'nullable|string',
            'items' => 'required|array',
            'items.*.title' => 'required|string',
            'items.*.task_id' => 'required',
            'items.*.unit' => 'required|string',
            'items.*.quantity' => 'required|numeric',
            'items.*.unit_price' => 'required|numeric',
            'items.*.previous_done' => 'required|numeric',
            'items.*.current_done' => 'required|numeric',
            'items.*.total_done' => 'required|numeric',
            'items.*.progress_percentage' => 'required|numeric',
            'items.*.total' => 'required|numeric',
        ]);
        //dd($request->all());
        $extraction = Extraction::find($extraction);
        // dd($extraction->project);
        $extraction->update([
            'type' => $request->type,
            'supply' => $request->supply,
            'isnotinclusive' => $request->isnotinclusive,
            'date' => $request->date,
            'customer_name' => $request->customer_name,
            'project_code' => $request->project_code,
            'notes' => $request->notes,
            'deductions_json' => $request->deductions,
            'total' => $request->type == 'mir' || $request->type == 'ir' || $request->type == 'qs' || $request->type == 'delevery' || $request->type == 'report' || $request->type == 'site_receipt' ? 0 : $request->total,

            'net_total' => $request->type == 'mir' || $request->type == 'ir' || $request->type == 'qs' || $request->type == 'delevery' || $request->type == 'report' || $request->type == 'site_receipt' ? 0 : $request->netTotal,

        ]);
        $sentTaskIds = collect($validated['items'])->pluck('task_id')->toArray();
        $extraction->items()->whereNotIn('task_id', $sentTaskIds)->delete();

        // تحديث أو إدخال كل عنصر
        foreach ($validated['items'] as $itemData) {
            //dd($itemData['title']);
            $extraction->items()->updateOrCreate(
                ['task_id' => $itemData['task_id']],
                [

                    'title' => $itemData['title'],
                    'unit' => $itemData['unit'],
                    'quantity' => $itemData['quantity'],
                    'previous_done' => $itemData['previous_done'],
                    'current_done' => $itemData['current_done'],
                    'total_done' => $itemData['total_done'],
                    'unit_price' => $itemData['unit_price'],
                    'progress_percentage' => $itemData['progress_percentage'],
                    'total' => $itemData['total'],
                ]
            );
        }
        return redirect()->route('extractions.preview', [$extraction->project->id, $extraction->id]);
    }

    public function preview(Project $project, Extraction $extraction)
    {
        //dd($project);
        return Inertia::render('Admin/Extraction/ExtractionView', [
            'project' => $project,
            'extraction' => $extraction->load('items'),
        ]);
    }
    public function edit(Project $project, Extraction $extraction)
    {
        $projectId = $project->id;
        $previousExtractionIds = Extraction::where('project_id', $projectId)
            ->where('supply', 0)
            ->where('type', '!=', 'mir')->where('type', '!=', 'ir')->where('type', '!=', 'qs')->where('type', '!=', 'delevery')
            ->where('id', '!=', $extraction->id) // استثناء المستخلص الحالي
            ->pluck('id');

        $previousQuantities = DB::table('extraction_items')
            ->whereIn('extraction_id', $previousExtractionIds)
            ->select('task_id', DB::raw('SUM(current_done) as total_prev_done'))
            ->groupBy('task_id')
            ->pluck('total_prev_done', 'task_id');

        $previousQuantitiess = $extraction->items()
            ->select('task_id', DB::raw('SUM(total_done) as total_prev_done'))
            ->groupBy('task_id')
            ->pluck('total_prev_done', 'task_id');
        //dd($previousQuantitiess);
        $deductionsList = [
            ['key' => 'initial_insurance', 'label' => 'تأمين أعمال %'],
            ['key' => 'profit_tax', 'label' => 'أرباح تجارية وصناعية %'],
            ['key' => 'social_insurance', 'label' => 'تأمينات اجتماعية %'],
            ['key' => 'other_tax', 'label' => 'ضريبة أخرى نسبة مئوية'],
            ['key' => 'vat', 'label' => 'ض قيمة مضافة'],
            ['key' => 'advance_payment', 'label' => ' خصم دفعة مقدمة    '],
            ['key' => 'previous_payments', 'label' => ' ما سبق صرفة'],
        ];
        return Inertia::render('Admin/Extraction/ExtractionEdit', [
            'project' => $project->load('tasks'),
            'extraction' => $extraction->load('items', 'items.task'),
            'previousQuantities' => $previousQuantities,
            'deductionsList' => $deductionsList
        ]);
    }

    public function UploadFIle(Request $request, $id)
    {
        $extraction = Extraction::findOrFail($id);

        $request->validate([
            'file' => 'required|mimes:jpeg,png,jpg,pdf|max:10240', // 10MB كحد أقصى
        ]);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('extractions', 'private');
            $file = storage_path('app/private/' . $extraction->file);
            //dd($file);
            if (file_exists($file)) {

                @unlink($file);
            }
            $extraction->file = $path;
        }

        $extraction->save();

        return back()->with('message', 'تم  رفع المرفق!');
    }

    public function SetCollected(Request $request, $id)
    {
        // dd($request->all());
        $extraction = Extraction::findOrFail($id);
        $iscollected = $request->is_collected;
        $extraction->is_collected = $iscollected;
        $extraction->save();
        return back()->with('message', '  تم تعديل حالة التحصيل!');
    }
    public function delete(Request $request)
    {

        $extraction = Extraction::find($request->id);
        $file = public_path('\\storage\\' . $extraction->file);

        if (file_exists($file)) {
            @unlink($file);
        }
        $extraction->delete();
        return back()->with('message', 'تم الحذف');
    }


    public function showPrivateFile($filename)
    {
        $path = storage_path('app/private/' . $filename);
        //dd($path);
        if (!file_exists($path)) {
            abort(404);
        }

        // تحديد الـ mime type الصحيح
        $mime = mime_content_type($path);

        return Response::make(file_get_contents($path), 200, [
            'Content-Type' => $mime,
            'Content-Disposition' => 'inline; filename="' . $filename . '"'
        ]);
    }

}
