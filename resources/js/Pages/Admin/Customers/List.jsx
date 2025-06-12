import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ customers }) {
    
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">  العملاء</h1>
                    <Link
                        href={route('admin.customer.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow"
                    >
                        + إنشاء عميل جديد
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className='text-right'>
                                <th className="px-6 py-3 ">اسم العميل</th>
                                <th className="px-6 py-3 ">العنوان</th>
                                <th className="px-6 py-3 ">الوصف</th>
                                <th className="px-6 py-3 ">معلومات </th>
                                <th className="px-6 py-3 ">- </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{customer.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{customer.address}</td>
                                    <td className="px-6 py-4">{customer.description}</td>
                                    <td className="px-6 py-4">{customer.info}</td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                       
                                        <Link
                                            href={route('admin.customer.edit', customer.id)}
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
