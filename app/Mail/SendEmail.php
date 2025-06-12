<?php

namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $na;
    public $em;
    public $ph;
    public $mes;
    public function __construct($name,$email,$phone,$message)
    {
        $this->na = $name;
        $this->em = $email;
        $this->ph = $phone;
        $this->mes = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $e_name = $this->na;
        $e_email = $this->em;
        $e_phone = $this->ph;
        $e_message = $this->mes;
        return $this->view('email.contact',compact('e_message','e_email','e_phone','e_name'))->subject('message from site');
    }
}
