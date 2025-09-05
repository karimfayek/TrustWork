<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\ProjectCreatedForPricing;
use App\Mail\ProjectCreatedMail;
use App\Mail\ProjectEditedMail;
use Illuminate\Support\Facades\Mail;
use App\Services\TaskAssignmentService;
class ProjectController extends Controller
{
    public function create()
    {
        // جلب جميع الموظفين
        $users = User::whereHas('roles', function ($query) {
                $query->where('name', 'employee'); 
            })->get();
        return Inertia::render('Projects/Create', compact('users'));
    }

    public function edit($id)
    {
        // جلب جميع الموظفين
        $users = User::whereHas('roles', function ($query) {
                $query->where('name', 'employee'); 
            })->get();
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
            'project_code' => 'nullable|string',
            'customer_name' => 'nullable|string',
            'customer_email' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'user_ids' => 'nullable|array',
            'tasks' => 'required|array',
            'tasks.*.title' => 'required|string|max:255',
            'tasks.*.description' => 'nullable|string',
            'tasks.*.start_date' => 'nullable|date',
            'tasks.*.end_date' => 'nullable|date',
            'tasks.*.quantity' => 'required|integer',
            'tasks.*.unit' => 'required|string',
        ]);

        // إنشاء المشروع
        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'project_code' => $request->project_code,
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'advance_payment' => $request->advance_payment,
            'end_date' => $request->end_date,
            'created_by' => auth()->id(),
        ]);
        
        if (config('app.env') === 'production') {
            $emails = explode(',', \App\Models\Setting::where('key', 'pricing_notify')->value('value'));
            //$customer = explode(',', $project->customer_email);
            if (!empty($emails)) {
                 $emailsArray =  array_filter(array_map('trim', $emails));
            
                if (!empty($emailsArray)) {
                    Mail::to($emailsArray)->send(new ProjectCreatedForPricing($project));
                }
            }
           /*   if (!empty($customer)) {
                 $customerEmailsArray =  array_filter(array_map('trim', $customer));
            
                if (!empty($customerEmailsArray)) {
                    Mail::to($customer)->send(new ProjectCreatedMail($project));
                }
            } */
        }     
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
        //dd($taskData);
            $userCount = count($taskData['users']);
            $isCollaborative = $taskData['unit'] === 'collaborative'; 
        
            foreach ($taskData['users'] as $userId) {
                $user = User::findOrFail($userId);
       // dd($userCount);
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
        $taskService = new TaskAssignmentService();
      //dd($request->all());
       $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'customer_email' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'user_ids' => 'nullable|array',
            'tasks' => 'nullable|array',
            'tasks.*.title' => 'nullable|string|max:255',
            'tasks.*.description' => 'nullable|string',
            'tasks.*.start_date' => 'nullable|date',
            'tasks.*.end_date' => 'nullable|date',
            'tasks.*.quantity' => 'nullable|integer',
            'tasks.*.up' => 'nullable|numeric',
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
            'project_code' => $request->project_code,
            'advance_payment' => $request->advance_payment,
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'created_by' => auth()->id(),
        ]);
       // dd($request->tasksnew);
        $project->users()->sync($request->user_ids);
        // Update the task
        foreach ($request->tasksnew as $taskDataNew) {
           //dd( $taskDataNew['up']);
            $task = Task::create([
                 'title' => $taskDataNew['title'],
                 'description' => $taskDataNew['description'],
                 'start_date' => $taskDataNew['start_date'],
                 'end_date' => $taskDataNew['end_date'],
                 'quantity' => $taskDataNew['quantity'],
                 'unit' => $taskDataNew['unit'],
                 'unit_price' =>  (float)$taskDataNew['up'],
                 'tp' => bcmul((string)$taskDataNew['up'], (string) $taskDataNew['quantity'], 2),
                 'project_id' => $project->id,
             ]);          
          // dd($taskDataNew);
                $taskService->assignUsersToTask(
                    $task,
                    $taskDataNew['users'],
                    $project->id,
                    $taskDataNew['quantity'],
                    $taskDataNew['unit'],
                    false // attach للمهام الجديدة
                );
         }
         foreach ($request->tasks as $taskData) {
           // dd($taskData);
            $task = Task::find($taskData['id']);
       // dd( bcmul((string) $taskData['up'], (string) $taskData['quantity'], 2) );
            $task->update([
                'title' => $taskData['title'],
                'description' => $taskData['description'],
                'start_date' => $taskData['start_date'],
                'end_date' => $taskData['end_date'],
                'quantity' => $taskData['quantity'],
                'unit' => $taskData['unit'],                
                'unit_price' => (float)$taskData['up'],
                'tp' => bcmul((string) $taskData['up'], (string) $taskData['quantity'], 2),
                'project_id' => $project->id,
            ]);
        
            // معالجة users سواء كانوا كائنات أو أرقام
           // dd($taskData['users']);
           
           $userIds = [];

            if (!empty($taskData['users'])) {
                $firstUser = $taskData['users'][0];

                $userIds = is_array($firstUser)
                    ? array_column($taskData['users'], 'id')
                    : $taskData['users'];
            }
            //dd($userIds);
            $taskService->assignUsersToTask(
                $task,
                $userIds,
                $project->id,
                $taskData['quantity'],
                $taskData['unit'],
                true // sync للمهام المعدلة
            );
           //dd($isCollaborative && $userCount > 0);
         
          
        }
        
        
    
        // Sync the user (attach if not already)
      if($request->send_email){
         $emails = explode(',', $project->customer_email);
            if (!empty($emails)) {
                 $emailsArray =  array_filter(array_map('trim', $emails));
            
                if (!empty($emailsArray)) {
                    Mail::to($emailsArray)->send(new ProjectCreatedMail($project));
                }
            }

      }
    
        return redirect()->route('admin.dashboard')->with('message', 'تم تحديث المشروع بنجاح!');
    }

    public function assignTasks($projectId)
    {
        $project = Project::with('tasks', 'users')->findOrFail($projectId);
        $tasks = Task::where('project_id' , $projectId)->with('users')->get(); // جلب جميع المهام المتاحة
        //dd($project->tasks);
        $users = User::whereHas('roles', function ($query) {
                $query->where('name', 'employee'); 
            })->get(); // جلب جميع الموظفين
    
        // إرسال البيانات إلى React عبر Inertia
        return Inertia::render('Projects/AssignTasks', [
            'project' => $project,
            'tasks' => $tasks,
            'users' => $users,
        ]);
    }
    
    public function saveTasks(Request $request, $projectId)
    {
        $taskService = new TaskAssignmentService();
        //dd($projectId);
        $project = Project::findOrFail($projectId);
    
        if ($request->has('employee_tasks')) {
           // dd($request->employee_tasks);
            foreach ($request->employee_tasks as $taskId => $userIds) {
                $task = Task::findOrFail($taskId);

                $userIdsArray = is_array($userIds) ? $userIds : [$userIds];
            
                // ⚠️ نحتاج الكمية ونوع المهمة (unit)
                $quantity = $task->quantity ?? 1;
                $unitType = $task->unit ?? 'normal'; // مثلاً 'collaborative' أو غيرها
            
                // استخدام الخدمة
                $taskService->assignUsersToTask(
                    $task,
                    $userIdsArray,
                    $project->id,
                    $quantity,
                    $unitType,
                    true // نستخدم sync لأن هذه الصفحة للتعديل
                );
            }
        }
    
        return redirect()->route('admin.dashboard')->with('message', 'Tasks assigned successfully');
    }
    
    public function deleteProject(Request $request)
    {
       // dd($request->all());
        $project = Project::find($request->id)->delete();
       
        return back()->with('message', 'تم   الحذف!'); 
    }
}
