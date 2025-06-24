import React, { useState } from "react";
import {  Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AttFrom from "../Employee/Att/AttForm";

export default function AttList({ atts, visits, users, projects ,showManual = true , customers}) {
   console.log(visits, 'visits')
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
const handleDeleteAtt = (e,id) => {
    e.preventDefault();

    const confirmed = window.confirm("هل أنت متأكد أنك تريد الحذف  ");

    if (!confirmed) return; // المستخدم رفض

    router.post(
        route("admin.att.delete"),
        { id },
        {
            preserveScroll: true,
        }
    );
};
    return (
        <>
            <div className="max-w-7xl mx-auto p-6">
              <AttFrom projects= {projects} users={users} showManual={showManual} customers={customers}/>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                       
                        حضور الزيارات
                    </h1>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3 ">العميل </th>
                                <th className="px-6 py-3 ">تسجيل الحضور</th>
                                <th className="px-6 py-3 ">الانصراف</th>
                                <th className="px-6 py-3 "> الموظف</th>
                                <th className="px-6 py-3 ">- </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {visits.map((visit) => (
                                <tr key={visit.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {visit.customer?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {visit.check_in}
                                    </td>
                                    <td className="px-6 py-4">
                                        {visit.check_out}
                                    </td>
                                    <td className="px-6 py-4">
                                        {visit.user.name}
                                    </td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                        <Link
                                            href={route(
                                                "admin.visits.show",
                                                visit.id
                                            )}
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

                <div className="flex items-center justify-between mb-6 mt-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {" "}
                        حضور المشاريع
                    </h1>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3 ">المشروع </th>
                                <th className="px-6 py-3 ">تسجيل الحضور</th>
                                <th className="px-6 py-3 ">الانصراف</th>
                                <th className="px-6 py-3 "> الموظف</th>
                                <th className="px-6 py-3 ">- </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {atts &&
                                atts.map((att) => (
                                    <tr
                                        key={att.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            {att.project?.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {att.check_in_time}
                                        </td>
                                        <td className="px-6 py-4">
                                            {att.check_out_time}
                                        </td>
                                        <td className="px-6 py-4">
                                            {att.user?.name}
                                        </td>
                                        <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                            {att.project &&
                                            <><Link
                                                    href={route(
                                                        "project.show",
                                                        att.project?.id
                                                    )}
                                                    className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                                >
                                                    عرض
                                                </Link><button
                                                    onClick={(e) => handleDeleteAtt(e, att.id)}

                                                    className="inline-block bg-red-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                                >
                                                        مسح
                                                    </button></>
                                            }
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
