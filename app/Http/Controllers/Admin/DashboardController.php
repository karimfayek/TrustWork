<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;

class DashboardController extends Controller
{
     public function index(Request $request)
    {
         $query = Project::query();

    if ($request->search) {
        $query->where('name', 'like', '%' . $request->search . '%')
        ->orWhere('customer_name', 'like', '%' . $request->search . '%')
        ->orWhere('project_code', 'like', '%' . $request->search . '%');
    }
        $projects =$query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Dashboard', [
            'projects' => $projects,
             'filters' => $request->only('search'),
        ]);
    }
}
