import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function Tasks({ tasks }) {
    return (
        <UserLayout>
            <Head title="قائمة المهام" />

            <div className="max-w-6xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">قائمة المهام</h1>

                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full table-auto border">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-right">
                                <th className="p-3 border-b">اسم المشروع</th>
                                <th className="p-3 border-b">عنوان المهمة</th>
                                <th className="p-3 border-b">الوصف</th>
                                <th className="p-3 border-b"> المسؤول</th>
                                <th className="p-3 border-b"> اكتمل ؟</th>
                                <th className="p-3 border-b"> عرض</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">{task.project?.name || '—'}</td>
                                    <td className="p-3 border-b font-medium">{task.title}</td>
                                    <td className="p-3 border-b text-gray-600">{task.description}</td>
                                    <td className="p-3 border-b">{task.users?.map((user) => (
                                        <b className='border p-1.5 ml-1'>{user.name}</b>
                                    ))}
                                    </td>
                                    <td className="p-3 border-b">
                                        {task.is_completed ? 'نعم' : 'لا'}
                                    </td>
                                    <td className="p-3 border-b"><Link
                                        href={route('task.show', task.id)}
                                        className="text-sm text-blue-500 hover:underline"
                                    >
                                        عرض
                                    </Link></td>
                                    
                                </tr>
                            ))}
                            {tasks.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-500">
                                        لا توجد مهام حالياً.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </UserLayout>
    );
}
