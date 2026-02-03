<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;
use Carbon\Carbon;
use App\Models\User;
use App\Services\EmployeePerformanceService;
use Inertia\Inertia;
class LateController extends Controller
{
    public function index()
    {

        $users = User::where('status', 1)->get();
        return Inertia::render('Admin/Late/LateIndex', [
            'users' => $users,
        ]);
    }
    public function getLateAttendances(Request $request, $userId, $from = null, $to = null)
    {
        //dd($request->all());
        $request->validate([
            'from' => 'required|date',
            'to' => 'required|date|after_or_equal:from',
        ]);
        $from = Carbon::parse($request->from);
        $to = Carbon::parse($request->to);
        $service = new EmployeePerformanceService();
        $data = $service->getAttendanceData($userId, $from, $to);
        //return lateattendancesget rounded to 2 decimal places
        return response()->json($data['lateAttendancesGet']);
    }
    public function cancelDeduct(Request $request, $id)
    {
        $attendance = Attendance::findOrFail($id);
        $attendance->late_deduct_type = null;
        $attendance->save();
        return response()->json(['success' => 'تم إلغاء خصم التأخير بنجاح']);
    }
    public function updateDeduct(Request $request, $id)
    {
        $attendance = Attendance::findOrFail($id);
        $attendance->late_deduct_type = $request->late_deduct_type;
        $attendance->save();
        return response()->json(['success' => 'تم إضافة خصم التأخير بنجاح']);
    }
}
