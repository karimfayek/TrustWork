// resources/js/Pages/Reports/InsuranceRefunds.jsx

import React from 'react';
import { usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';

dayjs.locale('ar');

export default function InsuranceRefunds() {
    const { reports } = usePage().props;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">تقرير استحقاق تأمين الأعمال</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow rounded">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="py-3 px-4 text-right">#</th>
                            <th className="py-3 px-4 text-right">اسم المشروع</th>
                            <th className="py-3 px-4 text-right">رقم المستخلص الختامي</th>
                            <th className="py-3 px-4 text-right">تاريخ المستخلص</th>
                            <th className="py-3 px-4 text-right">قيمة تأمين الأعمال</th>
                            <th className="py-3 px-4 text-right">تاريخ الاستحقاق</th>
                            <th className="py-3 px-4 text-right">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 text-sm divide-y divide-gray-200">
                        {reports.length > 0 ? reports.map((item, index) => {
                            const isDue = dayjs().isAfter(dayjs(item.due_date));
                            return (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{item.project_name}</td>
                                    <td className="py-3 px-4">{item.final_invoice_number}</td>
                                    <td className="py-3 px-4">{dayjs(item.final_invoice_date).format('YYYY-MM-DD')}</td>
                                    <td className="py-3 px-4">{item.insurance_value.toLocaleString()} ج.م</td>
                                    <td className="py-3 px-4">{dayjs(item.due_date).format('YYYY-MM-DD')}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded text-white text-xs font-semibold ${isDue ? 'bg-green-600' : 'bg-yellow-500'}`}>
                                            {isDue ? 'مستحق' : 'غير مستحق بعد'}
                                        </span>
                                    </td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan="7" className="py-4 px-4 text-center text-gray-500">لا توجد بيانات حالياً</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
