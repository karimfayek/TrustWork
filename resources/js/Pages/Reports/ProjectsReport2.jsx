import { Fragment, useState } from 'react';
import ReportLayout from "./ReportLayout";

export default function EmployeeReport({ projects }) {

  const [selectedProjectId, setSelectedProjectId] = useState('all');
  return (
    <ReportLayout>
      <div className="space-y-8">
        <div className="mb-4 print:hidden">
          <label htmlFor="projectFilter" className="mr-2 font-semibold">فلترة حسب المشروع:</label>
          <select
            id="projectFilter"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="all">الكل</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
        {projects.filter(project => selectedProjectId === 'all' || project.id == selectedProjectId).map((proj, index) => (
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
                      <th className="p-2 border">رقم البند</th>
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
                          className={`hover:border ${tsk.quantity - tsk.quantity_done < 1
                              ? 'bg-green-100'
                              : 'bg-red-100'
                            }`}
                        >
                          <td className="p-2 border font-medium text-gray-800">
                            {tsk.task_number}
                          </td>
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
                          <td className={`p-2 border text-center  font-semibold ${tsk.quantity - tsk.quantity_done < 1
                              ? 'text-green-500' 
                              : 'bg-red-500 text-white'    
                            }`}>
                              
                            {tsk.unit === 'collaborative' ?
                              tsk.quantity - tsk.quantity_done / tsk.progress.length === 0 ? 'مكتمل' : tsk.quantity - tsk.quantity_done / tsk.progress.length < 1 ?  ' + مكتمل'+ tsk.quantity_done - tsk.quantity  : 'غير مكتمل'
                              :
                              tsk.quantity - tsk.quantity_done ===0  ? 'مكتمل' : tsk.quantity - tsk.quantity_done  < 1 ?  `مكتمل + ${tsk.quantity_done - tsk.quantity }` : 'غير مكتمل'
                            }
                            { }
                          </td>
                        </tr>

                        
                       
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
                 {proj.total_done  > 0 && (
                  <table className='min-w-full text-sm text-right border border-gray-300'>
                        <tr className="bg-white border-b">
                            <td colSpan="6" className="p-2">
                              <div className="mt-2 bg-gray-50 p-2 rounded-lg border text-sm">
                                <h3 className="font-semibold text-gray-700 mb-2"> اجمالى الكميات المنجزة:</h3>
                                <table className="min-w-full text-sm border border-gray-300">
                                   <thead className="bg-gray-100">
                                    <tr>
                                      <th className="p-2 border">متر</th>
                                      <th className="p-2 border">عدد</th>
                                      <th className="p-2 border"> LS</th>
                                      <th className="p-2 border"> كميات العقد</th>
                                      <th className="p-2 border"> اجمالى تم انجازة</th>
                                      {proj.total_done > proj.total_quantity &&
                                      <th className="p-2 border"> اجمالى إضافى</th>
                                      }
                                    </tr>
                                  </thead>
                                  <tbody>
                                   
                                       <tr className="hover:bg-gray-50">
                                        <td className="p-2 border text-gray-700">{proj.meter_done || '0'}</td>
                                        <td className="p-2 border text-gray-600">{proj.number_done  || '0'}</td>
                                        <td className="p-2 border text-gray-600">{proj.ls_done  || '0'}</td>
                                        <td className="p-2 border text-gray-600">{proj.total_quantity  || '0'}</td>
                                        <td className="p-2 border text-center text-blue-600 font-medium">
                                          {proj.total_done}
                                        </td>
                                        {proj.total_done > proj.total_quantity &&
                                          <td className="p-2 border text-center text-green-600 font-medium">

                                            {proj.total_done - proj.total_quantity}
                                          </td>
                                      }
                                      </tr>
                                  
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                          </table>
                          )
                        }


            </div>
          </Fragment>
        ))}
      </div>
    </ReportLayout>
  )
}