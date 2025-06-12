<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;

class DashboardController extends Controller
{
     public function index()
    {
        $projects = Project::withCount('users')->latest()->get();

        return Inertia::render('Admin/Dashboard', [
            'projects' => $projects
        ]);
    }
}
