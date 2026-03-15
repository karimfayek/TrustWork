import React, { useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ categories }) {
    const logedinUser = usePage().props.auth.user;

    const handleDeleteCategory = (e, id) => {
        e.preventDefault();

        const confirmed = window.confirm(
            "هل أنت متأكد أنك تريد حذف هذا التصنيف",
        );

        if (!confirmed) return;

        router.post(route("expense-categories.destroy", id));
    };
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        تصنيفات المصروفات
                    </h1>

                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full md:w-auto">
                        <Link
                            href={route("expense-categories.create")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow text-center"
                        >
                            + إنشاء تصنيف جديد
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3">اسم التصنيف</th>
                                <th className="px-6 py-3">الوصف</th>
                                <th className="px-6 py-3">اجمالى المصروفات</th>
                                <th className="px-6 py-3">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories?.map((category) => (
                                <tr
                                    key={category.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                                        {category.description}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                                        {category.expenses_sum_amount}
                                    </td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                        <>
                                            <Link
                                                href={route(
                                                    "expense-categories.edit",
                                                    category.id,
                                                )}
                                                className="mb-2 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                            >
                                                تعديل
                                            </Link>
                                            <button
                                                onClick={(e) =>
                                                    handleDeleteCategory(
                                                        e,
                                                        category.id,
                                                    )
                                                }
                                                className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                            >
                                                مسح
                                            </button>
                                        </>
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
