import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DropdownMenu from '@/Components/DropdownMenu';
import { handleDelete } from '@/Functions/HandelDelete';
import DeleteButton from '@/Components/DeleteButton';

export default function Dashboard({ users }) {
   const [selectedStatus , setSelectedStatus] = useState('active')

    const [filtered , setFiltered] = useState([...users].filter(user=> user.status ===1))
      const handleStatusSelect = (v) => {
        if(v === 'active'){
            setFiltered([...users].filter(user => user.status === 1))
    
        } else if (v === 'inactive'){
            setFiltered([...users].filter(user => user.status === 0))
        } else if (v === 'temporary'){
            setFiltered([...users].filter(user => user.temporary === 1))
        } else if(v === 'all'){
            setFiltered([...users])
        }
        setSelectedStatus(v)
      }
      console.log(filtered , 'users')
    const logedinUser = usePage().props.auth.user
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">  الموظفين</h1>
                    <select className='border w-100 border-gray-300' onChange={(e) => handleStatusSelect(e.target.value)} value={selectedStatus}>
                        <option value={"all"}>الكل</option>
                        <option value={"active"}>نشط</option>
                        <option value={"inactive"}>غير نشط</option>
                        <option value={'temporary'}>موظف مؤقت</option>
                    </select>
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
                                {['admin'].some(role => logedinUser?.rolesnames?.includes(role)) &&
                                
                                <>
                                <th className="px-6 py-3 ">المرتب الاساسي</th>
                                <th className="px-6 py-3 ">المرتب المتغير</th>
                                <th className="px-6 py-3 ">المرتب النهائي</th>
                                </>
                                }
                                <th className="px-6 py-3 ">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filtered.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.phone}</td>
                                    {['admin'].some(role => logedinUser?.rolesnames?.includes(role)) &&
                                
                                <>
                                    <td className="px-6 py-4 text-gray-600">{user.salary?.base_salary}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.salary?.final_salary - user.salary?.base_salary}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.salary?.final_salary}</td>
                                      </>
                                }
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                       
                                         {['admin'].some(role => logedinUser?.rolesnames?.includes(role)) ?
<DropdownMenu options={[
                                            { label: ' عرض' , type:'link' , href:route('admin.user.edit', user.id) },
                                           
                                            { label: 'طباعة راتب', type:'link', href:route('admin.user.salary', user.id)},
                                            
                                            { label: ' مسح', onClick: (e) => handleDelete(e, user.id ,'admin.user.delete'), type:'button' },
                                        ]} />
                                        :
                                        <DropdownMenu options={[
                                            { label: ' عرض' , type:'link' , href:route('admin.user.edit', user.id) },
                                           
                                             ]} />
                                            }
                                        
                                        
                                        
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
