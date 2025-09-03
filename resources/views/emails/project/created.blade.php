<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>مرحبا بكم في شركة تراست</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family: 'Tahoma', Arial, sans-serif;">

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- الشعار -->
        <tr>
            <td align="center" style="padding:20px 0;">
                <img src="{{ asset('/logo.jpg') }}" alt="شعار شركة تراست" style="height:60px;">
            </td>
        </tr>

        <!-- محتوى الكارت -->
        <tr>
            <td align="center" style="padding:40px 10px;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" 
                       style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 8px rgba(0,0,0,0.05);">

                    <!-- الهيدر -->
                    <tr>
                        <td style="background:#3498db; color:#fff; padding:20px; text-align:center;">
                            <h2 style="margin:0;">مرحباً بكم في شركة تراست للحلول التكنولوجية</h2>
                        </td>
                    </tr>

                    <!-- المحتوى -->
                    <tr>
                        <td style="padding:30px; color:#333;">
                            <p style="font-size:16px; line-height:1.8;">
                                يسعدنا أن نرحب بك في بداية هذا المشروع الجديد، ونتقدّم إليكم بجزيل الشكر على ثقتكم بنا.<br>
                                نحن متحمسون للعمل معك، وملتزمون بتقديم أفضل ما لدينا لتحقيق أهداف المشروع بما يلبي تطلعاتك وأكثر.
                            </p>

                            <!-- تفاصيل المشروع -->
                            <h3 style="color:#3498db; margin-top:20px;">تفاصيل المشروع:</h3>
                            <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
                                <tr style="background:#f9f9f9;">
                                    <td style="width:30%; font-weight:bold;">اسم المشروع:</td>
                                    <td>{{ $project->name }}</td>
                                </tr>
                                <tr style="background:#fff;">
                                    <td style="width:30%; font-weight:bold;">وصف المشروع:</td>
                                    <td>{{ $project->description }}</td>
                                </tr>
                                <tr style="background:#fff;">
                                    <td style="width:30%; font-weight:bold;">كود المشروع:</td>
                                    <td>{{ $project->project_code }}</td>
                                </tr>
                                <tr style="background:#f9f9f9;">
                                    <td style="font-weight:bold;">تاريخ البداية:</td>
                                    <td>{{ $project->start_date }}</td>
                                </tr>
                                <tr style="background:#fff;">
                                    <td style="font-weight:bold;">تاريخ النهاية:</td>
                                    <td>{{ $project->end_date }}</td>
                                </tr>
                            </table>

                            <!-- بنود المشروع -->
                            <h3 style="margin:20px 0 10px; color:#3498db;">بنود المشروع</h3>
                            <table style="width:100%; border-collapse:collapse; text-align:center; font-size:14px;">
                                <thead>
                                    <tr style="background:#f4f4f4; color:#333;">
                                        <th style="padding:10px; border:1px solid #ddd;">العنوان</th>
                                        <th style="padding:10px; border:1px solid #ddd;">الكمية</th>
                                        <th style="padding:10px; border:1px solid #ddd;">الوحدة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($project->tasks as $task)
                                    <tr>
                                        <td style="padding:10px; border:1px solid #ddd;">{{ $task->title }}</td>
                                        <td style="padding:10px; border:1px solid #ddd;">{{ $task->quantity }}</td>
                                        <td style="padding:10px; border:1px solid #ddd;">{{ $task->unit }}</td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>

                            <!-- ختام -->
                            <p style="margin-top:20px; font-size:15px; line-height:1.8;">
                                خلال الفترة القادمة، سنكون على تواصل مستمر لضمان سير العمل بسلاسة، وسنحرص على أن تكون جميع خطوات المشروع واضحة وشفافة لك في كل مرحلة.
                            </p>
                            <p style="margin-top:20px; font-size:15px; line-height:1.8;">
                                في حال وجود أي استفسارات أو ملاحظات، لا تتردد في التواصل معنا في أي وقت.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- الفوتر -->
        <tr>
            <td style="background:#2c3e50; color:#fff; text-align:center; padding:25px; font-size:14px; line-height:1.8;">
                <p style="margin:0; font-size:15px;">
                    هذا النظام يعمل بالذكاء الاصطناعي - لتقديم أفضل الخدمات طبقاً للمقاييس والمعايير الدولية.
                </p>
                <p style="margin:10px 0 0 0; font-size:14px;">
                    سيصل إلى سيادتكم إشعارات أوتوماتيكياً بالأعمال المنفذة والإنجاز اليومي.
                </p>
                <p style="margin:10px 0 0 0; font-size:14px;">
                    وللمزيد من المعلومات اتصل بنا على الأرقام التالية:<br>
                    📞 01011223319 - 0237724401
                </p>
                <hr style="margin:20px 0; border:none; border-top:1px solid rgba(255,255,255,0.2);" />
                <p style="margin:0; font-size:13px; color:#ccc;">
                    شركة تراست للحلول التكنولوجية © {{ date('Y') }} - جميع الحقوق محفوظة
                </p>
            </td>
        </tr>
    </table>

</body>
</html>
