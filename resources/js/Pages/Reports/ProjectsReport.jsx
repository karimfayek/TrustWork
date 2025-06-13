import { Fragment } from 'react';
import { Head } from "@inertiajs/react";
import ReportLayout from "./ReportLayout";
import Projects from "./Project/Projects";
import Tasks from "./Project/Tasks";

export default function EmployeeReport({ projects }) {
console.log(projects , 'proj report')
    return (
        <ReportLayout>
        <div className="space-y-8">
            {projects.map((proj, index) => (
                <Fragment key={index}>
                    <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
                        <h2 className="text-lg font-semibold text-blue-800 border-b pb-2 mb-2">
                            🏗️ {proj.name}
                        </h2>

                        <div className="text-sm text-gray-600 space-y-1 mb-4">
                            <p>📅 <strong>تاريخ البدء:</strong> {proj.start_date}</p>
                            <p>📅 <strong>تاريخ الانتهاء:</strong> {proj.end_date}</p>
                            <p>📌 <strong>عدد البنود:</strong> {proj.tasks?.length}</p>
                        </div>

                        <h3 className="text-md font-bold mb-2 text-gray-700">📝 مهام المشروع</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-right border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr className="text-gray-700">
                                        <th className="p-2 border">اسم البند</th>
                                        <th className="p-2 border">تاريخ البدء</th>
                                        <th className="p-2 border">تاريخ الانتهاء</th>
                                        <th className="p-2 border">الكمية</th>
                                        <th className="p-2 border text-green-700">المنفذ</th>
                                        <th className="p-2 border text-red-600">المتبقي</th>
                                        <th className="p-2 border text-red-600">الحالة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {proj.tasks?.map((tsk, tIndex) => (
  <Fragment key={tsk.id || tIndex}>
    <tr
      className={`hover:border ${
        tsk.quantity - tsk.quantity_done < 1
          ? 'bg-green-100'
          : 'bg-red-100'
      }`}
    >
      <td className="p-2 border font-medium text-gray-800">
        {tsk.title}
      </td>
      <td className="p-2 border text-gray-600">{tsk.start_date}</td>
      <td className="p-2 border text-gray-600">{tsk.end_date}</td>
      <td className="p-2 border text-center text-blue-600">{tsk.quantity}</td>
      <td className="p-2 border text-center text-green-600 font-semibold">
        {tsk.unit === 'collaborative'
          ? tsk.quantity_done / tsk.progress.length
          : tsk.quantity_done}
      </td>
      <td className="p-2 border text-center text-red-500 font-semibold">
        {tsk.quantity - tsk.quantity_done < 1
          ? 0
          : tsk.quantity - tsk.quantity_done}
      </td>
      <td className= {`p-2 border text-center  font-semibold ${
                                                tsk.quantity - tsk.quantity_done < 1
                                                  ? 'text-green-500'  // ✅ مكتمل
                                                  : 'bg-red-500 text-white'    // ❌ غير مكتمل
                                              }`}>
                                                {tsk.unit === 'collaborative' ? 
                                                    tsk.quantity - tsk.quantity_done / tsk.progress.length === 0 ? 'مكتمل' : 'غير مكتمل'
                                                    :
                                                    tsk.quantity - tsk.quantity_done === 0 ? 'مكتمل' : 'غير مكتمل'
                                            }
                                                { }
                                            </td>
    </tr>

    {/* 👇 جدول progress الخاص بكل مهمة */}
    {tsk.progress?.length > 0 && (
      <tr className="bg-white border-b">
        <td colSpan="6" className="p-2">
          <div className="mt-2 bg-gray-50 p-2 rounded-lg border text-sm">
            <h3 className="font-semibold text-gray-700 mb-2">تفاصيل التقدم:</h3>
            <table className="min-w-full text-sm border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">الموظف</th>
                  <th className="p-2 border">التاريخ</th>
                  <th className="p-2 border">الكمية المنجزة</th>
                </tr>
              </thead>
              <tbody>
                {tsk.progress.map((prog, pIndex) => (
                  <tr key={pIndex} className="hover:bg-gray-50">
                    <td className="p-2 border text-gray-700">{prog.user?.name || 'غير معروف'}</td>
                    <td className="p-2 border text-gray-600">{prog.date}</td>
                    <td className="p-2 border text-center text-blue-600 font-medium">
                      {prog.quantity_done}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    )}
  </Fragment>
))}

                                </tbody>
                            </table>
                        </div>

                        {/* ✅ فريق العمل */}
                        <div className="mt-6">
                            <h3 className="text-md font-bold mb-2 text-gray-700">👷‍♂️ فريق العمل</h3>
                            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm text-gray-700">
                                {proj.users?.map((user, uIndex) => (
                                    <li
                                        key={user.id || uIndex}
                                        className="bg-gray-100 border border-gray-200 rounded px-3 py-2"
                                    >
                                        👤 {user.name}
                                    </li>
                                ))}
                                {proj.users?.length === 0 && (
                                    <li className="text-gray-400 italic">لا يوجد موظفون مسجلون</li>
                                )}
                            </ul>
                        </div>
                       

                    </div>
                </Fragment>
            ))}
        </div>
    </ReportLayout>
    )
}