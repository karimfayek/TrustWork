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
                                <th className="px-6 py-3 ">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{project.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{project.description}</td>
                                    <td className="px-6 py-4">{project.start_date}</td>
                                    <td className="px-6 py-4">{project.end_date}</td>
                                    <td className="px-6 py-4">{project.users.length}</td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                        {dayjs(project.end_date).isBefore(dayjs()) ? 
                                            <button disabled className="bg-gray-400 text-white px-4 py-2 rounded">
                                            انتهى المشروع
                                          </button>
                                    :

                                        <Link
                                           href={route('employee.project.show', project.id)}
                                            className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            عرض
                                        </Link>
                                    }
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
