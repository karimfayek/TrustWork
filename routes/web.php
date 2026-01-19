<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\RecycleController
;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\DeductionController;
use App\Http\Controllers\Admin\RewardController;
use App\Http\Controllers\Admin\ToolController;
use App\Http\Controllers\Admin\ToolAssignmentController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\PricingController;
use App\Http\Controllers\Admin\ExtractionController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\AttendanceController;
use App\Http\Controllers\User\VisitsController;
use App\Http\Controllers\Admin\AdminVisitsController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\AdminHolidayController;

use App\Http\Controllers\Admin\ItemController;
use App\Http\Controllers\Admin\StockController;
use App\Http\Controllers\Admin\StockMovementController;
use App\Http\Controllers\Admin\TransactionController;
use App\Http\Controllers\Admin\ItemsDashboardController;
use App\Http\Controllers\Admin\LateController;
use App\Http\Controllers\User\EmployeeAdvanceController;
use App\Http\Controllers\User\IssueController;
use App\Http\Controllers\User\TaskProgressController;
use App\Http\Controllers\User\LoanController;
use App\Http\Controllers\User\EmployeeLeavesController;
use App\Http\Controllers\User\TripController;
use App\Http\Controllers\User\CarController;
use App\Http\Controllers\User\DriverController;
use App\Http\Controllers\Auth\ChangePasswordController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


