import React from 'react';
import { usePage, useForm, Link } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function Visits({visits}) {
    console.log('vists' , visits)
return (
      <UserLayout>

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">  الزيارات</h1>
                    <Link
                        href={route('visit.start')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow"
                    >
                       زيارة جديدة
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className='text-right'>
                                <th className="px-6 py-3 ">العميل </th>
                                <th className="px-6 py-3 ">تسجيل الحضور</th>
                                <th className="px-6 py-3 ">الانصراف</th>
                                <th className="px-6 py-3 ">ملاحظات </th>
                                <th className="px-6 py-3 ">- </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {visits.map((visit) => (
                                <tr key={visit.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{visit.customer?.name}</td>
                                    <td className="px-6 py-4">{visit.check_in}</td>
                                    <td className="px-6 py-4">{visit.check_out}</td>
                                    <td className="px-6 py-4">{visit.notes}</td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                       
                                        <Link
                                            href={route('visits.show', visit.id)}
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
        </UserLayout>
)
}