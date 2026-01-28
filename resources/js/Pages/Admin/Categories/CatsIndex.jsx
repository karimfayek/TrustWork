import React, { useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";

export default function Dashboard({ categories }) {
    const logedinUser = usePage().props.auth.user;
    const { posts, filters } = usePage().props;
    console.log(categories, "categories");

    const [search, setSearch] = useState(filters.search || "");
    const page = search !== "" ? 1 : categories.current_page;
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            router.get(
                route("categories.index"),
                {
                    search,
                    page: page || 1, // نحافظ على الصفحة الحالية
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 900);

        return () => clearTimeout(delayDebounce);
    }, [search]);
    const handleDeleteProject = (e, id) => {
        e.preventDefault();

        const confirmed = window.confirm("هل أنت متأكد ؟");

        if (!confirmed) return; // المستخدم رفض
        //edit the post under to fix the error message (category parameter is required for route categories.destroy)
        router.delete(route("categories.destroy", { id }));
    };
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        تصنيفات المنتجات
                    </h1>

                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder=" بحث ..  "
                            className="px-4 py-2 border rounded w-full md:w-64"
                        />
                        <Link
                            href={route("categories.create")}
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
                                <th className="px-6 py-3">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.data.map((category) => (
                                <tr
                                    key={category.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        {category.parent &&
                                            category.parent.name + "/"}
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                        <Link
                                            href={route(
                                                "categories.edit",
                                                category.id,
                                            )}
                                            className="mb-2 inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            تعديل
                                        </Link>

                                        {["admin"].some((role) =>
                                            logedinUser?.rolesnames?.includes(
                                                role,
                                            ),
                                        ) && (
                                            <>
                                                <button
                                                    onClick={(e) =>
                                                        handleDeleteProject(
                                                            e,
                                                            category.id,
                                                        )
                                                    }
                                                    className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                                >
                                                    مسح
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination links={categories.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
