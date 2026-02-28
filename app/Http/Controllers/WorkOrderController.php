<?php

namespace App\Http\Controllers;

use App\Models\WorkOrder;
use App\Mail\WorkOrderCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Models\User;

class WorkOrderController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if ($user->hasRole('admin') || $user->hasRole('operator')) {
            $workOrders = WorkOrder::with('creator', 'employees')->latest()->get();
        } else {
            $workOrders = $user->workOrders()->with('creator', 'employees')->latest()->get();
        }
        return Inertia::render('WorkOrders/Index', [
            'workOrders' => $workOrders,
            'employees' => User::where('status', '1')->get()
        ]);
    }
    public function create()
    {

        return Inertia::render('WorkOrders/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_phone' => 'required|string|max:50',
            'client_address' => 'required|string|max:255',
            'description' => 'required|string',
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
            'employees.*' => 'exists:users,id'
        ]);

        $workOrder->employees()->sync($request->employees);

        $workOrder->update([
            'status' => 'assigned'
        ]);

        return back()->with('message', 'تم تعيين طلب أمر الشغل بنجاح');
    }
    public function complete($id)
    {
        $workOrder = WorkOrder::findOrFail($id);
        $workOrder->update([
            'status' => 'completed'
        ]);
        return back()->with('message', 'تم إكمال طلب أمر الشغل بنجاح');
    }
}
