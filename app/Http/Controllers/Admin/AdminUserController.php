<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function index()
    {
        $users = User::where('status' , 1)->with('salary')->get();

        return Inertia::render('Admin/Users/List', [
            'users' => $users
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function edit($id)
    {
        // جلب جميع الموظفين
        $user = User::findOrFail($id)->load('salary' , 'advances', 'activeProjects');
        $acceptedAdvances = $user->advances()->where('status' , 'accepted')->get()->load('project');
        $pendingAdvances = $user->advances()->where('status' , 'pending')->get()->load('project');
        $expenses = $user->expenses()->select('amount', 'description', 'spent_at', 'id')->get();
        $deductions= $user->deductions()->select('amount', 'type', 'deducted_at' , 'note' ,'id')->get();
        $totalAdvance = $acceptedAdvances->sum('amount');
        $totalExpense = $expenses->sum('amount');
        $remaining = $totalAdvance - $totalExpense;
       // $project = Project::with('tasks' , 'tasks.users', 'users')->find($id);
       
       // $userIds = $project->users->pluck('id');
       return Inertia::render('Admin/Users/Edit', [
        'acceptedAdvances' => $acceptedAdvances,
        'pendingAdvances' => $pendingAdvances,
        'expenses' => $expenses,
        'totalAdvance' => $totalAdvance,
        'totalExpense' => $totalExpense,
        'remaining' => $remaining,
        'user' => $user,
        'deductions' => $deductions,
    ]);
       
    }
    public function show($id)
    {
        $project = Project::find($id);
        $tasks = $project->tasks()->with('users')->get();
        $users = $project->users;
    
        return Inertia::render('Projects/ProjectDetails', [
            'project' => $project,
            'tasks' => $tasks,
            'users' => $users,
        ]);
    }
    public function salary($id)
    {
        $user = User::findOrFail($id)->load('salary' , 'advances', 'activeProjects');
        $acceptedAdvances = $user->advances()->where('status' , 'accepted')->get()->load('project');
        $pendingAdvances = $user->advances()->where('status' , 'pending')->get()->load('project');
        $expenses = $user->expenses()->select('amount', 'description', 'spent_at', 'id')->get();
        $deductions= $user->deductions()->select('amount', 'type', 'deducted_at' , 'note' ,'id')->get();
        $totalAdvance = $acceptedAdvances->sum('amount');
        $totalExpense = $expenses->sum('amount');
        $remaining = $totalAdvance - $totalExpense;
       // $project = Project::with('tasks' , 'tasks.users', 'users')->find($id);
       
       // $userIds = $project->users->pluck('id');
       return Inertia::render('Admin/Users/Salary', [
        'acceptedAdvances' => $acceptedAdvances,
        'totalAdvance' => $totalAdvance,
        'totalExpense' => $totalExpense,
        'remaining' => $remaining,
        'user' => $user,
    ]);
}
    public function store(Request $request )
    {
        //dd($request->all());
        $existAndDeleted = User::withTrashed()->where('email' , $request->email)->where('status' , 0)->first();
        if($existAndDeleted){
            $existAndDeleted->update([
                'status' => 1 
            ]);
            $existAndDeleted->restore();
            return back()->with('message', '   المستخدم كان موجودا فى سله المهملات وتمت استعادتة - اذهب لقائمه الموظفين وقم بتعديله !'); 
        }
       $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'base_salary' => 'required|numeric',
            'final_salary' => 'required|numeric',
            'password' => 'required|min:8',
        ]);
        $currentuserRole = auth()->user()->role ;

       
       $user =  User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $currentuserRole === "admin" ? $request->role : 'employee',
            'password' => Hash::make($request->password),
            'must_change_password' => $request->must_change_password,
        ]);

        if($user){

            $user->salary()->create([
                'base_salary' => $request->base_salary,
                'final_salary' => $request->final_salary,
            ]);
        }
      
    
        return back()->with('message', 'تم انشاء الموظف بنجاح!'); // "Task updated successfully"
    }
    public function update(Request $request , $id)
    {
        //dd($request->all());
       $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'base_salary' => 'required|numeric',
            'final_salary' => 'required|numeric',
        ]);
       // dd($request->all());
       $currentuserRole = auth()->user()->role ;
      // 
        $user = User::with('salary')->find($id);
        if ($user->salary) {
        $user->salary()->update([
            'base_salary' => $request->base_salary,
            'final_salary' => $request->final_salary,
        ]);
    }else {
        $user->salary()->create([
            'base_salary' => $request->base_salary,
            'final_salary' => $request->final_salary,
        ]);
    }
    if ($request->filled('password')) {
        $pass = Hash::make($request->password);
        $user->update([
            'password' => $pass,
        ]);
    }
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'must_change_password' => $request->must_change_password,
        ]);

        if($currentuserRole === "admin" && auth()->user()->id !== $user->id ){
            $user->update([
                'role' => $request->role,
            ]);
        }

      //  $user->update($validated);
     
      
      
    
        return back()->with('message', 'تم تحديث الموظف بنجاح!'); // "Task updated successfully"
    }

    public function assignTasks($projectId)
    {
        $project = Project::with('tasks', 'users')->findOrFail($projectId);
        $tasks = Task::with('users')->get(); // جلب جميع المهام المتاحة
        $users = User::all(); // جلب جميع الموظفين
    
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

    
    public function deleteUser(Request $request)
    {
       // dd($request->all());
        $user = User::find($request->id);
        if($user->id === auth()->user()->id){
            return back()->with('message', ' لا يمكن مسح المستخدم الحالى(لا تمسح نفسك)!'); 
        }
        if($user){
            $user->update([
                'status' => 0 
            ]);
            $user->delete();
            return back()->with('message', 'تم   الحذف!'); 
        }else{
            return back()->with('message', '   حدثت مشكله اثناء الحذف!'); 
        }
    }
}
