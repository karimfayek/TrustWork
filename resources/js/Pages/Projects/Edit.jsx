import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import TaskList from '../Admin/Tasks/TaskList';

export default function EditProject({ users, project, userIds }) {
  
    const [initialTasks, setTasks] = useState(
        project.tasks.map(task => ({
            id: task.id,
            title: task.title || '',
            description: task.description || '',
            start_date: task.start_date || '',
            end_date: task.end_date || '',
            quantity: task.quantity || '',
            unit: task.unit || '',
            users: task.users || [],
        }))
    );
    const { data, setData, post, processing, errors } = useForm({
        name: project?.name || '',
        description: project?.description || '',
        start_date: project?.start_date || '',
        end_date: project?.end_date || '',
        user_ids: userIds || [],
        tasks: initialTasks || [],
        tasksnew: [],
        projectId: project.id,
    });
    const today = new Date().toISOString().split('T')[0]; // "2025-06-01"

    useEffect(() => {
        if (!data.start_date) {
            setData('start_date', today);
            setData('end_date', today);
        }
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.projects.update'));
    };
    const normalizedTasks = Array.isArray(data?.tasks)
    ? data.tasks.map(task => ({
        ...task,
        users: Array.isArray(task.users)
            ? task.users.map(user => typeof user === 'object' ? user.id : user)
            : []
    }))
    : []; 
    const handleAddTask = () => {
        setData('tasksnew', [...data.tasksnew, { title: '', description: '', start_date: '', users: [], end_date: '', quantity: '', unit: '' }]);
    };

    const handleTaskChange = (index, field, value) => {
        const Tasks = [...data.tasks];
        Tasks[index][field] = value;
        setData('tasks', Tasks);
    };
    const handleEmployeeTaskChange = (e, index) => {
        const selected = Array.from(e.target.options)
            .filter(option => option.selected)
            .map(option => Number(option.value)); 
    
        const updatedTasks = [...data.tasks];
        updatedTasks[index].users = selected;
        setData('tasks', updatedTasks);
    };
    const handleNewTaskChange = (index, field, value) => {
        const newTasks = [...data.tasksnew];
        newTasks[index][field] = value;
        setData('tasksnew', newTasks);
    };
    const handleEmployeeNewTaskChange = (e, index) => {
        const newTasks = [...data.tasksnew];
        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
        newTasks[index]['users'] = selected;
        setData('tasksnew', newTasks);
    };

    const handleEmployeeChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
        setData('user_ids', selected);
    };
  
    const handleRemoveTask = (e,indexToRemove) => {
        e.preventDefault()
        setData(prev => {
            const updatedTasks = prev.tasksnew.filter((_, index) => index !== indexToRemove);
            return { ...prev, tasksnew: updatedTasks };
        });
    };

    return (
        <>
            <Head title="تعديل مشروع " />

            <div className="max-w-4xl mx-auto px-6 py-8 bg-white rounded shadow">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">تعديل مشروع </h1>

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
                                id="end_date"
                                type="date"
                                value={data.end_date}
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

                    {/* المهام */}
                    <div className="p-4 mb-4 bg-gray-50 rounded border space-y-3 ">
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

                        <TaskList
                       tasks={normalizedTasks}
                        setData={setData}
                        errors={errors}
                        handleTaskChange={handleTaskChange}
                        handleEmployeesTaskChange = {handleEmployeeTaskChange}
                        users={users}
                    />
                        {data.tasksnew.map((task, index) => (
                            <div key={index} className="p-4 mb-4 bg-gray-50 rounded border space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="عنوان البند" />
                                <TextInput
                                    type="text"
                                    value={task.title}
                                    onChange={(e) => handleNewTaskChange(index, 'title', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.tasks?.[index]?.title} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel value="وصف البند" />
                                <TextInput
                                    type="text"
                                    value={task.description}
                                    onChange={(e) => handleNewTaskChange(index, 'description', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.tasks?.[index]?.description} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel value="الكمية " />
                                <TextInput
                                    type="number"
                                    value={task.quantity}
                                    onChange={(e) => handleNewTaskChange(index, 'quantity', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.tasks?.[index]?.quantity} className="mt-1" />
                            </div>
                            <div>
                                <InputLabel value=" الوحدة" />
                                
                                <select
required
                                    value={task.unit}
                                    onChange={(e) => handleNewTaskChange(index, 'unit', e.target.value)}

                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="" disabled>choose Unit</option>
                                    
                                    <option  value='meter'>
                                            متر
                                            </option>
                                            <option  value='number'>
                                            عدد
                                            </option>
                                            <option  value='collaborative'>
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
                                    onChange={(e) => handleNewTaskChange(index, 'start_date', e.target.value)}
                                    className="mt-1 block w-full"
                                />
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
                                    onChange={(e) => handleNewTaskChange(index, 'end_date', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.tasks?.[index]?.end_date} className="mt-1" />
                            </div>
                            <div>
                                <InputLabel htmlFor="users" value=" للموظف" />
                                <select
                                multiple
                                required
                                    value={task.user}
                                    onChange={(e) => handleEmployeeNewTaskChange(e, index)}

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
                        </div>
                        ))}
                    </div>

                    {/* زر الإرسال */}
                    <div>
                        <PrimaryButton className="w-full justify-center" disabled={processing}>
                            تعديل المشروع
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
