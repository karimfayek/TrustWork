<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>  تقدم فى بند مشروع</title>
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
        <h2>
            تقدم فى بند مشروع
              </h2>
    </div>
    <div class="content">
        <p>مرحباً،</p>
        <p>تم  التقدم فى بند مشروع:</p>
        
        <div class="details">
            <p><span class="label">المشروع:</span> {{ $projectName }}</p>
            <p><span class="label">البند:</span> {{ $task->title }}</p>
            <p><span class="label">الكميه المنجزة:</span> {{ $qty_done }}</p>            
            <p><span class="label">الكميه الكلية للبند:</span> {{ $task->quantity }}</p>
            <p><span class="label">المتبقى:</span> {{ $task->remaining }}</p>
            <p><span class="label">
                @if(isset($users) && is_iterable($users))
    {{-- إذا كان مجموعة مستخدمين --}}
    @if(count($users) > 0)
        <div class="users-list">
            <h4>الموظفون المسؤولون:</h4>
            <ul>
                @foreach($users as $user)
                    <li>{{ $user->name }}</li>
                @endforeach
            </ul>
        </div>
    @endif

@elseif(isset($users) && is_object($users))
    {{-- إذا كان مستخدم واحد --}}
    <div class="user-info">
        <h4>الموظف المسؤول:</h4>
        <p>{{ $users->name }}</p>
    </div>

@else
    <p>لا يوجد موظف مسؤول</p>
@endif
                </p>
              </div>
        
       
    </div>
    <div class="footer">
        <p>© {{ date('Y') }} شركة تراست. جميع الحقوق محفوظة.</p>
    </div>
</body>
</html>