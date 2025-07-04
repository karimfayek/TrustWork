import UserLayout from '@/Layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
export default function Dashboard({projects}) {
   console.log(projects)
    return (
        <UserLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto p-6">
              

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm ">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className='text-right'>
                                <th className="px-6 py-3 ">اسم المشروع</th>
                                <th className="px-6 py-3 ">الوصف</th>
                                <th className="px-6 py-3 ">تاريخ البدء</th>
                                <th className="px-6 py-3 ">تاريخ الانتهاء</th>
                                <th className="px-6 py-3 ">عدد الموظفين</th>
                                <th className="px-6 py-3 "> حاله المشروع</th>
                                <th className="px-6 py-3 ">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{project.name}</td>
                                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                                    {project.description}</td>
                                    <td className="px-6 py-4">{project.start_date}</td>
                                    <td className={`px-6 py-4 ${new Date(project.end_date) < new Date() ? 'text-red-500' : ''}`}>
                                        {project.end_date}
                                        </td>
                                    <td className="px-6 py-4">{project.users.length}</td>
                                    <td className="px-6 py-4">
                                    {dayjs(project.end_date).isBefore(dayjs()) ? 
                                            <p className='text-red-500'>
                                            منتهى 
                                          </p>
                                    :
                                    <p className='text-green-500'>
                                    مفتوح 
                                  </p>
                                    }
                                        </td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                     
                                        <Link
                                           href={route('employee.project.show', project.id)}
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
    );
}
