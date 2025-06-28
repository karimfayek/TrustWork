import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';
export default function ExtractionList({ project }) {
    
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                     المستخلصات
                     <br />
                     <p className="text-2xl text-gray-400">{project.name}</p>
                     </h1>
                   
                    <Link
                        href={route('project.extractions.new', project.id) }
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow"
                    >
                        + إنشاء مستخلص جديد
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className='text-right'>
                                <th className="px-6 py-3 "> النوع</th>
                                <th className="px-6 py-3 ">رقم</th>
                                <th className="px-6 py-3 ">التاريخ</th>
                                <th className="px-6 py-3 ">صافى المستخلص</th>
                                <th className="px-6 py-3 ">- </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {project.extractions?.map((extraction) => (
                                <tr key={extraction.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{extraction.type === 'partial' && 'جزئي'} {extraction.type === 'final' && 'ختامى'}</td>
                                    <td className="px-6 py-4">{extraction.type=== 'partial' && extraction.partial_number}</td>
                                    <td className="px-6 py-4 text-gray-600">{extraction.date}</td>
                                    <td className="px-6 py-4 text-gray-600">{extraction.net_total}</td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                       
                                        <Link
                                            href={route('extractions.preview',[ project.id,extraction.id ])}
                                            className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            عرض
                                        </Link>
                                        <DeleteButton id={extraction.id} routeName='extraction.delete' />
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
