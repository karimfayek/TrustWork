import React, { useState } from "react";
import {  Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AttFrom from "../Employee/Att/AttForm";
import DeleteButton from "@/Components/DeleteButton";

export default function AttList({ atts, visits, users, projects ,showManual = true , customers}) {

  

    return (
       
        <AuthenticatedLayout>

        <AttFrom projects= {projects} users={users} showManual={showManual} customers={customers}/>
            <div className="max-w-7xl mx-auto p-6">

              

                <div className="flex items-center justify-between mb-6 mt-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {" "}
                        الحضور والانصراف لكل الموظفين 
                    </h1>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3 "> الموظف</th>
                                <th className="px-6 py-3 ">المكان</th>
                                <th className="px-6 py-3 ">تسجيل الحضور</th>
                                <th className="px-6 py-3 ">الانصراف</th>
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
                                            {att.user?.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {att.project && 
                                            att.project?.name
                                            }
                                             {att.visit && 
                                            att.visit?.customer?.name
                                            }
                                             {att.type === 'internal' && 
                                            'داخل الشركة'
                                            }
                                             {att.type === 'external' && 
                                           att.customer
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {att.check_in_time}
                                            {att.in_location !== 'غير محدد' && att.in_location !== null &&
                                            <a href={'https://www.google.com/maps?q='+  att?.in_location } target="_blank" className="text-blue-600 underline">لوكيشن
                                            </a>
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {att.check_out_time}
                                            {att.out_location !== 'غير محدد' && att.out_location !== null &&
                                            <a href={'https://www.google.com/maps?q='+  att?.out_location } target="_blank" className="text-blue-600 underline">لوكيشن
                                            </a>
                                            }
                                        </td>
                                        
                                        <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                          
                                            <DeleteButton id={att.id} routeName = 'admin.att.delete' />
                                            
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
