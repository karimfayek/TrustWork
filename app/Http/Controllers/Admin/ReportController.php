<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\User as Employee;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Reports/Index');
    }

    public function employeeReport()
    {
        $employees = Employee::with([
            'projects',
            'attendances',
            'tasks' => function ($q) {
                $q->where('status', 'done');
            }
        ])->get()->map(function ($employee) {
            return [
                'name' => $employee->name,
                'start_date' => $employee->start_date,
                'projects_open' => $employee->projects->where('end_date',  '<' , now())->count(),
                'projects_done' => $employee->projects->where('status', 'done')->count(),
                'tasks_done' => $employee->tasks->count(),
                'attendance_days' => $employee->attendances->count(),
                'remaining_items' => $employee->projects->sum('remaining_items'), // assuming هذا الحقل موجود
            ];
        });

        return Inertia::render('Reports/EmployeeReport', [
            'employees' => $employees,
        ]);
    }
}
