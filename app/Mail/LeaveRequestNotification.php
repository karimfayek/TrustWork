<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LeaveRequestNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $employeeName;
    public $date;
    public $reason;
    public $user_id;

    public function __construct($employeeName, $date, $reason , $user_id)
    {
        $this->employeeName = $employeeName;
        $this->date = $date;
        $this->reason = $reason;
        $this->user_id = $user_id;
    }

    public function build()
    {
        return $this->subject('طلب أجازة جديد - ' . $this->employeeName)
                   ->view('emails.leave_request'); // Blade template
    }
}