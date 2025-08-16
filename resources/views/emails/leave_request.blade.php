<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>طلب أجازة جديد</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: white;
            padding: 20px;
            border-radius: 0 0 5px 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .details {
            margin: 15px 0;
        }
        .label {
            font-weight: bold;
            color: #4CAF50;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>طلب أجازة جديد</h2>
    </div>
    <div class="content">
        <p>مرحباً،</p>
        <p>تم تقديم طلب أجازة جديد من قبل الموظف:</p>
        
        <div class="details">
            <p><span class="label">اسم الموظف:</span> {{ $employeeName }}</p>
            <p><span class="label"> تاريخ:</span> {{ $date }}</p>
            <p><span class="label">السبب:</span> {{ $reason ?? 'لا توجد ملاحظات' }}</p>
        </div>
        
        <p>يرجى مراجعة الطلب واتخاذ الإجراء اللازم.</p>
        <a href="{{ url('/') }}/admin/user/edit/{{ $user_id }}#leaves">مراجعه الطلب</a>
    </div>
    <div class="footer">
        <p>© {{ date('Y') }} شركة تراست. جميع الحقوق محفوظة.</p>
    </div>
</body>
</html>