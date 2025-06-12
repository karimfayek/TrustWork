import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function CrreateUser() {


    const { data, setData, post, processing, errors } = useForm({
        name: '',
        final_salary: '',
        base_salary: '',
        email: '',
        password: '',
        role: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.user.store'));
    };


    return (
        <>
            <Head title="انشاء موظف " />

            <div className=" px-6 py-8 bg-white rounded shadow">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">انشاء موظف </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* اسم الموظف */}
                    <div>
                        <InputLabel htmlFor="name" value="اسم الموظف" />
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
                        <InputLabel htmlFor="email" value="  الايميل" />
                        <TextInput
                            id="email"
                            type="text"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="role" value=" role" />
                        <select
                                className="border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                            >
                             
                             <option value="">اختر </option>
                                    <option  value='employee'>
                                       موظف
                                    </option>
                                    <option  value='acc'>
                                       حسابات
                                    </option>
                                    <option  value='proj'>
                                       مدير مشروعات
                                    </option>
                                    <option  value='admin'>
                                      ادمن
                                    </option>
                                
                            </select>
                        <InputError message={errors.role} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="password" value="  الباسورد" />
                        <TextInput
                            id="password"
                            type="text"
                            value={data.password}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="base_salary" value=" الراتب الاساسى" />
                        <TextInput
                            id="base_salary"
                            type="text"
                            value={data.base_salary}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('base_salary', e.target.value)}
                        />
                        <InputError message={errors.base_salary} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="final_salary" value=" الراتب النهائى" />
                        <TextInput
                            id="final_salary"
                            type="text"
                            value={data.final_salary}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('final_salary', e.target.value)}
                        />
                        <InputError message={errors.final_salary} className="mt-2" />
                    </div>
                    <div>
                        <PrimaryButton className="w-full justify-center" disabled={processing}>
                            انشاء الموظف
                        </PrimaryButton>
                    </div>
                </form>

            </div>
        </>
    );
}
