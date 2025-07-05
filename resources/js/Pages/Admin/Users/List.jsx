import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DropdownMenu from '@/Components/DropdownMenu';
import { handleDelete } from '@/Functions/HandelDelete';
import DeleteButton from '@/Components/DeleteButton';

export default function Dashboard({ users }) {
    const handleDeleteUser = (e,id) => {
        e.preventDefault();
    
        const confirmed = window.confirm("هل أنت متأكد أنك تريد حذف هذا الموظف");
    
        if (!confirmed) return; // المستخدم رفض
    
        router.post(
            route("admin.user.delete"),
            { id }
        );
    };
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">  الموظفين</h1>
                    <Link
                        href={route('admin.user.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow"
                    >
                        + إنشاء موظف جديد
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className='text-right'>
                                <th className="px-6 py-3 ">اسم الموظف</th>
                                <th className="px-6 py-3 "> رقم التليفون</th>
                                <th className="px-6 py-3 ">المرتب الاساسي</th>
                                <th className="px-6 py-3 ">المرتب المتغير</th>
                                <th className="px-6 py-3 ">المرتب النهائي</th>
                                <th className="px-6 py-3 ">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.phone}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.salary?.base_salary}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.salary?.final_salary - user.salary?.base_salary}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.salary?.final_salary}</td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                       
                                        
                                        
                                        <DropdownMenu options={[
                                            { label: ' عرض' , type:'link' , href:route('admin.user.edit', user.id) },
                                            { label: 'طباعة راتب', type:'link', href:route('admin.user.salary', user.id)},
                                            { label: ' مسح', onClick: (e) => handleDelete(e, user.id ,'admin.user.delete'), type:'button' },
                                        ]} />
                                        
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
