<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Holiday;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminHolidayController extends Controller
{
    public function index()
    {
        $holidays = Holiday::orderBy('date', 'asc')->get();

        return Inertia::render('Admin/Holidays/Index', [
            'holidays' => $holidays,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Holidays/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date'  => 'required|date|unique:holidays,date',
        ]);

        Holiday::create($validated);

        return redirect()->route('holidays.index')->with('message', 'تم إضافة الإجازة بنجاح');
    }

    public function edit(Holiday $holiday)
    {
        return Inertia::render('Admin/Holidays/Edit', [
            'holiday' => $holiday,
        ]);
    }

    public function update(Request $request, Holiday $holiday)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date'  => 'required|date|unique:holidays,date,' . $holiday->id,
        ]);

        $holiday->update($validated);

        return redirect()->route('holidays.index')->with('message', 'تم تعديل الإجازة بنجاح');
    }

    public function destroy(Holiday $holiday)
    {
        $holiday->delete();

        return redirect()->route('holidays.index')->with('message', 'تم حذف الإجازة بنجاح');
    }
   
     public function delete(Request $request)
    {
        $id = $request->input('id');
        $holiday = Holiday::find($id);

        if ($holiday) {
            $holiday->delete();
            return redirect()->route('holidays.index')->with('message', 'تم حذف الإجازة بنجاح');
        } else {
            return redirect()->route('holidays.index')->with('error', 'الإجازة غير موجودة');
        }
    }
}
