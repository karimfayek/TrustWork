<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function create()
    {
        // جلب جميع الموظفين
        $users = User::where('role', 'employee')->get();
        return Inertia::render('Projects/Create', compact('users'));
    }

    public function edit($id)
    {
        // جلب جميع الموظفين
        $users = User::where('role', 'employee')->get();
        $project = Project::with('tasks' , 'tasks.users', 'users')->find($id);
       
        $userIds = $project->users->pluck('id');
   
        return Inertia::render('Projects/Edit', compact('users', 'project','userIds'));
    }
    
    public function deleteTask($id)
    {
        
       $task = Task::find($id);
       $task->delete();
       return ['success' => true];
    }
    public function show($id)
    {
        $project = Project::find($id)->load('advances', 'advances.user');
       // dd($project);
        $tasks = $project->tasks()->with('users')->get();
        $users = $project->users;
    
        return Inertia::render('Projects/ProjectDetails', [
            'project' => $project,
            'tasks' => $tasks,
            'users' => $users,
        ]);
    }
    public function store(Request $request)
    {
        //dd($request->tasks);
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'user_ids' => 'required|array',
            'tasks' => 'required|array',
            'tasks.*.title' => 'required|string|max:255',
            'tasks.*.description' => 'nullable|string',
            'tasks.*.start_date' => 'required|date',
            'tasks.*.end_date' => 'required|date',
            'tasks.*.quantity' => 'required|integer',
            'tasks.*.unit' => 'required|string',
        ]);

        // إنشاء المشروع
        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'created_by' => auth()->id(),
        ]);

        // ربط الموظفين بالمشروع
        $project->users()->attach($request->user_ids);

        // إضافة المهام للمشروع
        foreach ($request->tasks as $taskData) {
            $task = Task::create([
                'title' => $taskData['title'],
                'description' => $taskData['description'],
                'start_date' => $taskData['start_date'],
                'end_date' => $taskData['end_date'],
                'quantity' => $taskData['quantity'],
                'unit' => $taskData['unit'],
                'project_id' => $project->id,
            ]);
        
            $userCount = count($taskData['user']);
            $isCollaborative = $taskData['unit'] === 'collaborative'; 
        
            foreach ($taskData['user'] as $userId) {
                $user = User::findOrFail($userId);
        
                // احسب الكمية المنسوبة لهذا الموظف
                $quantityPerUser = $isCollaborative
                    ? ($taskData['quantity'])
                    : $taskData['quantity']  / $userCount;
        
                // خزّن الكمية مع المشروع في العلاقة pivot
                $user->tasks()->attach($task->id, [
                    'project_id' => $project->id,
                    'quantity' => $quantityPerUser,
                ]);
            }
        }
       

        return redirect()->route('admin.dashboard')->with('message', 'تم إضافة المشروع بنجاح!');
    }
    public function update(Request $request)
    {
      //dd($request->all());
       $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'user_ids' => 'nullable|array',
            'tasks' => 'nullable|array',
            'tasks.*.title' => 'nullable|string|max:255',
            'tasks.*.description' => 'nullable|string',
            'tasks.*.start_date' => 'nullable|date',
            'tasks.*.end_date' => 'nullable|date',
            'tasks.*.quantity' => 'nullable|integer',
            'tasks.*.unit' => 'nullable|string',
            'tasksnew.*.title' => 'nullable|string|max:255',
            'tasksnew.*.description' => 'nullable|string',
            'tasksnew.*.start_date' => 'nullable|date',
            'tasksnew.*.end_date' => 'nullable|date',
            'tasksnew.*.quantity' => 'nullable|integer',
            'tasksnew.*.unit' => 'nullable|string',
        ]);
     //dd($request->all());
        $project = Project::find($request->projectId);
        $project->update([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'created_by' => auth()->id(),
        ]);
       // dd($request->tasksnew);
        $project->users()->sync($request->user_ids);
        // Update the task
        foreach ($request->tasksnew as $taskDataNew) {
            
            $task = Task::create([
                 'title' => $taskDataNew['title'],
                 'description' => $taskDataNew['description'],
                 'start_date' => $taskDataNew['start_date'],
                 'end_date' => $taskDataNew['end_date'],
                 'quantity' => $taskDataNew['quantity'],
                 'unit' => $taskDataNew['unit'],
                 'project_id' => $project->id,
             ]);          
          // dd($taskDataNew);
            $userCount = count($taskDataNew['users']);
           
            $isCollaborative = $taskDataNew['unit'] === 'collaborative'; 
        
            foreach ($taskDataNew['users'] as $userId) {
                $user = User::findOrFail($userId);
        
                // احسب الكمية المنسوبة لهذا الموظف
                $quantityPerUser = $isCollaborative
                    ? ($taskDataNew['quantity'])
                    : $taskDataNew['quantity'] / $userCount;
        
                // خزّن الكمية مع المشروع في العلاقة pivot
                $user->tasks()->attach($task->id, [
                    'project_id' => $project->id,
                    'quantity' => $quantityPerUser,
                ]);
            }
         }
         foreach ($request->tasks as $taskData) {
            $task = Task::find($taskData['id']);
        
            $task->update([
                'title' => $taskData['title'],
                'description' => $taskData['description'],
                'start_date' => $taskData['start_date'],
                'end_date' => $taskData['end_date'],
                'quantity' => $taskData['quantity'],
                'unit' => $taskData['unit'],
                'project_id' => $project->id,
            ]);
        
            // معالجة users سواء كانوا كائنات أو أرقام
           // dd($taskData['users']);
            if (isset($taskData['users'][0]) && is_array($taskData['users'][0])) {
                $userIds = array_column($taskData['users'], 'id');
            } else {
                $userIds = $taskData['users'];
            }
        
            $usersData = [];
           // dd( $userCount);
            $isCollaborative = $taskData['unit'] === 'collaborative'; 
            $userCount = count($userIds);
           
            $quantityPerUser = $isCollaborative && $userCount > 0
                ? ($taskData['quantity'])
                : $taskData['quantity'] / $userCount;
        
            foreach ($userIds as $userId) {
                $usersData[$userId] = [
                    'project_id' => $project->id,
                    'quantity' => $quantityPerUser
                ];
            }
        
            $task->users()->sync($usersData);
        }
        
        
    
        // Sync the user (attach if not already)
      
    
        return redirect()->route('admin.dashboard')->with('message', 'تم تحديث المشروع بنجاح!');
    }

    public function assignTasks($projectId)
    {
        $project = Project::with('tasks', 'users')->findOrFail($projectId);
        $tasks = Task::with('users')->get(); // جلب جميع المهام المتاحة
        $users = User::where('role' , 'employee')->get(); // جلب جميع الموظفين
    
        // إرسال البيانات إلى React عبر Inertia
        return Inertia::render('Projects/AssignTasks', [
            'project' => $project,
            'tasks' => $tasks,
            'users' => $users,
        ]);
    }
    
    public function saveTasks(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
    
        // تخصيص المهام للموظفين
      
        if ($request->has('employee_tasks')) {
            foreach ($request->employee_tasks as $taskId => $userId) {
                $task = Task::findOrFail($taskId);
                $user = User::findOrFail($userId);
                
                // Sync the selected user (replaces any existing assignments)
                $task->users()->sync([$userId => ['project_id' => $projectId]]);
            }
        }
    
        return redirect()->route('admin.dashboard')->with('message', 'Tasks assigned successfully');
    }
}
