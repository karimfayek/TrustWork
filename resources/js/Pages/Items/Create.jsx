import React from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Create() {
  const { errors } = usePage().props;

  const { data, setData, post } = useForm({
    name: '',
    unit: '',
    quantity: '',
    alert_quantity: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('items.store'));
  };

  return (
    <AuthenticatedLayout>
        
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">إضافة صنف جديد</h1>

      <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded shadow">

        <div>
          <label className="block mb-1">الاسم</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-1">الوحدة</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={data.unit}
            onChange={e => setData('unit', e.target.value)}
            required
          />
          {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit}</p>}
        </div>

        <div>
          <label className="block mb-1">الكمية</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded px-3 py-2"
            value={data.quantity}
            onChange={e => setData('quantity', e.target.value)}
            required
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
        </div>

        <div>
          <label className="block mb-1">حد التنبيه (اختياري)</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded px-3 py-2"
            value={data.alert_quantity}
            onChange={e => setData('alert_quantity', e.target.value)}
          />
          {errors.alert_quantity && <p className="text-red-500 text-sm mt-1">{errors.alert_quantity}</p>}
        </div>

        <div className="flex justify-between">
          <Link href={route('items.index')} className="px-4 py-2 bg-gray-300 rounded">رجوع</Link>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">حفظ</button>
        </div>
      </form>
    </div>
    
    </AuthenticatedLayout>
  );
}
