import React, { useState } from "react";
import { usePage, useForm, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AttList({ atts, visits, users, projects }) {
    const [filters, setFilters] = useState({
        user_id: "",
        from: "",
        to: "",
    });
    const [manuals, SetManulas] = useState({
        user_id: "",
        project: "",
        inOut: "",
    });

    const handleFilter = (e) => {
        e.preventDefault();

        router.get(route("attendance.filter"), filters, {
            preserveState: true,
            replace: true,
        });
    };
    const handleManual = (e, inOut) => {
        e.preventDefault();

        router.post(route("check.manual"), manuals, {
            preserveState: true,
            replace: true,
        });
    };
    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto p-6">
                <form
                    onSubmit={handleFilter}
                    className="bg-white shadow rounded p-4 mb-8 space-y-4"
                >
                    <h2 className="text-lg font-semibold text-gray-600">
                        {" "}
                        مخصص
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="from" className="mb-2">
                                {" "}
                                اختر الموظف
                            </label>
                            <select
                                className="border rounded p-2"
                                value={filters.user_id}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        user_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">اختر الموظف</option>
                                {users.map((users) => (
                                    <option key={users.id} value={users.id}>
                                        {users.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="from" className="mb-2">
                                من تاريخ
                            </label>
                            <input
                                className="border rounded p-2"
                                type="date"
                                value={filters.from}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        from: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="from" className="mb-2">
                                الى تاريخ
                            </label>
                            <input
                                className="border rounded p-2"
                                type="date"
                                value={filters.to}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        to: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        فلتر
                    </button>
                </form>
                <form
                    onSubmit={handleManual}
                    className="bg-white shadow rounded p-4 mb-8 space-y-4"
                >
                    <h2 className="text-lg font-semibold text-gray-600">
                        {" "}
                        تسجيل الحضور والانصراف يدويا
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="from" className="mb-2">
                                {" "}
                                اختر الموظف
                            </label>
                            <select
                                className="border rounded p-2"
                                value={manuals.user_id}
                                onChange={(e) =>
                                    SetManulas({
                                        ...manuals,
                                        user_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">اختر الموظف</option>
                                {users.map((users) => (
                                    <option key={users.id} value={users.id}>
                                        {users.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                       
                        <div className="flex flex-col">
                            <label htmlFor="from" className="mb-2">
                                {" "}
                                اختر المشروع
                            </label>
                            <select
                                className="border rounded p-2"
                                value={manuals.project}
                                onChange={(e) =>
                                    SetManulas({
                                        ...manuals,
                                        project: e.target.value,
                                    })
                                }
                            >
                                <option value="">اختر المشروع</option>
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="from" className="mb-2">
                                {" "}
                              النوع
                            </label>
                            <select
                                className="border rounded p-2"
                                value={manuals.inOut}
                                onChange={(e) =>
                                    SetManulas({
                                        ...manuals,
                                        inOut: e.target.value,
                                    })
                                }
                            >
                             
                             <option value="">اختر </option>
                                    <option  value='in'>
                                       حضور
                                    </option>
                                    <option  value='out'>
                                       انصراف
                                    </option>
                                
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        تسجيل
                    </button>
                </form>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {" "}
                        الزيارات
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between mb-6 mt-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {" "}
                        المشاريع
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
                                atts.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            {project.project?.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.check_in_time}
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.check_out_time}
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.user.name}
                                        </td>
                                        <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                            <Link
                                                href={route(
                                                    "project.show",
                                                    project.project.id
                                                )}
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
        </AuthenticatedLayout>
    );
}
