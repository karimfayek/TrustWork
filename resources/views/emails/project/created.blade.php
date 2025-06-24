@component('mail::message')
# تم إنشاء مشروع جديد

مرحباً فريق الحسابات،

تم إنشاء المشروع: **{{ $project->name }}**

يرجى الدخول لتسعير المشروع من خلال الرابط التالي:

@component('mail::button', ['url' => url('/pricing/' . $project->id)])
تسعير المشروع
@endcomponent

شكراً لكم.

@endcomponent

