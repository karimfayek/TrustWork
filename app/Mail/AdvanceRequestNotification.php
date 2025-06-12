<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdvanceRequestNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $employeeName;
    public $projectName;
    public $amount;
    public $notes;
    public $user_id;

    public function __construct($employeeName, $projectName, $amount, $notes , $user_id)
    {
        $this->employeeName = $employeeName;
        $this->projectName = $projectName;
        $this->amount = $amount;
        $this->notes = $notes;
        $this->user_id = $user_id;
    }

    public function build()
    {
        return $this->subject('طلب عهدة جديد - ' . $this->employeeName)
                   ->view('emails.advance_request'); // Blade template
    }
}