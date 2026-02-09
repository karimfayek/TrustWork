<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <title> تم الموافقة على عرض السعر </title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; background:#f9f9f9; padding:20px;">
    <div style="background:#fff; border-radius:8px; padding:20px; box-shadow:0 2px 5px rgba(0,0,0,0.1);">
        <h2 style="color:#2c3e50;">مرحباً </h2>
        <p>تم الموافقة على عرض السعر رقم {{ $quotation->quotation_number }}</p>
        <p>الشركة : {{ $quotation->company_name }}</p>
        <p>التاريخ : {{ $quotation->quotation_date }}</p>
        <p>السعر : {{ $quotation->total }}</p>
        <p>العملة : {{ $quotation->currency }}</p>
        <p>الملاحظات : {{ $quotation->notes }}</p>
        <p>المنتجات :</p>
        <ul>
            @foreach ($quotation->items as $item)
                <li>{{ $item->product->description }} - {{ $item->quantity }} {{ $item->product->part_number }}</li>
            @endforeach
        </ul>
        <p>لعرض العرض اضغط على الرابط التالي</p>
        <a href="{{ route('quotations.show', $quotation->id) }}">عرض</a>

        <p style="color:#555;">مع تحيات،<br>فريق شركة تراست</p>
    </div>
</body>

</html>