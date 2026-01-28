import React, { useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function CatsCreate({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        parent_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        //on success reset the form
        post(route("categories.store"), {
            onSuccess: () => {
                setData({
                    name: "",
                    parent_id: "",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="انشاء تصنيف جديد " />

            <div className=" px-6 py-8 bg-white rounded shadow">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {" "}
                    انشاء تصنيف{" "}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value=" Parent Category" />
                        <select
                            id="parent_id"
                            value={data.parent_id}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("parent_id", e.target.value)
                            }
                        >
                            <option value="">Select a parent category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <InputError
                            message={errors.parent_id}
                            className="mt-2"
                        />
                    </div>
                    {/* اسم التصنيف */}
                    <div>
                        <InputLabel htmlFor="name" value="اسم التصنيف" />
                        <TextInput
                            id="name"
                            type="text"
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
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
