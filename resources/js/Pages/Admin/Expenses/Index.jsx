import React, { useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";

export default function Index({ expenses, categories, sum }) {
    const logedinUser = usePage().props.auth.user;

    const { filters } = usePage().props;

    const [search, setSearch] = useState(filters.search || "");
    const page = search !== "" ? 1 : expenses.current_page;

    const handleDeleteCategory = (e, id) => {
        e.preventDefault();

        const confirmed = window.confirm(
            "هل أنت متأكد أنك تريد حذف هذا المصروف",
        );

        if (!confirmed) return;

        router.post(route("expenses.destroy", id));
    };
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            router.get(
                route("expenses.index"),
                {
                    search: search,
                    page: page || 1,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 100);

        return () => clearTimeout(delayDebounce);
    }, [search]);
    return (
        <AuthenticatedLayout>
            <Head title="Expenses" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        المصروفات
                    </h1>
                    {/* filter expenses by category*/}
                    <select
                        className="px-4 py-2 border rounded w-full md:w-64"
                        name="category"
                        id="category"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    >
                        <option value="">الكل</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <p className="text-2xl md:text-3xl font-bold text-gray-800">
                        المجموع: {sum}
                    </p>
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full md:w-auto">
                        <Link
                            href={route("expenses.create")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow text-center"
                        >
                            + إنشاء مصروف جديد
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3">التصنيف</th>
                                <th className="px-6 py-3">المبلغ</th>
                                <th className="px-6 py-3">التاريخ</th>
                                <th className="px-6 py-3">الملف</th>
                                <th className="px-6 py-3">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {expenses.data?.map((expense) => (
                                <tr
                                    key={expense.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        {expense.category?.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                                        {expense.amount}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                                        {expense.expense_date}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                                        {expense.file_path ? (
                                            <a
                                                target="_blank"
                                                href={route(
                                                    "expenses.file",
                                                    expense.id,
                                                )}
                                                className="mb-2 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                            >
                                                عرض الملف
                                            </a>
                                        ) : (
                                            "لا يوجد ملف"
                                        )}
                                    </td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                        <>
                                            <Link
                                                href={route(
                                                    "expenses.edit",
                                                    expense.id,
                                                )}
                                                className="mb-2 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                            >
                                                تعديل
                                            </Link>
                                            <button
                                                onClick={(e) =>
                                                    handleDeleteCategory(
                                                        e,
                                                        expense.id,
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
                    <Pagination links={expenses.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