//admin only
Route::middleware(['auth', 'role:admin'])->group(function () {

    Route::get('/optimize', function () {

        $exitCode = Artisan::call('optimize');
        return '<h1>Reoptimized class loader</h1>';
    });
    Route::get('/route-clear', function () {
        $exitCode = Artisan::call('route:clear');
        return '<h1>Reoptimized class loader</h1>';
    });
    //recycle
    Route::post('/admin/fetch-notifications', [NotificationController::class, 'index'])->name('admin.fetch.notifications');
    Route::get('/admin/recycle-bin', [RecycleController::class, 'index'])->name('admin.recyclebin');

    Route::post('/admin/recycle-bin/restore/project/{id}', [RecycleController::class, 'restoreProject'])->name('admin.recyclebin.restore.project');

    Route::post('/admin/recycle-bin/delete/project/{id}', [RecycleController::class, 'forceDeleteProject'])->name('admin.recyclebin.forceDelete.project');

    Route::post('/admin/recycle-bin/restore/user/{id}', [RecycleController::class, 'restoreUser'])->name('admin.recyclebin.restore.user');

    Route::post('/admin/recycle-bin/delete/user/{id}', [RecycleController::class, 'forceDeleteUser'])->name('admin.recyclebin.forceDelete.user');

    //projects

    Route::post('/admin/project/delete', [ProjectController::class, 'deleteProject'])->name('admin.project.delete');

    Route::get('/admin/visits', [AdminVisitsController::class, 'index'])->name('admin.visits.index');
    Route::get('/admin/visit/show/{id}', [AdminVisitsController::class, 'show'])->name('admin.visits.show');
    //reports
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/employees', [ReportController::class, 'employeeReport'])->name('reports.employees');
    Route::get('/reports/insurance', [ReportController::class, 'insuranceRefundsReport'])->name('reports.insurance');
    Route::get('/reports/finance', [ReportController::class, 'financeReport'])->name('finance.employees');
    Route::get('/reports/projects', [ReportController::class, 'projectsReport'])->name('projects.employees');
    Route::get('/reports/projects/2', [ReportController::class, 'projectsReport2'])->name('projects.employees.second');
    Route::post('/admin/user/delete', [AdminUserController::class, 'deleteUser'])->name('admin.user.delete');
    Route::post('/admin/visit/delete', [AdminVisitsController::class, 'delete'])->name('admin.visit.delete');
    Route::get('/reports/attendance', [ReportController::class, 'attReport'])->name('reports.attendance');
    Route::get('/reports/salaries', [ReportController::class, 'salariesReport'])->name('reports.salaries');
    Route::get('/reports/salaries/all', [ReportController::class, 'salariesReportAll'])->name('reports.salaries.all');
    Route::get('/reports/tools', [ReportController::class, 'toolsReport'])->name('reports.tools');
    //settings
    Route::get('/settings', [SettingController::class, 'show'])->name('settings');
    Route::get('/admin/settings', [SettingController::class, 'index'])->name('settings.get');
    Route::post('/admin/settings', [SettingController::class, 'store'])->name('settings.post');

    //lates
    Route::get('/lates', [LateController::class, 'index'])->name('lates.index');
    Route::get('/lates/getLateAttendances/{id}', [LateController::class, 'getLateAttendances'])->name('admin.lateAttendances.getLateAttendances');
    Route::post('/lates/cancelDeduct/{id}', [LateController::class, 'cancelDeduct'])->name('admin.lateAttendances.cancelDeduct');
    Route::post('/lates/updateDeduct/{id}', [LateController::class, 'updateDeduct'])->name('admin.lateAttendances.updateDeduct');
});
//admin,acc
Route::middleware(['auth', 'role:admin,acc'])->group(function () {
    //store
    Route::resource('items', ItemController::class)->except(['show']);

    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    Route::get('/items/dashboard', [ItemsDashboardController::class, 'index'])->name('items.dashboard');
    Route::post('/stock/in', [StockMovementController::class, 'storeIn'])->name('stock.in');
    Route::get('/api/stock/batch-qty', [StockMovementController::class, 'batchQty'])->name('stock.batchQty');
    Route::post('/stock/out', [StockMovementController::class, 'storeOut'])->name('stock.out');
    Route::get('/stock/{warehouse}/{product}', [StockMovementController::class, 'getStock'])->name('stock.get');

    Route::get('/stock/in', [StockController::class, 'in'])->name('stock.in.get');
    Route::get('/stock/out', [StockController::class, 'out'])->name('stock.out.get');
    Route::get('/api/products/search', [StockController::class, 'searchProducts'])->name('api.products.search');
    Route::get('/api/stock/{warehouse}/{product}', [StockController::class, 'getStock'])->name('api.stock.get');
    Route::post('/api/stock/move', [StockController::class, 'storeMovement'])->name('api.stock.move');
    Route::get('/api/stock/movements', [StockController::class, 'movements'])->name('api.stock.movements');

    Route::get('/admin/user/salary/{id}', [AdminUserController::class, 'salary'])->name('admin.user.salary');
    //pricing 

    Route::get('/pricing/{id}', [PricingController::class, 'pricing'])->name('acc.pricing');
    Route::post('/pricing/set', [PricingController::class, 'pricingSet'])->name('acc.pricing.set');


    //extractions 
    Route::get('/project/extractions/list/{project}', [ExtractionController::class, 'list'])->name('project.extractions.list');
    Route::get('/project/extractions/new/{project}', [ExtractionController::class, 'index'])->name('project.extractions.new');
    Route::post('/projects/{project}/extraction', [ExtractionController::class, 'store'])->name('project.extractions.store');
    Route::post('/extraction/update/{extraction}', [ExtractionController::class, 'update'])->name('project.extractions.update');
    Route::get('/projects/{project}/extractions/{extraction}/preview', [ExtractionController::class, 'preview'])->name('extractions.preview');
    Route::get('/private-storage/{path}', [ExtractionController::class, 'showPrivateFile'])->where('path', '.*')->name('private.storage');
    Route::get('/projects/{project}/extractions/{extraction}/edit', [ExtractionController::class, 'edit'])->name('extractions.edit');
    Route::post('/extraction/delete', [ExtractionController::class, 'delete'])->name('extraction.delete');
    Route::post('/extraction/file/upload/{id}', [ExtractionController::class, 'UploadFIle'])->name('extraction.file.upload');
    Route::post('/extraction/set/collected/{id}', [ExtractionController::class, 'SetCollected'])->name('extraction.collected.set');
    Route::post('/extraction/delevery/{project}/{type}', [ExtractionController::class, 'getPrevQTYs'])->name('extraction.delevery.getPrevQTYs');
});
Route::middleware(['auth', 'role:admin,hr'])->group(function () {
    Route::post('/admin/att/delete', [AttendanceController::class, 'delete'])->name('admin.att.delete');
});
Route::middleware(['auth', 'role:admin,acc,hr'])->group(function () {
    //users
    Route::get('/admin/users', [AdminUserController::class, 'index'])->name('users.index');
    Route::get('/user/{userId}', [ProjectController::class, 'show'])->name('admin.user.show');
    Route::get('/admin/user/create', [AdminUserController::class, 'create'])->name('admin.user.create');
    Route::post('/admin/user/create', [AdminUserController::class, 'store'])->name('admin.user.store');
    Route::get('/admin/user/edit/{id}', [AdminUserController::class, 'edit'])->name('admin.user.edit');
    Route::post('/admin/user/update/{id}', [AdminUserController::class, 'update'])->name('admin.user.update');
    //deductions
    Route::post('/admin/employee/deduction', [DeductionController::class, 'store'])->name('admin.deduction.store');

    Route::post('/admin/deduction/delete', [DeductionController::class, 'delete'])->name('admin.deduction.delete');
    //customers
    Route::get('/admin/customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('/admin/customer/{id}', [CustomerController::class, 'show'])->name('admin.customer.show');
    Route::get('/customer/create', [CustomerController::class, 'create'])->name('admin.customer.create');
    Route::post('/customer/create', [CustomerController::class, 'store'])->name('admin.customer.store');
    Route::get('/admin/customer/edit/{id}', [CustomerController::class, 'edit'])->name('admin.customer.edit');
    Route::post('/admin/customer/update/{id}', [CustomerController::class, 'update'])->name('admin.customer.update');
    //rewards .....
    Route::get('/admin/rewards', [RewardController::class, 'index'])->name('rewards.index');
    Route::post('/admin/rewards', [RewardController::class, 'store'])->name('rewards.store');
    Route::post('/admin/reward/spent/{id}', [RewardController::class, 'spent'])->name('admin.rewards.spent');
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
    Route::get('/admin/advance/list', [EmployeeAdvanceController::class, 'list'])->name('admin.advance.list');
    Route::post('/admin/advance/status', [EmployeeAdvanceController::class, 'statusAdvanceAdmin'])->name('admin.advance.status');
    Route::post('/admin/advance/settlement', [EmployeeAdvanceController::class, 'settlementAdvanceAdmin'])->name('admin.advance.settlement');

    //leaves

    Route::post('/admin/leaves/status', [EmployeeLeavesController::class, 'changeStatus'])->name('admin.leave.status');
    Route::post('/admin/leave/delete', [EmployeeLeavesController::class, 'delete'])->name('leave.delete');

    //loans

    Route::get('/admin/loans/list', [LoanController::class, 'index'])->name('admin.loans.index');
    Route::post('/admin/loans/spent/{id}', [LoanController::class, 'spent'])->name('admin.loans.spent');
    Route::post('/admin/loans/status', [LoanController::class, 'changeStatus'])->name('admin.loan.status');
    Route::post('/admin/loans/store', [LoanController::class, 'AdminStore'])->name('admin.loan.store');
    Route::post('/admin/loans/delete', [LoanController::class, 'delete'])->name('loan.delete');

    Route::post('/admin/employee/reward/', [RewardController::class, 'delete'])->name('employee.reward.delete');
    //holidays
    Route::resource('holidays', AdminHolidayController::class);
    Route::post('holidays/delete/post', [AdminHolidayController::class, 'delete'])->name('holidays.delete');
});
//employee,admin,acc
Route::middleware(['auth', 'role:employee,admin,acc,managment,hr'])->group(function () {
    //leaves

    Route::get('/employee/leaves', [EmployeeLeavesController::class, 'index'])->name('employee.leaves');
    Route::post('/leaves/request', [EmployeeLeavesController::class, 'store'])->name('employee.leaves.store');
    //Route::post('/leaves/request', [EmployeeLeavesController::class, 'requestLeave'])->name('employee.leaves.request');
    //advance
    Route::get('/employee/advance', [EmployeeAdvanceController::class, 'index'])->name('employee.advance');
    Route::post('/employee/advance', [EmployeeAdvanceController::class, 'storeAdvance'])->name('employee.advance.store');
    //expense
    Route::post('/employee/expense', [EmployeeAdvanceController::class, 'storeExpense'])->name('employee.expense.store');
    //rewards
    Route::post('/employee/reward', [RewardController::class, 'storeReward'])->name('employee.reward.store');
    //loans
    Route::post('/loans/request', [LoanController::class, 'requestLoan']);

    Route::get('/employee/att', [AttendanceController::class, 'employeeAtt'])->name('employee.att.index');

});
//role:employee,admin,acc,proj
Route::middleware(['auth', 'role:employee,admin,acc,proj,tech,managment,hr'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/calc-emp-att/{id}', [AttendanceController::class, 'calculateAttendancePercentage'])->name('calc.att');
    Route::post('/attendance/manualcheck/', [AttendanceController::class, 'manualCheckIn'])->name('check.manual');
    Route::get('/change-password', [ChangePasswordController::class, 'showForm'])->name('password.change');
    Route::post('/change-password/first', [ChangePasswordController::class, 'update'])->name('password.update.first');

});
Route::middleware(['auth', 'role:admin,acc,proj,hr'])->group(function () {

    Route::get('/attendance/list/{user?}', [AttendanceController::class, 'attList'])->name('attendance.list');

    Route::get('/attendance/filter/', [AttendanceController::class, 'attFilter'])->name('attendance.filter');

});

//employee,admin
Route::middleware(['auth', 'role:employee,admin'])->group(function () {
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');
    Route::get('/employee/project/{project}', [UserController::class, 'showProject'])->name('employee.project.show');
    Route::post('/employee/project/{project}/check-in', [AttendanceController::class, 'checkIn'])->name('attendance.checkin');
    Route::post('/attendance/checkout/{project}', [AttendanceController::class, 'checkOut'])->name('attendance.checkout');
    Route::post('/issues/store', [IssueController::class, 'store'])->name('issues.store');
    Route::post('/employee/task/{task}/complete', [UserController::class, 'taskComplete'])->name('employee.tasks.complete');
    Route::post('/task-progress', [TaskProgressController::class, 'store'])->name('employee.task.progress.store');
    Route::get('/employee/tasks', [TaskController::class, 'indexEmployee'])->name('employee.tasks.index');
    //check in
    //Route::get('/employee/checkin', [AttendanceController::class, 'showCheckIn'])->name('employee.checkin.show');
    //visits
    Route::get('/visits', [VisitsController::class, 'index'])->name('visits.index');
    Route::get('/visit/start', [VisitsController::class, 'start'])->name('visit.start');
    Route::get('/visit/show/{id}', [VisitsController::class, 'show'])->name('visits.show');
    Route::post('/visits', [VisitsController::class, 'store'])->name('visits.store');
    Route::post('/visits/{id}', [VisitsController::class, 'update'])->name('visits.update');
    Route::post('/visits/edit/{id}', [VisitsController::class, 'edit'])->name('visits.edit');

});

//admin,proj,tech,acc
Route::middleware(['auth', 'role:admin,proj,tech,acc'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
});
Route::middleware(['auth', 'role:admin,proj,tech'])->group(function () {

    Route::get('/projects/create', [ProjectController::class, 'create'])->name('admin.projects.create');
    Route::get('/projects/edit/{id}', [ProjectController::class, 'edit'])->name('admin.projects.edit');
    Route::post('/projects/update', [ProjectController::class, 'update'])->name('admin.projects.update');
    Route::post('/projects', [ProjectController::class, 'store'])->name('admin.projects.store');
});
//admin,proj
Route::middleware(['auth', 'role:admin,proj'])->group(function () {
    Route::get('/project/{projectId}', [ProjectController::class, 'show'])->name('project.show');
    Route::post('/task-progress/admin', [TaskProgressController::class, 'storeAdmin'])->name('admin.task.progress.store');
    Route::post('/task-progress/delete', [TaskProgressController::class, 'deleteAdmin'])->name('admin.task.progress.delete');
    Route::get('/task/{taskId}', [TaskController::class, 'show'])->name('task.show');
    Route::get('/projects/{projectId}/assign-tasks', [ProjectController::class, 'assignTasks'])->name('projects.assignTasks');
    Route::post('/projects/{projectId}/save-tasks', [ProjectController::class, 'saveTasks'])->name('projects.saveTasks');
    Route::post('/admin/task/delete/{id}', [ProjectController::class, 'deleteTask'])->name('admin.projects.task.delete');
    Route::get('/admin/tasks', [TaskController::class, 'index'])->name('tasks.index');
});

Route::middleware(['auth', 'role:admin,hr,driver,acc'])->group(function () {
    Route::resource('cars', CarController::class);
    Route::resource('drivers', DriverController::class);
});
Route::middleware(['auth', 'role:admin,driver'])->group(function () {
    //dashboard route
    Route::get('/driver/dashboard', [DriverController::class, 'dashboard'])->name('driver.dashboard');
    Route::post('/trips/start', [TripController::class, 'start'])
        ->name('driver.trips.start');
    Route::post('/trips/end/{trip}', [TripController::class, 'end'])
        ->name('driver.trips.end');
    Route::get('/driver/car', [CarController::class, 'DriverCar'])->name('driver.cars.index');
    Route::get('/driver/trips', [TripController::class, 'DriverTrips'])->name('driver.trips.index');

});
Route::middleware(['auth', 'role:admin,hr,driver,acc'])->group(function () {
    Route::resource('trips', TripController::class);
});





require __DIR__ . '/auth.php';
