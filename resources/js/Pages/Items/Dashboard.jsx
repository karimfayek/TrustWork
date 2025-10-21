import React from 'react';
import { Link, usePage } from '@inertiajs/react';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Dashboard() {
  const { itemsCount, alertCount, totalQuantity, recentTransactions } = usePage().props;
console.log(recentTransactions, ' rece')
  return (
    <AuthenticatedLayout>
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-gray-600 text-sm mb-2">عدد الأصناف</h2>
          <p className="text-3xl font-bold">{itemsCount}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-gray-600 text-sm mb-2">التنبيهات</h2>
          <p className="text-3xl font-bold text-red-500">{alertCount}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-gray-600 text-sm mb-2">إجمالي الكميات</h2>
          <p className="text-3xl font-bold">{totalQuantity}</p>
        </div>
      </div>

      {/* العمليات الأخيرة */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">  العمليات</h2>
        {recentTransactions?.data?.length === 0 ? (
          <p className="text-gray-500">لا توجد عمليات حتى الآن.</p>
        ) : (
          <table className="min-w-full table-auto text-right">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">الصنف</th>
                <th className="px-4 py-2">النوع</th>
                <th className="px-4 py-2">الكمية</th>
                <th className="px-4 py-2">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions?.data?.map(trx => (
                <tr key={trx.id} className="border-t">
                  <td className="px-4 py-2">{trx.item.name}</td>
                  <td className="px-4 py-2">
                    {trx.type === 'in' && <span className="text-green-600">توريد</span>}
                    {trx.type === 'out' && <span className="text-red-600">صرف</span>}
                    {trx.type === 'return' && <span className="text-yellow-600">مرتجع</span>}
                  </td>
                  <td className="px-4 py-2">{trx.quantity}</td>
                  <td className="px-4 py-2">{new Date(trx.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </AuthenticatedLayout>
  );
}
