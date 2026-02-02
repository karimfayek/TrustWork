import React, { useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function ProductCreate({ categories }) {
    const logedinUser = usePage().props.auth.user;
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        price: "",
        description: "",
        part_number: "",
        data_sheet: "",
        category_id: "",
        cost_price: "",
        stock: true,
        quantity: 0,
        currency: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        //on success reset the form
        post(route("products.store"), {
            onSuccess: () => {
                setData({
                    name: "",
                    price: "",
                    description: "",
                    part_number: "",
                    data_sheet: "",
                    category_id: "",
                    cost_price: "",
                    stock: true,
                    quantity: 0,
                    currency: "",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="انشاء منتج جديد " />

            <div className=" px-6 py-8 bg-white rounded shadow">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {" "}
                    انشاء منتج{" "}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/*  التصنيف */}
                    <div>
                        <InputLabel htmlFor="category_id" value="التصنيف" />
                        <select
                            id="category_id"
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">اختر التصنيف</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={errors.category_id}
                            className="mt-2"
                        />
                    </div>
                    {/* رقم القطع */}
                    <div>
                        <InputLabel htmlFor="part_number" value="Part Number" />
                        <TextInput
                            id="part_number"
                            type="text"
                            value={data.part_number}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("part_number", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.part_number}
                            className="mt-2"
                        />
                    </div>
                    {/* السعر */}
                    <div>
                        <InputLabel htmlFor="price" value="سعر البيع" />
                        <TextInput
                            id="price"
                            type="number"
                            value={data.price}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("price", e.target.value)}
                        />
                        <InputError message={errors.price} className="mt-2" />
                    </div>
                    {/* العملة */}
                    <div>
                        <InputLabel htmlFor="currency" value="العملة" />
                        <select
                            id="currency"
                            value={data.currency}
                            onChange={(e) =>
                                setData("currency", e.target.value)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">اختر العملة</option>
                            <option value="EGP">EGP</option>
                            <option value="USD">USD</option>
                        </select>
                        <InputError
                            message={errors.currency}
                            className="mt-2"
                        />
                    </div>
                    {/* سعر التكلفة */}
                    {["admin"].some((role) =>
                        logedinUser?.rolesnames?.includes(role),
                    ) && (
                        <div>
                            <InputLabel
                                htmlFor="cost_price"
                                value="سعر التكلفة"
                            />
                            <TextInput
                                id="cost_price"
                                type="number"
                                value={data.cost_price}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("cost_price", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.cost_price}
                                className="mt-2"
                            />
                        </div>
                    )}

                    {/* وصف المنتج */}
                    <div>
                        <InputLabel htmlFor="description" value="وصف المنتج" />
                        <TextInput
                            id="description"
                            type="text"
                            value={data.description}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    {/* رقم القطع */}
                    <div>
                        <InputLabel htmlFor="data_sheet" value="Data Sheet" />
                        <TextInput
                            id="data_sheet"
                            type="text"
                            value={data.data_sheet}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("data_sheet", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.data_sheet}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={data.stock}
                                onChange={(e) =>
                                    setData("stock", e.target.checked)
                                }
                            />
                            <span className="mr-2 text-sm text-gray-600">
                                يوجد في المخزن
                            </span>
                        </label>
                    </div>

                    <div>
                        <InputLabel htmlFor="quantity" value="الكمية" />
                        <TextInput
                            id="quantity"
                            type="number"
                            value={data.quantity}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("quantity", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.quantity}
                            className="mt-2"
                        />
                    </div>

                    {/* زر الإرسال */}
                    <div>
                        <PrimaryButton
                            className="w-full justify-center"
                            disabled={processing}
                        >
                            انشاء
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
