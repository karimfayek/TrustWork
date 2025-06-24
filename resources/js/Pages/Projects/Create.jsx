import React, { useEffect, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CreateProject({ users }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const user = usePage().props.auth.user;
    const role = user?.role;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        customer_name: '',
        project_code: '',
        user_ids: [],
        tasks: [],
    });
    const [taskCount, setTaskCount] = useState('');
    const today = new Date().toISOString().split('T')[0]; // "2025-06-01"

    useEffect(() => {
        if (!data.start_date) {
            setData('start_date', today);
            setData('end_date', today);
        }
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.projects.store'));
    };

    const handleAddTask = () => {
        console.log(data.user_ids ,'datauserids')
        setData('tasks', [...data.tasks, { title: '', description: '', start_date: '',  users: [...selectedUsers], end_date: '', quantity: '', unit: '' }]);
        const count = parseInt(taskCount);
        setTaskCount(count + 1)
    };

    const handleGenerateTasks = () => {
        const count = parseInt(taskCount);
    if (isNaN(count) || count <= 0) {
        setData(prev => ({ ...prev, tasks: [] }));
        return;
    }

    setData(prev => {
        let currentTasks = [...prev.tasks];
        if (currentTasks.length < count) {
            const itemsToAdd = count - currentTasks.length;
            const newTasks = Array.from({ length: itemsToAdd }, () => ({
                title: '',
                description: '',
                start_date: '',
                end_date: '',
                users: [...selectedUsers], // ✅ استخدم prev هنا بدلاً من data
                quantity: '',
                unit: ''
            }));
            
            console.log(...newTasks , '...newTasks')
            currentTasks = [...currentTasks, ...newTasks];
        } else if (currentTasks.length > count) {
            currentTasks = currentTasks.slice(0, count);
        }

        return { ...prev, tasks: currentTasks };
    });
    };


    const handleTaskChange = (index, field, value) => {
        const newTasks = [...data.tasks];
        newTasks[index][field] = value;
        setData('tasks', newTasks);
    };

    const handleEmployeeChange = (userIdRaw) => {
        const userId = Number(userIdRaw);
        let updated = [...selectedUsers];
    
        if (updated.includes(userId)) {
            // إزالة المستخدم
            updated = updated.filter(id => id !== userId);
        } else {
            // إضافة المستخدم
            updated.push(userId);
        }
    
        setSelectedUsers(updated);      // ✅ تحديث النسخة المحلية
        setData('user_ids', updated);   // ✅ تحديث الفورم لإرساله عند الحفظ
    };
    const handleCheckboxChangeNew = (taskIndex, userIdRaw) => {
        const userId = Number(userIdRaw);
        const updatedTasks = [...data.tasks];
        const currentUsers = updatedTasks[taskIndex].users || [];
    
        if (currentUsers.includes(userId)) {
            // إزالة المستخدم
            updatedTasks[taskIndex].users = currentUsers.filter(id => id !== userId);
        } else {
            // إضافة المستخدم
            updatedTasks[taskIndex].users = [...currentUsers, userId];
        }
    
        setData('tasks', updatedTasks);
    };
    
    const handleRemoveTask = (e, indexToRemove) => {
        e.preventDefault()
        const count = parseInt(taskCount);
        setTaskCount(count - 1)
        setData(prev => {
            const updatedTasks = prev.tasks.filter((_, index) => index !== indexToRemove);
            return { ...prev, tasks: updatedTasks };
        });
    };
    return (
        <>
            <AuthenticatedLayout>
                <Head title="إضافة مشروع جديد" />

                <div className="mx-auto px-6 py-8 bg-white rounded shadow">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">إضافة مشروع جديد</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* اسم المشروع */}
                        <div>
                            <InputLabel htmlFor="name" value="اسم المشروع" />
                            <TextInput
                                id="name"
                                type="text"
                                value={data.name}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="customer_name" value="اسم العميل" />
                            <TextInput
                                id="name"
                                type="text"
                                value={data.customer_name}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('customer_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.customer_name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="project_code" value="كود المشروع " />
                            <TextInput
                                id="name"
                                type="text"
                                value={data.project_code}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('project_code', e.target.value)}
                                required
                            />
                            <InputError message={errors.project_code} className="mt-2" />
                        </div>
                        {/* وصف المشروع */}
                        <div>
                            <InputLabel htmlFor="description" value="وصف المشروع" />
                            <TextInput
                                id="description"
                                type="text"
                                value={data.description}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        {/* التواريخ */}
                        {role !== 'tech' &&
                            <><div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                                <div>
                                    <InputLabel htmlFor="start_date" value="تاريخ البداية" />
                                    <TextInput
                                        required
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}

                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('start_date', e.target.value)} />
                                    <InputError message={errors.start_date} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="end_date" value="تاريخ النهاية" />
                                    <TextInput
                                        required
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        min={data.start_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('end_date', e.target.value)} />
                                    <InputError message={errors.end_date} className="mt-2" />
                                </div>

                            </div>
                            <div className='border p-2'>
                                    <InputLabel className='mb-2' htmlFor="user_ids" value="فريق العمل " />
                                    {users?.map(user => (
                                           
                                           <label key={user.id} className="flex items-center">
                                               
                                               <input
                                               type="checkbox"
                                               value={user.id}
                                               checked={data.user_ids?.includes(Number(user.id))}
                                               onChange={() => handleEmployeeChange(user.id)}
                                               className="mr-2 ml-1"
                                           />
                                               {user.name}
                                           </label>
                                       ))}
                                    
                                    <InputError message={errors.user_ids} className="mt-2" />
                                </div>
                                </>
                        }
                        <div>
                            <label className="block font-semibold">عدد البنود:</label>
                            <input
                                required
                                type="number"
                                value={taskCount}
                                onWheel={(e) => e.target.blur()}
                                onBlur={(e) => handleGenerateTasks(e)}
                                onChange={(e) => setTaskCount(e.target.value)}
                                className="border p-2 rounded w-full"

                                min="1"
                            />
                        </div>
                        {/* المهام */}
                        <div>
                            <div className="flex justify-between items-center mb-2 position-sticky top-0 sticky p-3 bg-white">
                                <InputLabel value="بنود المشروع" />
                                <button
                                    type="button"
                                    onClick={handleAddTask}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    + إضافة بند
                                </button>
                            </div>

                            {data.tasks.map((task, index) => (
                                <React.Fragment key={index}>
                                <p className="font-bold">بند رقم {index + 1}</p><div key={index} className="p-4 mb-4 bg-gray-50 rounded border space-y-3 grid grid-cols-2 md:grid-cols-4 gap-4">

                                    <div>
                                        <InputLabel className={'mt-3'} value="عنوان البند" />
                                        <TextInput
                                            required
                                            type="text"
                                            value={task.title}
                                            onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
                                            className="mt-1 block w-full" />
                                        <InputError message={errors.tasks?.[index]?.title} className="mt-1" />
                                    </div>

                                    <div>
                                        <InputLabel value="وصف البند" />
                                        <TextInput
                                            type="text"
                                            value={task.description}
                                            onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                                            className="mt-1 block w-full" />
                                        <InputError message={errors.tasks?.[index]?.description} className="mt-1" />
                                    </div>

                                    <div>
                                        <InputLabel value="الكمية " />
                                        <TextInput
                                            required
                                            type="number"
                                            onWheel={(e) => e.target.blur()}
                                            value={task.quantity}
                                            onChange={(e) => handleTaskChange(index, 'quantity', e.target.value)}
                                            className="mt-1 block w-full" />
                                        <InputError message={errors.tasks?.[index]?.quantity} className="mt-1" />
                                    </div>
                                    <div>
                                        <InputLabel value=" الوحدة" />
                                        <select
                                            required
                                            value={task.unit}
                                            onChange={(e) => handleTaskChange(index, 'unit', e.target.value)}

                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value={""} disabled>choose Unit</option>

                                            <option value='meter'>
                                        meter
                                        </option>
                                        <option value='number'>
                                        number
                                        </option>
                                        <option value='ls'>
                                        LS
                                        </option>
                                        <option value='collaborative'>
                                            تعاونى
                                        </option>

                                        </select>
                                        <InputError message={errors.tasks?.[index]?.unit} className="mt-1" />
                                    </div>
                               {role !== 'tech' &&
                                    <><div>
                                                <InputLabel value="تاريخ البداية" />
                                                <TextInput
                                                    required
                                                    type="date"
                                                    value={task.start_date}
                                                    min={data.start_date}
                                                    max={data.end_date}
                                                    onChange={(e) => handleTaskChange(index, 'start_date', e.target.value)}
                                                    className="mt-1 block w-full" />
                                                <InputError message={errors.tasks?.[index]?.start_date} className="mt-1" />
                                            </div><div>
                                                    <InputLabel value="تاريخ النهاية" />
                                                    <TextInput
                                                        required
                                                        type="date"
                                                        value={task.end_date}

                                                        min={data.start_date}
                                                        max={data.end_date}
                                                        onChange={(e) => handleTaskChange(index, 'end_date', e.target.value)}
                                                        className="mt-1 block w-full" />
                                                    <InputError message={errors.tasks?.[index]?.end_date} className="mt-1" />
                                                </div>
                                                <div >
                                            <InputLabel value=" اسناد المهام" />
                                            <div className="bg-white border gap-2 grid grid-cols-2 mt-1 p-1.5">

                                            {users?.map(user => (
                                           
                                                    <label key={user.id} className="flex items-center">
                                                        
                                                        <input
                                                        type="checkbox"
                                                        value={user.id}
                                                        checked={task.users?.includes(Number(user.id))}
                                                        onChange={() => handleCheckboxChangeNew(index, user.id)}
                                                        className="mr-2 ml-1"
                                                    />
                                                        {user.name}
                                                    </label>
                                                ))}
                                            </div>

                                        </div>
                                                </>
}
                                    <button
                                        onClick={(e) => handleRemoveTask(e, index)}
                                        className="text-red-500 hover:underline text-sm"
                                    >
                                        🗑 حذف
                                    </button>
                                </div></React.Fragment>
                            ))}
                        </div>

                        {/* زر الإرسال */}
                        <div>
                            <PrimaryButton className="btn btn-green btn-fixed-bottom" disabled={processing}>
                                إضافة المشروع
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>

    );
}
