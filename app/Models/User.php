<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use SoftDeletes;
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'must_change_password',
        'deleted_at',
        'phone',
        'hire_date',
        'offdayestype',
        'temporary'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }
    public function activeProjects()
    {
        return $this->belongsToMany(Project::class)
            ->whereDate('end_date', '>=', now()->toDateString());
    }
    public function endedProjects()
    {
        return $this->belongsToMany(Project::class)
            ->whereDate('end_date', '<', now()->toDateString());
    }
    public function tasks()
    {
        return $this->belongsToMany(Task::class)->withTimestamps()->withPivot('project_id', 'quantity');
    }
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
    public function leaves()
    {
        return $this->hasMany(Leave::class);
    }
    public function salary()
    {
        return $this->hasOne(Salary::class);
    }
    public function advances()
    {
        return $this->hasMany(Advance::class);
    }
    public function loans()
    {
        return $this->hasMany(Loan::class, 'employee_id');
    }
    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
    public function deductions()
    {
        return $this->hasMany(Deduction::class);
    }

    public function toolassignments()
    {
        return $this->hasMany(ToolAssignment::class);
    }

    public function visits()
    {
        return $this->hasMany(Visit::class);
    }
    public function rewards()
    {
        return $this->hasMany(Reward::class);
    }
    public function taskProgress()
    {
        return $this->hasMany(TaskProgress::class);
    }
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function hasRole($role)
    {
        return $this->roles()->where('name', $role)->exists();
    }

    public function hasAnyRole(array $roles)
    {
        return $this->roles()->whereIn('name', $roles)->exists();
    }

    public function driver()
    {
        return $this->hasOne(Driver::class);
    }

}
