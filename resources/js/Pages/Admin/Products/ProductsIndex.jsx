import React, { useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import CategorySidebar from "./CategorySidebar";
import { useRemember } from "@inertiajs/react";
export default function ProductsIndex({ products, categories }) {
    const logedinUser = usePage().props.auth.user;
    const { filters } = usePage().props;
    const [selectedProducts, setSelectedProducts] = useRemember(
        [],
        "selected-products",
    );

    const [search, setSearch] = useState(filters.search || "");
    const [stock, setStock] = useState(filters.stock ?? "");
    const [category, setCategory] = useState(filters.category ?? "");
    //const page = search !== "" ? 1 : products.current_page;
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
                    category,
                    page: 1, // 👈 دايمًا نرجع لأول صفحة
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 600);

        return () => clearTimeout(delayDebounce);
    }, [search, stock, category]);

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
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        المنتجات
                    </h1>

                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="بحث .."
                            className="px-4 py-2 border rounded w-full md:w-64"
                        />

                        <select
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="px-4 py-2 border rounded w-full md:w-40"
                        >
                            <option value="">All</option>
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

                {/* Create Quote Button */}
                {selectedProducts.length > 0 && (
                    <div className="mb-4">
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
                    </div>
                )}

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <CategorySidebar
                            categories={categories}
                            selectedCategory={category}
                            onSelect={setCategory}
                        />
                    </div>

                    {/* Table */}
                    <div className="md:col-span-3 bg-white rounded-lg shadow overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr className="text-right">
                                    <th className="px-4 py-3">
                                        <input type="checkbox" disabled />
                                    </th>
                                    <th className="px-6 py-3">التصنيف</th>
                                    <th className="px-6 py-3">Part Number</th>
                                    <th className="px-6 py-3">الوصف</th>
                                    <th className="px-6 py-3">سعر البيع</th>

                                    {["admin"].some((role) =>
                                        logedinUser?.rolesnames?.includes(role),
                                    ) && (
                                        <th className="px-6 py-3">
                                            سعر التكلفة
                                        </th>
                                    )}

                                    <th className="px-6 py-3">Data Sheet</th>
                                    <th className="px-6 py-3">المخزن</th>
                                    <th className="px-6 py-3">الكمية</th>
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
                                            {product.category?.name}
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
                                            logedinUser?.rolesnames?.includes(
                                                role,
                                            ),
                                        ) && (
                                            <td className="px-6 py-4">
                                                {product.cost_price}
                                            </td>
                                        )}

                                        <td className="px-6 py-4">
                                            <a
                                                href={product.data_sheet}
                                                target="_blank"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {product.part_number}
                                            </a>
                                        </td>

                                        <td className="px-6 py-4">
                                            {product.stock ? (
                                                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                                    نعم
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                                                    لا
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            {product.quantity}
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
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
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
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
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
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-6">
                    <Pagination links={products.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
