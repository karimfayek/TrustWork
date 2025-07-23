<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\ProjectCreatedForPricing;
use Illuminate\Support\Facades\Mail;
class ProjectController extends Controller
{
    public function create()
    {
        // جلب جميع الموظفين
        $users = User::where('role', 'employee')->where('status' , 1)->get();
        return Inertia::render('Projects/Create', compact('users'));
    }

    public function edit($id)
    {
        // جلب جميع الموظفين
        $users = User::where('role', 'employee')->where('status' , 1)->get();
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
            'advance_payment' => $request->advance_payment,
            'end_date' => $request->end_date,
            'created_by' => auth()->id(),
        ]);
        
        if (config('app.env') === 'production') {
            Mail::to(['accounting@trustits.net', 'hend@trustits.net'])
        ->cc(['kariem.pro@gmail.com', 'msalah@trustits.net']) 
        ->send(new ProjectCreatedForPricing($project));
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
            'project_code' => $request->project_code,
            'advance_payment' => $request->advance_payment,
            'customer_name' => $request->customer_name,
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
            if (isset($taskData['users'][0]) && is_array($taskData['users'][0])) {
                $userIds = array_column($taskData['users'], 'id');
            } else {
                $userIds = $taskData['users'];
            }
        
            $usersData = [];
           // dd( $userCount);
            $userCount = count($userIds);
           //dd($isCollaborative && $userCount > 0);
           if( $userCount > 0){            
            $isCollaborative = $taskData['unit'] === 'collaborative'; 

                if($isCollaborative){
                        //if collaborative then 
                    $quantityPerUser = ($taskData['quantity']);

                }else {
                    $quantityPerUser =   $taskData['quantity'] / $userCount;
                }
              
           
               foreach ($userIds as $userId) {
                   $usersData[$userId] = [
                       'project_id' => $project->id,
                       'quantity' => $quantityPerUser
                   ];
               }
           
              
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
        $users = User::where('role' , 'employee')->where('status' , 1)->get(); // جلب جميع الموظفين
    
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
    
        if ($request->has('employee_tasks')) {
            foreach ($request->employee_tasks as $taskId => $userIds) {
                $task = Task::findOrFail($taskId);
    
                // نتأكد أن القيمة مصفوفة
                $userIdsArray = is_array($userIds) ? $userIds : [$userIds];
    
                // توليد بيانات الربط بين المهمة والموظفين والمشروع
                $syncData = [];
                foreach ($userIdsArray as $userId) {
                    $syncData[$userId] = ['project_id' => $projectId];
                }
    
                // الربط
                $task->users()->sync($syncData);
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
