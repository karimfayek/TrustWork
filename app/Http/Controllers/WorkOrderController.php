<?php

namespace App\Http\Controllers;

use App\Models\WorkOrder;
use App\Mail\WorkOrderCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Customer;
class WorkOrderController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if ($user->hasRole('admin') || $user->hasRole('operator')) {
            $workOrders = WorkOrder::with('creator', 'employees')->latest()->get();
        } else {
            // dd($user->requestedWorkOrders);
            $workOrders = $user->requestedWorkOrders()->with('creator', 'employees')->latest()->get();
        }
        return Inertia::render('WorkOrders/Index', [
            'workOrders' => $workOrders,
            'employees' => User::where('status', '1')->get(),
            'customers' => Customer::all(),
        ]);
    }
    public function indexEmployee()
    {
        $user = auth()->user();
        $workOrders = $user->workOrders()->with('creator', 'employees')->latest()->get();

        return Inertia::render('WorkOrders/EmployeeIndex', [
            'workOrders' => $workOrders,
        ]);
    }
    public function create()
    {

        return Inertia::render('WorkOrders/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'client_name' => 'required|string|max:255',
            'client_phone' => 'required|string|max:50',
            'client_address' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:1,2,3',
        ]);
        $data['user_id'] = auth()->user()->id;
        $workOrder = WorkOrder::create($data);
        $emails = explode(',', \App\Models\Setting::where('key', 'work_order_notify')->value('value'));
        if (!empty($emails)) {
            $emailsArray = array_filter(array_map('trim', $emails));

            if (!empty($emailsArray)) {
                Mail::to($emailsArray)->send(new WorkOrderCreated($workOrder));
            }
        }

        return redirect()
            ->back()
            ->with('message', 'تم إرسال طلب أمر الشغل بنجاح');
    }
    public function assignDate(Request $request, $id)
    {
        $workOrder = WorkOrder::findOrFail($id);
        $request->validate([
            'assign_date' => 'required|date',
        ]);
        $workOrder->update([
            'assign_date' => $request->assign_date,
        ]);
        return back()->with('message', 'تم تعيين تاريخ التنفيذ بنجاح');
    }
    public function destroy($id)
    {
        $user = auth()->user();
        if ($user->hasRole('admin')) {
            $workOrder = WorkOrder::findOrFail($id);
            $workOrder->delete();
        } else {
            $workOrder = $user->workOrders()->findOrFail($id);
            $workOrder->delete();
        }
        return redirect()
            ->back()
            ->with('message', 'تم حذف طلب أمر الشغل بنجاح');
    }
    public function assign(Request $request, $id)
    {
        $workOrder = WorkOrder::findOrFail($id);
        $request->validate([
            'employees' => 'required|array',
            'employees.*' => 'exists:users,id',
            'assign_date' => 'required|date',
        ]);

        $workOrder->employees()->sync($request->employees);

        $workOrder->update([
            'status' => 'assigned',
            'assign_date' => $request->assign_date,
        ]);

        return back()->with('message', 'تم تعيين طلب أمر الشغل بنجاح');
    }
    public function update(Request $request, $id)
    {
        $workOrder = WorkOrder::findOrFail($id);
        $request->validate([
            'client_name' => 'required|string|max:255',
            'client_phone' => 'required|string|max:50',
            'client_address' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:1,2,3',
        ]);
        $workOrder->update([
            'client_name' => $request->client_name,
            'client_phone' => $request->client_phone,
            'client_address' => $request->client_address,
            'description' => $request->description,
            'priority' => $request->priority,
        ]);
        return back()->with('message', 'تم تحديث طلب أمر الشغل بنجاح');
    }
    public function complete(Request $request, $id)
    {
        $user = auth()->user();

        $data = $request->validate([
            'completeFile' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
            'completeOrderData' => 'required|date',
        ]);
        $path = null;
        //store the file at private storage
        if ($request->hasFile('completeFile')) {
            $path = $request->file('completeFile')->store('workorders', 'private');
        }
        $workOrder = WorkOrder::findOrFail($id);
        if (!$user->hasRole('admin') && !$user->hasRole('operator') && !$user->workOrders->contains($workOrder->id)) {
            return back()->with('error', 'لا يمكن إكمال طلب أمر الشغل');
        }
        $file = storage_path('app/private/' . $workOrder->file);
        if (file_exists($file)) {
            @unlink($file);
        }
        $workOrder->update([
            'status' => 'completed',
            'completion_date' => $request->completeOrderData,
            'file' => $path,
        ]);
        return back()->with('message', 'تم إكمال طلب أمر الشغل بنجاح');
    }
}
