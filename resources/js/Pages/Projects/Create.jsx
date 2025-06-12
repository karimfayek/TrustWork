import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CreateProject({ users }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
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
        setData('tasks', [...data.tasks, { title: '', description: '', start_date: '', user: [], end_date: '', quantity: '', unit: '' }]);
        const count = parseInt(taskCount);
        setTaskCount(count +1 )
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
                // نحتاج نضيف بنود جديدة
                const itemsToAdd = count - currentTasks.length;
                const newTasks = Array.from({ length: itemsToAdd }, () => ({
                    title: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    user: [],
                    quantity: '',
                    unit: ''
                }));
                currentTasks = [...currentTasks, ...newTasks];
            } else if (currentTasks.length > count) {
                // نحتاج نقص البنود
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

    const handleEmployeeChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
        setData('user_ids', selected);
    };
    const handleEmployeeTaskChange = (e , index) => {
        const newTasks = [...data.tasks];
        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
        newTasks[index]['user'] = selected;
        setData('tasks', newTasks);
    };
    const handleRemoveTask = (e,indexToRemove) => {
        e.preventDefault()
        const count = parseInt(taskCount);
        setTaskCount(count - 1 )
        setData(prev => {
            const updatedTasks = prev.tasks.filter((_, index) => index !== indexToRemove);
            return { ...prev, tasks: updatedTasks };
        });
    };
    return (
        <>
        <AuthenticatedLayout>
            <Head title="إضافة مشروع جديد" />

            <div className="max-w-4xl mx-auto px-6 py-8 bg-white rounded shadow">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="start_date" value="تاريخ البداية" />
                            <TextInput
                            required
                                id="start_date"
                                type="date"
                                value={data.start_date}
                                
                                className="mt-1 block w-full"
                                onChange={(e) => setData('start_date', e.target.value)}
                                
                            />
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
                                onChange={(e) => setData('end_date', e.target.value)}
                                
                            />
                            <InputError message={errors.end_date} className="mt-2" />
                        </div>
                    </div>

                    {/* الموظفين */}
                    <div>
                        <InputLabel htmlFor="user_ids" value="فريق العمل " />
                        <select
                            multiple
                            required
                            value={data.user_ids}
                            onChange={handleEmployeeChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.user_ids} className="mt-2" />
                    </div>
 <div>
                <label className="block font-semibold">عدد البنود:</label>
                <input
                required
                    type="number"
                    value={taskCount}
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
                            <><p className="font-bold">بند رقم {index + 1}</p><div key={index} className="p-4 mb-4 bg-gray-50 rounded border space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>
                                    <InputLabel value="عنوان البند" />
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
                                            متر
                                        </option>
                                        <option value='number'>
                                            عدد
                                        </option>
                                        <option value='collaborative'>
                                            تعاونى
                                        </option>

                                    </select>
                                    <InputError message={errors.tasks?.[index]?.unit} className="mt-1" />
                                </div>

                                <div>
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
                                </div>
                                <div>
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
                                <div>
                                    <InputLabel htmlFor="users" value=" للموظف" />
                                    <select
                                        multiple
                                        required
                                        value={task.user}
                                        onChange={(e) => handleEmployeeTaskChange(e, index)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.user_ids} className="mt-2" />
                                </div>
                                <button
                            onClick={(e) => handleRemoveTask(e,index)}
                            className="text-red-500 hover:underline text-sm"
                        >
                            🗑 حذف
                        </button>
                            </div></>
                        ))}
                    </div>

                    {/* زر الإرسال */}
                    <div>
                        <PrimaryButton className="w-full justify-center" disabled={processing}>
                            إضافة المشروع
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            </AuthenticatedLayout>
        </>
        
    );
}
