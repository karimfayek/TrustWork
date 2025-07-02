import React, { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ShowVisit() {
    const { visit } = usePage().props;
   console.log(visit , 'visit')

  

    return (
        <AuthenticatedLayout>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mt-8 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">تفاصيل الزيارة</h1>

            <div className="space-y-4">
                <div>
                    <span className="font-semibold text-gray-600">اسم العميل:</span>
                    <span className="ml-2 text-gray-800">{visit.customer.name}</span>
                </div>

                <div>
                    <span className="font-semibold text-gray-600">وقت الحضور:</span>
                    <span className="ml-2 text-blue-600">
                        {visit.attendance?.check_in_time ? dayjs(visit.attendance?.check_in_time).format('YYYY-MM-DD HH:mm') : 'لم يتم بعد'}
                    </span>
                    <span className="font-semibold text-gray-600">موقع الحضور:</span>
                    <span className="ml-2 text-blue-600">
                    <a href={'https://www.google.com/maps?q='+  visit.attendance?.in_location } target="_blank" className="text-blue-600 underline">عرض
                    </a>
                    </span>
                </div>

                <div>
                    <span className="font-semibold text-gray-600">وقت الانصراف:</span><span className="ml-2 text-green-600">
                        {visit.attendance?.check_out_time ? dayjs(visit.attendance?.check_out_time).format('YYYY-MM-DD HH:mm') : 'لم يتم بعد'}
                     </span>
                     {visit.attendance?.check_out_time && 
                     <>
                        <span className="font-semibold text-gray-600">موقع الانصراف:</span><span className="ml-2 text-blue-600">
                            <a href={'https://www.google.com/maps?q=' + visit.attendance?.out_location} target="_blank" className="text-blue-600 underline">عرض
                            </a>
                        </span>
                     </>
                     }
                   
                </div>


                {visit.notes && (
                    <div>
                        <span className="font-semibold text-gray-600">ملاحظات:</span>
                        <p className="mt-1 text-gray-700">{visit.notes}</p>
                    </div>
                )}

                {visit.attendance?.check_out_time && visit.report_path && (
                    <div>
                        <span className="font-semibold text-gray-600">تقرير الزيارة:</span>
                        <div className="mt-2">
                            <a href={`/storage/${visit.report_path}`}  target="_blank">
                            <img
                                src={`/storage/${visit.report_path}`}
                                alt="تقرير الزيارة"
                                className="max-w-xs border rounded shadow"
                            />
                           
                            </a>
                        </div>
                    </div>
                )}

             
            </div>

            <div className="mt-6">
                <Link
                    href={route('admin.visits.index')}
                    className="text-sm text-blue-600 hover:underline"
                >
                    ← العودة إلى قائمة الزيارات
                </Link>
            </div>

        </div>
        </AuthenticatedLayout>
    );
}
