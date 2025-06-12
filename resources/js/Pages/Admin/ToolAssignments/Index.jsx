import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
export default function ToolAssignmentsIndex() {
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
        <AuthenticatedLayout>
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-700">🛠️ إدارة عهدة الأدوات</h1>

            <form onSubmit={assignTool} className="bg-white shadow rounded p-4 mb-8 space-y-4">
                <h2 className="text-lg font-semibold text-gray-600">تسليم أداة</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                        className="border rounded p-2"
                        value={data.tool_id}
                        onChange={(e) => setData('tool_id' , e.target.value)}
                    >
                        <option value="">اختر أداة</option>
                        {tools.map(tool => (
                            <option key={tool.id} value={tool.id}>{tool.name}</option>
                        ))}
                    </select>

                    <select
                        className="border rounded p-2"
                        value={data.user_id}
                        onChange={(e) => setData('user_id' , e.target.value)}
                    >
                        <option value="">اختر موظف</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        min="1"
                        className="border rounded p-2"
                        value={data.quantity}
                        onChange={(e) => setData('quantity' , e.target.value)}
                        placeholder="الكمية"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    تسليم
                </button>
            </form>

            <h2 className="text-lg font-semibold mb-4 text-gray-600">قائمة الأدوات المسلمة</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded">
                    <thead >
                        <tr>
                            <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">الموظف</th>
                            <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">الأداة</th>
                            <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">الكمية</th>
                            <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">الحالة</th>
                            <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">الإجراءات</th>
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
                                <td className="py-2 px-4 space-x-2">
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
       </AuthenticatedLayout>
    );
}
