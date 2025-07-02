import React from 'react';
import { usePage, useForm, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminVisits({visits}) {
    console.log('vists' , visits)
    const handleDeleteVisit = (e,id) => {
        e.preventDefault();
    
        const confirmed = window.confirm("هل أنت متأكد أنك تريد الحذف  ");
    
        if (!confirmed) return; // المستخدم رفض
    
        router.post(
            route("admin.visit.delete"),
            { id },
            {
                preserveScroll: true,
            }
        );
    };
return (
      <AuthenticatedLayout>

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">  الزيارات</h1>
                   
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className='text-right'>
                                <th className="px-6 py-3 ">العميل </th>  
                                <th className="px-6 py-3 ">تسجيل الحضور</th>
                                <th className="px-6 py-3 ">الانصراف</th>
                                <th className="px-6 py-3 ">ملاحظات </th>
                                <th className="px-6 py-3 "> بواسطة</th>
                                <th className="px-6 py-3 ">- </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {visits.map((visit) => (
                                <tr key={visit.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{visit.customer?.name}</td>
                                    <td className="px-6 py-4">{visit.attendance?.check_in_time}</td>
                                    <td className="px-6 py-4">{visit.attendance?.check_out_time}</td>
                                    <td className="px-6 py-4  max-w-[200px] truncate whitespace-nowrap overflow-hidden">{visit.notes}</td>
                                    <td className="px-6 py-4">{visit.user.name}</td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                       
                                        <Link
                                            href={route('admin.visits.show', visit.id)}
                                            className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            عرض
                                        </Link>

                                        <button
                                        onClick={(e) => handleDeleteVisit (e, visit.id)}
                                          
                                            className="inline-block bg-red-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            مسح
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
)
}