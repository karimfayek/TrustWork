import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
export default function EditCustomer({customer}) {
    const { data, setData, post, processing, errors } = useForm({
        name: customer.name || '',
        description: customer.description || '',
        address:customer.address ||  '',
        info:customer.info ||  '',
        email:customer.email ||  '',
        transport_fees: customer.transport_fees || '',
        visits_nu: customer.visits_nu || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.customer.update',customer.id ));
    };

   
  


    return (
       
        <AuthenticatedLayout>
            <Head title="انشاء عميل جديد " />

            <div className=" px-6 py-8 bg-white rounded shadow">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center"> تعديل عميل </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* اسم الموظف */}
                    <div>
                        <InputLabel htmlFor="name" value="اسم العميل" />
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
                        <InputLabel htmlFor="email" value="ايميل العميل" />
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
                        <InputLabel htmlFor="address" value="  العنوان" />
                        <TextInput
                            id="address"
                            type="text"
                            value={data.address}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('address', e.target.value)}
                        />
                        <InputError message={errors.address} className="mt-2" />
                    </div>
 <div>
                        <InputLabel htmlFor="visits_nu" value="  عدد الزيارات" />
                        <TextInput
                            id="visits_nu"
                            type="text"
                            value={data.visits_nu}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('visits_nu', e.target.value)}
                        />
                        <InputError message={errors.visits_nu} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="transport_fees" value="  مصاريف الانتقالات " />
                        <TextInput
                            id="transport_fees"
                            type="number"
                            step="any"
                            value={data.transport_fees}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('transport_fees', e.target.value)}
                        />
                        <InputError message={errors.transport_fees} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="info" value="   معلومات " />
                        <TextInput
                            id="info"
                            type="text"
                            value={data.info}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('info', e.target.value)}
                        />
                        <InputError message={errors.info} className="mt-2" />
                    </div>
                  

                    
                

                   

                    {/* زر الإرسال */}
                    <div>
                        <PrimaryButton className="w-full justify-center" disabled={processing}>
                              تعديل 
                        </PrimaryButton>
                    </div>
                </form>
                
            </div>
       
        </AuthenticatedLayout>
    );
}
