import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import React from 'react';

const ProjectDetails = ({ project, tasks, users }) => {
    return (
        <AuthenticatedLayout>
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
                <p className="text-gray-600">{project.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-3"> فريق العمل</h2>
                    <ul className="bg-white rounded shadow divide-y">
                        {users.map(user => (
                            <li key={user.id} className="p-3">
                                {user.name} ({user.email})
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">المهام</h2>
                    <ul className="bg-white rounded shadow divide-y">
                        {tasks.map(task => (
                            <li key={task.id} className={task.is_completed ? 'bg-[#dede] p-3 flex justify-between items-center':' p-3 flex justify-between items-center bg-[#FF2D20]/10' }>
                                <div>
                                    <h3 className="font-medium">{task.title}</h3>
                                    <p className="text-sm text-gray-500">{task.users && task.users.map((emp)=> <i className='mx-2'>{ emp.name}</i>)}</p>
                                    <p className="text-sm text-gray-500">{task.is_completed ? 'done' : 'not completed'}</p>
                                </div>
                                <Link
                                    href={route('task.show', task.id)}
                                    className="text-sm text-blue-500 hover:underline"
                                >
                                    عرض
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <hr className='my-4' />
            <div className="overflow-x-auto bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">عهد المشروع</h2>
                    <table className="min-w-full divide-y divide-gray-200 text-sm ">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className='text-right'>
                                <th className="px-6 py-3 ">اسم الموظف</th>
                                <th className="px-6 py-3 ">المبلغ</th>
                                <th className="px-6 py-3 ">تاريخ العهدة</th>
                                <th className="px-6 py-3 "> الحاله</th>
                                <th className="px-6 py-3 ">الغرض </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {project.advances?.map((advance) => (
                                <tr key={project.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{advance.user?.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{advance.amount}</td>
                                    <td className="px-6 py-4">{advance.given_at}</td>
                                    <td className="px-6 py-4">{advance.status}</td>
                                    <td className="px-6 py-4">{advance.note}</td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                    

                                   
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
        </AuthenticatedLayout>
    );
};

export default ProjectDetails;
