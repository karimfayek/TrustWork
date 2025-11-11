import React from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Create() {
const { data, setData, post, processing, errors } = useForm({
name: '',
code: '',
unit: '',
minimum_stock: ''
});

  const submit = (e) => {
    e.preventDefault();
    post(route('items.store'));
  };

  return (
    <AuthenticatedLayout>
        
    <div className="max-w-lg mx-auto p-6">
<h1 className="text-2xl font-bold mb-4">إضافة منتج جديد</h1>


<form onSubmit={submit} className="space-y-4">
<div>
<label className="block mb-1">اسم المنتج</label>
<input type="text" className="border rounded w-full px-3 py-2" value={data.name} onChange={e => setData('name', e.target.value)} />
{errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
</div>


<div>
<label className="block mb-1">كود المنتج</label>
<input type="text" className="border rounded w-full px-3 py-2" value={data.code} onChange={e => setData('code', e.target.value)} />
{errors.code && <div className="text-red-500 text-sm">{errors.code}</div>}
</div>


<div>
<label className="block mb-1">الوحدة (مثال: متر / عدد / كرتونة)</label>
<input type="text" className="border rounded w-full px-3 py-2" value={data.unit} onChange={e => setData('unit', e.target.value)} />
{errors.unit && <div className="text-red-500 text-sm">{errors.unit}</div>}
</div>


<div>
<label className="block mb-1">حد التنبيه الأدنى (اختياري)</label>
<input type="number" className="border rounded w-full px-3 py-2" value={data.minimum_stock} onChange={e => setData('minimum_stock', e.target.value)} />
{errors.minimum_stock && <div className="text-red-500 text-sm">{errors.minimum_stock}</div>}
</div>


<button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
حفظ
</button>
</form>
</div>
    
    </AuthenticatedLayout>
  );
}
