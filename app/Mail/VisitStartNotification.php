<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VisitStartNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $employeeName;
    public $customerName;
    public $visitsCountThisMonth;

    public function __construct($employeeName, $customerName, $visitsCountThisMonth)
    {
        $this->employeeName = $employeeName;
        $this->customerName = $customerName;
        $this->visitsCountThisMonth = $visitsCountThisMonth;
    }

    public function build()
    {
        return $this->subject(' بدء زيارة جديدة ل - ' . $this->customerName)
                   ->view('emails.visit_strat'); // Blade template
    }
}