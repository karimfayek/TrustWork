import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ projects }) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">لوحة تحكم الأدمن</h1>
                    <Link
                        href={route('admin.projects.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow"
                    >
                        + إنشاء مشروع جديد
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className='text-right'>
                                <th className="px-6 py-3">اسم المشروع</th>
                                <th className="px-6 py-3">الوصف</th>
                                <th className="px-6 py-3">تاريخ البدء</th>
                                <th className="px-6 py-3">تاريخ الانتهاء</th>
                                <th className="px-6 py-3">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{project.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{project.description}</td>
                                    <td className="px-6 py-4">{project.start_date}</td>
                                    <td className="px-6 py-4">{project.end_date}</td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                        <Link
                                            href={route('projects.assignTasks', project.id)}
                                            className="mb-2 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            إسناد المهام
                                        </Link>
                                        <Link
                                            href={route('project.show', project.id)}
                                            className="mb-2 inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            عرض
                                        </Link>
                                        <Link
                                            href={route('admin.projects.edit', project.id)}
                                            className="mb-2 inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            تعديل
                                        </Link>
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
