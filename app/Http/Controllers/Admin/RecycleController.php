<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;
use Inertia\Inertia;

class RecycleController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::onlyTrashed()->get();
        $users = User::onlyTrashed()->get();

        return Inertia::render('Admin/Recycle/Index', [
            'projects' => $projects,
            'users' => $users,
        ]);
    }
    public function restoreProject($id)
{
    $item = Project::onlyTrashed()->findOrFail($id);
    $item->restore();

    return back()->with('success', 'تم استعادة العنصر بنجاح');
}
public function restoreUser($id)
{
    $item = User::onlyTrashed()->findOrFail($id);
    $item->restore();

    return back()->with('success', 'تم استعادة العنصر بنجاح');
}

public function forceDeleteProject($id)
{
    //dd($id);
    $item = Project::onlyTrashed()->findOrFail($id);
    $item->forceDelete();

    return back()->with('message', 'تم حذف العنصر نهائيًا');
}

public function forceDeleteUser($id)
{
    $item = User::onlyTrashed()->findOrFail($id);
    $item->forceDelete();

    return back()->with('message', 'تم حذف العنصر نهائيًا');
}


}
