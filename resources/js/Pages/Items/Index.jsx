// resources/js/Pages/Items/Index.jsx
import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Index() {
  const { items, flash, errors } = usePage().props;

  const [selectedItem, setSelectedItem] = useState(null);
  const [actionType, setActionType] = useState(null);
  const { data, setData, post, reset } = useForm({
    item_id: '',
    type: '',
    quantity: '',
    note: '',
  });

  const openTransaction = (item, type) => {
    setSelectedItem(item);
    setActionType(type);
    setData({
      item_id: item.id,
      type: type,
      quantity: '',
      note: '',
    });
  };

  const submitTransaction = (e) => {
    e.preventDefault();

    post(route('transactions.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setSelectedItem(null);
        setActionType(null);
      }
    });
  };

  return (
    <AuthenticatedLayout>
          <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">إدارة الأصناف</h1>
        <Link href={route('items.create')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + إضافة صنف
        </Link>
      </div>

      {flash.success && <div className="mb-4 text-green-600">{flash.success}</div>}
      {errors.quantity && <div className="mb-4 text-red-600">{errors.quantity}</div>}

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-right">
            <tr>
              <th className="px-4 py-2">الاسم</th>
              <th className="px-4 py-2">الوحدة</th>
              <th className="px-4 py-2">الكمية</th>
              <th className="px-4 py-2">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.unit}</td>
                <td className={`px-4 py-2 ${item.alert_quantity && item.quantity <= item.alert_quantity ? 'text-red-600 font-bold' : ''}`}>
                  {item.quantity}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => openTransaction(item, 'out')} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">صرف</button>
                  <button onClick={() => openTransaction(item, 'in')} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">توريد</button>
                  <button onClick={() => openTransaction(item, 'return')} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">مرتجع</button>
                  <Link href={route('items.edit', item.id)} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">تعديل</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* مودال العملية */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">عملية {actionType === 'in' ? 'توريد' : actionType === 'out' ? 'صرف' : 'مرتجع'} - {selectedItem.name}</h2>
            <form onSubmit={submitTransaction}>
              <div className="mb-4">
                <label className="block mb-1">الكمية</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border rounded px-3 py-2"
                  value={data.quantity}
                  onChange={e => setData('quantity', e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">ملاحظات (اختياري)</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={data.note}
                  onChange={e => setData('note', e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => { setSelectedItem(null); setActionType(null); }} className="px-4 py-2 bg-gray-300 rounded">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">حفظ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </AuthenticatedLayout>
  
  );
}
