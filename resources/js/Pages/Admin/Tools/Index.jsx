import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ToolsIndex({ tools }) {
    
    return (
        <AuthenticatedLayout>
            <Head title="Tools" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">  الادوات</h1>
                    <Link
                        href={route('admin.tool.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow"
                    >
                        + إنشاء  أداة
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className='text-right'>
                                <th className="px-6 py-3 ">اسم الاداة</th>
                                <th className="px-6 py-3 "> القيمة التقديرية</th>
                                <th className="px-6 py-3 ">  الكمية  </th>
                                <th className="px-6 py-3 ">  الكمية الموجودة بالمخزن</th>
                                <th className="px-6 py-3 ">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {tools.map((tool) => (
                                <tr key={tool.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{tool.name}</td>
                                    <td className="px-6 py-4">{tool.estimated_value}</td>
                                    <td className="px-6 py-4">{tool.qty}</td>
                                    <td className="px-6 py-4">{Number(tool.qty - tool.returned)}</td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                       
                                        <Link
                                            href={route('admin.tool.edit', tool.id)}
                                            className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            عرض
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
