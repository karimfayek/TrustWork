import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function CrreateTool() {


    const { data, setData, post, processing, errors } = useForm({
        name: '',
        estimated_value: '',
        description: '',
        qty: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.tool.store'));
    };


    return (
        <>
            <Head title="انشاء أداة " />

            <div className=" px-6 py-8 bg-white rounded shadow">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">انشاء أداة </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* اسم الأداة */}
                    <div>
                        <InputLabel htmlFor="name" value="اسم الأداة" />
                        <TextInput
                            id="name"
                            type="text"
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                
                   
                    <div>
                        <InputLabel htmlFor="estimated_value" value="  القيمة التقديرية" />
                        <TextInput
                            id="estimated_value"
                            type="number"
                            step="any"
                            value={data.estimated_value}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('estimated_value', e.target.value)}
                            required
                        />
                        <InputError message={errors.estimated_value} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="qty" value="   الكمية" />
                        <TextInput
                            id="qty"
                            type="number"
                            value={data.qty}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('qty', e.target.value)}
                            required
                        />
                        <InputError message={errors.qty} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="description" value="  الوصف" />
                        <TextInput
                            id="description"
                            type="text"
                            value={data.description}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                    <div>
                        <PrimaryButton className="w-full justify-center" disabled={processing}>
                            انشاء الأداة
                        </PrimaryButton>
                    </div>
                </form>

            </div>
        </>
    );
}
