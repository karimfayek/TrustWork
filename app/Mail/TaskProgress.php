<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TaskProgress extends Mailable
{
    use Queueable, SerializesModels;

    public $projectName;
    public $task;
    public $qty_done;
    public $users;

    public function __construct($projectName,$task,  $qty_done, $users)
    {
        $this->task = $task;
        $this->projectName = $projectName;
        $this->qty_done = $qty_done;
        $this->users = $users;
    }

    public function build()
    {
        return $this->subject('تسجيل تقدم فى بند للمشروع' )
                   ->view('emails.task_progress'); // Blade template
    }
}