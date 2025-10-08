import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import Pagination from '@/Components/Pagination';
export default function Tasks({ tasks , projects , filters }) {
    
    const [selectedProjectId, setSelectedProjectId] = useState('all');
    const [show, setShow] = useState(false);
const handleFIlter = (v) => {
    setSelectedProjectId(v)
    setShow(true)
}
  const [search, setSearch] = useState(tasks.search || '');
    const page = search !== '' ? 1 : projects.current_page
      useEffect(() => {
    const delayDebounce = setTimeout(() => {
        router.get(route('tasks.index'), 
            { 
                search, 
                page: page || 1 // نحافظ على الصفحة الحالية
            }, 
            {
                preserveState: true,
                replace: true,
            }
        ); 
    }, 900);

    return () => clearTimeout(delayDebounce);
}, [search]);
    return (
        <AuthenticatedLayout>
            <Head title="قائمة المهام" />

            <div className="max-w-6xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">قائمة المهام</h1>
                <div className="mb-4 print:hidden">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full md:w-auto">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث .. اسم المشروع او الكود او اسم المهمه"
                className="px-4 py-2 border rounded w-full md:w-64"
            />
           
        </div>
                </div>
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full table-auto border">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-right">
                                <th className="p-3 border-b">اسم المشروع</th>
                                <th className="p-3 border-b">عنوان المهمة</th>
                                <th className="p-3 border-b">الوصف</th>
                                <th className="p-3 border-b">الموظف المسؤول</th>
                                <th className="p-3 border-b"> عرض</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tasks.data.filter(task => selectedProjectId === 'all' || task.project.id == selectedProjectId)
                            .map((task, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <tr key={task.id} className="hover:bg-gray-50">
                                            <td className="p-3 border-b text-gray-600 max-w-[200px] truncate whitespace-nowrap overflow-hidden">{task.project?.name || '—'}</td>
                                            <td className="p-3 border-b text-gray-600 max-w-[200px] truncate whitespace-nowrap overflow-hidden">{task.title}</td>
                                            <td className="p-3 border-b text-gray-600 max-w-[200px] truncate whitespace-nowrap overflow-hidden">{task.description}</td>
                                            <td className="p-3 border-b">{task.users?.map((user) => (
                                                <b className=''>{user.name},</b>
                                            ))}
                                            </td>
                                        
                                            <td className="p-3 border-b"><Link
                                                href={route('task.show', task.id)}
                                                className="text-sm text-blue-500 hover:underline"
                                            >
                                                عرض
                                            </Link></td>
                                            
                                        </tr>
                                        </React.Fragment>
                                );
                            })}
                            {tasks.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-500">
                                        لا توجد مهام حالياً.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                    <Pagination links={tasks.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
