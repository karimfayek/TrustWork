<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\DeductionController;
use App\Http\Controllers\Admin\RewardController;
use App\Http\Controllers\Admin\ToolController;
use App\Http\Controllers\Admin\ToolAssignmentController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\AttendanceController;
use App\Http\Controllers\User\VisitsController;
use App\Http\Controllers\Admin\AdminVisitsController;
use App\Http\Controllers\User\EmployeeAdvanceController;
use App\Http\Controllers\User\IssueController;
use App\Http\Controllers\User\TaskProgressController;
use App\Http\Controllers\User\LoanController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


//admin only
Route::middleware(['auth' ,  'role:admin'])->group(function () {

    Route::get('/optimize', function() {
        $exitCode = Artisan::call('optimize');
        return '<h1>Reoptimized class loader</h1>';
    });


    Route::get('/admin/visits', [AdminVisitsController::class, 'index'])->name('admin.visits.index');
    Route::get('/admin/visit/show/{id}', [AdminVisitsController::class, 'show'])->name('admin.visits.show'); 
    Route::get('/attendance/filter/', [AttendanceController::class, 'attFilter'])->name('attendance.filter');
   //reports
   Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/employees', [ReportController::class, 'employeeReport'])->name('reports.employees');
    Route::get('/reports/projects', [ReportController::class, 'projectsReport'])->name('projects.employees');
});

//employee,admin,acc
Route::middleware(['auth' ,  'role:employee,admin,acc'])->group(function () {
    Route::get('/calc-emp-att/{id}/{month?}', [AttendanceController::class, 'calculateAttendancePercentageUntillToday'])->name('calc.att');
    //advance
    Route::get('/employee/advance', [EmployeeAdvanceController::class, 'index'])->name('employee.advance');
    Route::post('/employee/advance', [EmployeeAdvanceController::class, 'storeAdvance'])->name('employee.advance.store');
    //expense
    Route::post('/employee/expense', [EmployeeAdvanceController::class, 'storeExpense'])->name('employee.expense.store');
    //rewards
    Route::post('/employee/reward', [RewardController::class, 'storeReward'])->name('employee.reward.store');
//loans
Route::post('/loans/request', [LoanController::class, 'requestLoan']);

});

//employee,admin
Route::middleware(['auth' ,  'role:employee,admin'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');
    Route::get('/employee/project/{project}', [UserController::class, 'showProject'])->name('employee.project.show');
    Route::post('/employee/project/{project}/check-in', [AttendanceController::class, 'checkIn']) ->name('attendance.checkin');
    Route::post('/attendance/checkout/{project}', [AttendanceController::class, 'checkOut'])->name('attendance.checkout');       
    Route::post('/issues/store', [IssueController::class, 'store'])->name('issues.store');
    Route::post('/employee/task/{task}/complete', [UserController::class, 'taskComplete'])->name('employee.tasks.complete');
    Route::post('/task-progress', [TaskProgressController::class, 'store'])->name('employee.task.progress.store');
    Route::get('/employee/tasks', [TaskController::class, 'indexEmployee'])->name('employee.tasks.index');
        //check in
    Route::get('/attendance/list/{user?}', [AttendanceController::class, 'attList'])->name('attendance.list');
    //Route::get('/employee/checkin', [AttendanceController::class, 'showCheckIn'])->name('employee.checkin.show');
        //visits
    Route::get('/visits', [VisitsController::class, 'index'])->name('visits.index');
    Route::get('/visit/start', [VisitsController::class, 'start'])->name('visit.start');
    Route::get('/visit/show/{id}', [VisitsController::class, 'show'])->name('visits.show');
    Route::post('/visits', [VisitsController::class, 'store'])->name('visits.store');
    Route::post('/visits/{id}', [VisitsController::class, 'update'])->name('visits.update');

});

