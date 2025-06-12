import React from 'react';
import { Head } from '@inertiajs/react';
import ReportLayout from './ReportLayout';

export default function EmployeeReport({ employees=[] }) {
  return (
    <ReportLayout>
      <Head title="تقرير الموظفين" />

      <h1 className="text-2xl font-bold mb-6">تقرير الموظفين</h1>

      <button
        onClick={() => window.print()}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 print:hidden"
      >
        طباعة التقرير
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">اسم الموظف</th>
              <th className="p-2 border">تاريخ بدء العمل</th>
              <th className="p-2 border">مشاريع مفتوحة</th>
              <th className="p-2 border">مشاريع منتهية</th>
              <th className="p-2 border">المهام المنفذة</th>
              <th className="p-2 border">أيام الحضور</th>
              <th className="p-2 border">بنود متبقية</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{emp.name}</td>
                  <td className="p-2 border">{emp.start_date}</td>
                  <td className="p-2 border text-center">{emp.projects_open}</td>
                  <td className="p-2 border text-center">{emp.projects_done}</td>
                  <td className="p-2 border text-center">{emp.tasks_done}</td>
                  <td className="p-2 border text-center">{emp.attendance_days}</td>
                  <td className="p-2 border text-center">{emp.remaining_items}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="7">
                  لا توجد بيانات متاحة حاليًا
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ReportLayout>
  );
}
