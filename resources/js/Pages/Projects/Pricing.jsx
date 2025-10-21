
import React, { use, useEffect, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

import TaskList from '../Admin/Tasks/TaskList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Pricing({ project }) {
    const logedinUser = usePage().props.auth.user;
if( logedinUser.email === "sherok@trustits.net" ){
    return null
}
    const user = usePage().props.auth.user;
    const role = user?.role;
    const [initialTasks, setTasks] = useState(
        project.tasks.map(task => ({
            id: task.id,
            title: task.title,
            up: task.unit_price || '',
            tp: task.tp || '',
            quantity: task.quantity || '',
        }))
    );
    const { data, setData, post, processing, errors } = useForm({

        tasks: initialTasks || [],
        projectId: project.id,
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('acc.pricing.set'));
    };




    const handleTaskChange = (index, field, value) => {
        const Tasks = [...data.tasks];
        Tasks[index][field] = value;
        const up = Number(Tasks[index].up);
        const qty = Number(Tasks[index].quantity);
        if (!isNaN(up) && !isNaN(qty)) {
            Tasks[index].tp = up * qty;
        }
        
        setData('tasks', Tasks);
    };
    return (
        <AuthenticatedLayout>
            <Head title="تسعير مشروع " />

            <div className="mx-auto px-6 py-8 bg-white rounded shadow">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    تسعير مشروع 
                   <br />
                   <p className='text-2xl text-gray-400'>{project.name}</p>
                    </h1>
                

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* اسم المشروع */}
                    <div>
                        <InputLabel htmlFor="name" value="اسم المشروع" />
                        <p>{project.name}</p>
                    </div>
                    <div className="p-4 mb-4 bg-gray-50 rounded border space-y-3 ">

                        {data.tasks && data.tasks.map((task, index) => (
                            <div key={task.id} className="p-4 mb-4 bg-gray-50 rounded border space-y-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <InputLabel className="mt-3" value="اسم البند" />
                                    <TextInput
                                        required
                                        type="text"
                                        value={task.title}
                                        disabled
                                        className="opacity-50 mt-1 block w-full"
                                    />
                                </div>
                                <div>
                                    <InputLabel value="سعر الوحدة " />
                                    <TextInput
                                        type="number"
                                        step="0.01"
                                        value={task.up}
                                        onWheel={(e) => e.target.blur()}
                                        onChange={(e) => handleTaskChange(index, 'up', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                </div>
                                <div>
                                    <InputLabel value="الكمية " />
                                    <TextInput
                                        type="number"
                                        value={task.quantity}

                                        className="opacity-50 mt-1 block w-full"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <InputLabel value="السعر الإجمالي" />
                                    <TextInput
                                        type="number"
                                        value={Number(task.tp)}
                                        readOnly
                                        className="mt-1 block w-full"
                                    />
                                </div>
                            </div>
                        ))}

                    </div>
                    <div>
                        <PrimaryButton className="btn btn-green btn-fixed-bottom" disabled={processing}>
                            حفظ
                        </PrimaryButton>
                    </div>

                </form>


            </div>
        </AuthenticatedLayout>
    )
}