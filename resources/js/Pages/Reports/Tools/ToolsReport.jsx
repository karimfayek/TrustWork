import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ReportLayout from '../ReportLayout';
export default function ToolsReport() {
    const { tools, users, assignments } = usePage().props;
    const {data , setData,  post } = useForm({
        tool_id: '',
        user_id: '',
        quantity: '',
      });

    const [selectedTool, setSelectedTool] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [quantity, setQuantity] = useState(1);

    const assignTool = (e) => {
        e.preventDefault();
        console.log('form' , selectedTool , selectedUser)
        post(route('tools.assign'), {
            tool_id: data.tool_id,
            user_id: data.user_id,
            quantity: data.quantity,
        });
    };

    const handleMarkAsReturned = (assignmentId) => {
        post(route('tools.returned', assignmentId));
    };

    const handleMarkAsLost = (assignmentId) => {
        post(route('tools.lost', assignmentId));
    };

    return (
        <ReportLayout>
        <div className="p-6 max-w-6xl mx-auto">
          


            <h2 className="text-lg font-semibold mb-4 text-gray-600">قائمة الأدوات المسلمة</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded">
                    <thead >
                        <tr>
                            <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">الموظف</th>
                            <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">الأداة</th>
                            <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">الكمية</th>
                            <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">الحالة</th>
                            <th className="py-2 px-4 text-right text-sm font-medium text-gray-600 print:hidden">الإجراءات</th>
                            <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">تاريخ </th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map(assign => (
                            <tr key={assign.id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4">{assign.user.name}</td>
                                <td className="py-2 px-4">{assign.tool.name}</td>
                                <td className="py-2 px-4">{assign.quantity}</td>
                                <td className="py-2 px-4">
                                    {assign.status === 'assigned' && (
                                        <span className="text-yellow-600">مسلم</span>
                                    )}
                                    {assign.status === 'returned' && (
                                        <span className="text-green-600">مرتجع</span>
                                    )}
                                    {assign.status === 'lost' && (
                                        <span className="text-red-600">مفقود</span>
                                    )}
                                </td>
                                <td className="py-2 px-4 space-x-2 print:hidden">
                                    {assign.status === 'assigned' && (
                                        <>
                                            <button
                                                onClick={() => handleMarkAsReturned(assign.id)}
                                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                            >
                                                إرجاع
                                            </button>
                                            <button
                                                onClick={() => handleMarkAsLost(assign.id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                مفقود
                                            </button>
                                        </>
                                    )}
                                    {(assign.status === 'returned' || assign.status === 'lost') && (
                                        <span className="text-gray-500">لا توجد إجراءات</span>
                                    )}
                                </td>
                                <td>
                                        {assign.status === 'assigned' &&
                                            <span>{assign.assigned_at}</span>
                                        }
                                        
                                {assign.status === 'returned' &&
                                    <span>{assign.returned_at}</span>
                                }
                                {assign.status === 'lost' &&
                                    <span>{assign.lost_at}</span>
                                }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
       </ReportLayout>
    );
}
