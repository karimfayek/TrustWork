<!-- resources/views/emails/work-order.blade.php -->
<h2>طلب أمر شغل جديد</h2>

<p><strong>اسم العميل:</strong> {{ $workOrder->client_name }}</p>
<p><strong>رقم الهاتف:</strong> {{ $workOrder->client_phone }}</p>
<p><strong>العنوان:</strong> {{ $workOrder->client_address }}</p>
<p><strong>الموظف:</strong> {{ $workOrder->user?->name }}</p>

@if($workOrder->description)
    <p><strong>التفاصيل:</strong></p>
    <p>{{ $workOrder->description }}</p>
@endif