import React, { useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { useRemember } from "@inertiajs/react";
export default function ProductsIndex({ products }) {
    const logedinUser = usePage().props.auth.user;
    const { filters } = usePage().props;
    const [selectedProducts, setSelectedProducts] = useRemember(
        [],
        "selected-products",
    );

    const [search, setSearch] = useState(filters.search || "");
    const [stock, setStock] = useState(filters.stock ?? "");
    const page = search !== "" ? 1 : products.current_page;
    const toggleProduct = (id) => {
        setSelectedProducts((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
        );
    };
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            router.get(
                route("products.index"),
                {
                    search,
                    stock,
                    page: page || 1, // نحافظ على الصفحة الحالية
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 900);

        return () => clearTimeout(delayDebounce);
    }, [search, stock]);
    const handleDeleteProject = (e, id) => {
        e.preventDefault();

        const confirmed = window.confirm("هل أنت متأكد ؟");

        if (!confirmed) return; // المستخدم رفض
        //edit the post under to fix the error message (category parameter is required for route categories.destroy)
        router.delete(route("products.destroy", { id }));
    };
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        المنتجات
                    </h1>

                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder=" بحث ..  "
                            className="px-4 py-2 border rounded w-full md:w-64"
                        />
                        <select
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="px-4 py-2 border rounded w-full md:w-40"
                        >
                            <option value="">All Stock</option>
                            <option value="1">In Stock</option>
                            <option value="0">Out of Stock</option>
                        </select>
                        <Link
                            href={route("products.create")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow text-center"
                        >
                            + إنشاء منتج جديد
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    {selectedProducts.length > 0 && (
                        <button
                            onClick={() =>
                                router.post(route("quotes.create"), {
                                    products: selectedProducts,
                                })
                            }
                            className="bg-indigo-600 text-white px-5 py-2 rounded shadow"
                        >
                            إنشاء عرض سعر ({selectedProducts.length})
                        </button>
                    )}
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-4 py-3">
                                    <input type="checkbox" disabled />
                                </th>
                                <th className="px-6 py-3">التصنيف </th>
                                <th className="px-6 py-3">Part Number</th>
                                <th className="px-6 py-3">وصف المنتج</th>
                                <th className="px-6 py-3">سعر البيع</th>
                                {["admin"].some((role) =>
                                    logedinUser?.rolesnames?.includes(role),
                                ) && <th className="px-6 py-3">سعر التكلفة</th>}
                                <th className="px-6 py-3">Data Sheet</th>
                                <th className="px-6 py-3">فى المخزن</th>
                                <th className="px-6 py-3">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.data.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(
                                                product.id,
                                            )}
                                            onChange={() =>
                                                toggleProduct(product.id)
                                            }
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.category.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.part_number}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.price}
                                    </td>
                                    {["admin"].some((role) =>
                                        logedinUser?.rolesnames?.includes(role),
                                    ) && (
                                        <td className="px-6 py-4">
                                            {product.cost_price}
                                        </td>
                                    )}
                                    <td className="px-6 py-4">
                                        <a
                                            href={product.data_sheet}
                                            className="text-blue-600 hover:text-blue-700"
                                            target="_blank"
                                        >
                                            {product.part_number}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.stock ? (
                                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                                نعم
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                                                لا
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                        {["admin"].some((role) =>
                                            logedinUser?.rolesnames?.includes(
                                                role,
                                            ),
                                        ) && (
                                            <>
                                                <Link
                                                    href={route(
                                                        "products.edit",
                                                        product.id,
                                                    )}
                                                    className="mb-2 inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                                >
                                                    تعديل
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        handleDeleteProject(
                                                            e,
                                                            product.id,
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
                    <Pagination links={products.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