//admin,proj
Route::middleware(['auth', 'role:admin,proj'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/project/{projectId}', [ProjectController::class, 'show'])->name('project.show');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('admin.projects.create');
    Route::get('/projects/edit/{id}', [ProjectController::class, 'edit'])->name('admin.projects.edit');
    Route::post('/projects/update', [ProjectController::class, 'update'])->name('admin.projects.update');
    Route::post('/projects', [ProjectController::class, 'store'])->name('admin.projects.store');        
    Route::get('/task/{taskId}', [TaskController::class, 'show'])->name('task.show');
    Route::get('/projects/{projectId}/assign-tasks', [ProjectController::class, 'assignTasks'])->name('projects.assignTasks');
    Route::post('/projects/{projectId}/save-tasks', [ProjectController::class, 'saveTasks'])->name('projects.saveTasks');
    Route::post('/admin/task/delete/{id}', [ProjectController::class, 'deleteTask'])->name('admin.projects.task.delete');
    Route::get('/admin/tasks', [TaskController::class, 'index'])->name('tasks.index');
});

//admin,acc
Route::middleware(['auth', 'role:admin,acc'])->group(function () {
    //users
    Route::get('/admin/users', [AdminUserController::class, 'index'])->name('users.index');
    Route::get('/user/{userId}', [ProjectController::class, 'show'])->name('admin.user.show');
    Route::get('/admin/user/create', [AdminUserController::class, 'create'])->name('admin.user.create');
    Route::post('/admin/user/create', [AdminUserController::class, 'store'])->name('admin.user.store');
    Route::get('/admin/user/edit/{id}', [AdminUserController::class, 'edit'])->name('admin.user.edit');
    Route::post('/admin/user/update/{id}', [AdminUserController::class, 'update'])->name('admin.user.update');
    //deductions
    Route::post('/admin/employee/deduction', [DeductionController::class, 'store'])->name('admin.deduction.store');
    //customers
    Route::get('/admin/customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('/admin/customer/{id}', [CustomerController::class, 'show'])->name('admin.customer.show');
    Route::get('/customer/create', [CustomerController::class, 'create'])->name('admin.customer.create');
    Route::post('/customer/create', [CustomerController::class, 'store'])->name('admin.customer.store');
    Route::get('/admin/customer/edit/{id}', [CustomerController::class, 'edit'])->name('admin.customer.edit');
    Route::post('/admin/customer/update/{id}', [CustomerController::class, 'update'])->name('admin.customer.update');
    //rewards
    Route::get('/admin/rewards', [RewardController::class, 'index'])->name('rewards.index');
    Route::post('/admin/rewards', [RewardController::class, 'store'])->name('rewards.store');
    //tools assign
    Route::post('/admin/tools/assign', [ToolAssignmentController::class, 'assignTool'])->name('tools.assign');
    Route::post('/admin/tools/{id}/lost', [ToolAssignmentController::class, 'markAsLost'])->name('tools.lost');
    Route::post('/admin/tools/{id}/returned', [ToolAssignmentController::class, 'markAsReturned'])->name('tools.returned');
    Route::get('/admin/tool-assignments', [ToolAssignmentController::class, 'index'])->name('admin.tool-assignments');
    //tools
    Route::get('/admin/tools', [ToolController::class, 'index'])->name('tools.index');
    Route::get('/tool/{toolId}', [ToolController::class, 'show'])->name('admin.tool.show');
    Route::get('/admin/tool/create', [ToolController::class, 'create'])->name('admin.tool.create');
    Route::post('/admin/tool/create', [ToolController::class, 'store'])->name('admin.tool.store');
    Route::get('/admin/tool/edit/{id}', [ToolController::class, 'edit'])->name('admin.tool.edit');
    Route::post('/admin/tool/update/{id}', [ToolController::class, 'update'])->name('admin.tool.update');
    //advances
    Route::post('/admin/advance/delete', [EmployeeAdvanceController::class, 'deleteAdvance'])->name('admin.advance.delete');
    Route::post('/admin/advance', [EmployeeAdvanceController::class, 'storeAdvanceAdmin'])->name('admin.advance.store');
    Route::post('/admin/advance/status', [EmployeeAdvanceController::class, 'statusAdvanceAdmin'])->name('admin.advance.status');
    Route::post('/admin/advance/settlement', [EmployeeAdvanceController::class, 'settlementAdvanceAdmin'])->name('admin.advance.settlement');
    //manula checkin
    Route::post('/attendance/manualcheck/', [AttendanceController::class, 'manualCheckIn'])->name('check.manual');
});


require __DIR__.'/auth.php';
