import React, { useEffect, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import TaskList from '../Admin/Tasks/TaskList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function EditProject({ users, project, userIds }) {
   
       const user = usePage().props.auth.user;
    const userRoles = user?.rolesnames ?? [];
    const [initialTasks, setTasks] = useState(
        project.tasks.map(task => ({
            id: task.id,
            title: task.title || '',
            task_number: task.task_number || '',
            description: task.description || '',
            start_date: task.start_date || '',
            end_date: task.end_date || '',
            quantity: task.quantity || '',
            unit: task.unit || '',
            tp: task.tp || '',
            up: task.unit_price || '',
            remaining: task.remaining ?? '',
            users: task.users?.map(user => user.id) ?? [],
        }))
    );
    const { data, setData, post, processing, errors } = useForm({
        name: project?.name || '',
        description: project?.description || '',
        start_date: project?.start_date || '',
        end_date: project?.end_date || '',
        advance_payment: project?.advance_payment || 0,
        customer_name: project?.customer_name || '',
        customer_email: project?.customer_email || '',
        project_code: project?.project_code || '',
        user_ids: userIds || [],
        tasks: initialTasks || [],
        tasksnew: [],
        projectId: project.id,
        send_email: false,
    });
    const applyUserToAllTasks= (e) => {
        e.preventDefault()
        const tasksArray = Object.values(initialTasks);
       const updatedTasks=  tasksArray.map(
            (task) => ({
                ...task,
                users: [...data.user_ids]
            })
        )
        setTasks(updatedTasks)

        setData({...data , tasks:updatedTasks})
    }
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
        setData('tasksnew', [...data.tasksnew, { title: '', description: '', start_date: '', users: [...userIds], end_date: '', quantity: '', unit: '', up: '', tp: '' }]);
    };

    const handleTaskChange = (index, field, value) => {
        const Tasks = [...data.tasks];
        Tasks[index][field] = value;
        setData('tasks', Tasks);
    };
    const handleCheckboxChange = (taskIndex, userIdRaw) => {
        const userId = Number(userIdRaw); // 👈 تأكد أن القيمة رقم

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
    const handleCheckboxChangeNew = (taskIndex, userIdRaw) => {
        const userId = Number(userIdRaw); // 👈 تأكد أن القيمة رقم

        const updatedTasks = [...data.tasksnew];
        const currentUsers = updatedTasks[taskIndex].users || [];

        if (currentUsers.includes(userId)) {
            // إزالة المستخدم
            updatedTasks[taskIndex].users = currentUsers.filter(id => id !== userId);
        } else {
            // إضافة المستخدم
            updatedTasks[taskIndex].users = [...currentUsers, userId];
        }

        setData('tasksnew', updatedTasks);
    };

    const handleNewTaskChange = (index, field, value) => {
        const newTasks = [...data.tasksnew];
        newTasks[index][field] = value;
        setData('tasksnew', newTasks);
    };
   

    const handleEmployeeChange = (userIdRaw) => {
        const userId = Number(userIdRaw);
        let updated = [...data.user_ids];
    
        if (updated.includes(userId)) {
            // إزالة المستخدم
            updated = updated.filter(id => id !== userId);
        } else {
            // إضافة المستخدم
            updated.push(userId);
        }
         // ✅ تحديث النسخة المحلية
        setData('user_ids', updated);  
    };

    const handleRemoveTask = (e, indexToRemove) => {
        e.preventDefault()
        setData(prev => {
            const updatedTasks = prev.tasksnew.filter((_, index) => index !== indexToRemove);
            return { ...prev, tasksnew: updatedTasks };
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="تعديل مشروع " />

            <div className="mx-auto px-6 py-8 bg-white rounded shadow">
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
                                
                            />
                            <InputError message={errors.customer_name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="customer_email" value="ايميل العميل" />
                            <TextInput
                                id="name"
                                type="text"
                                value={data.customer_email}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('customer_email', e.target.value)}
                                
                            />
                            <InputError message={errors.customer_email} className="mt-2" />
                        </div>
                         <div className={'border p-2'}>
                            <InputLabel htmlFor="send_email" value=" ارسال اشعار" />
                            <TextInput
                                id="name"
                                type="checkbox"
                                value={data.send_email}
                                className="mt-1 block"
                                onChange={(e) => setData('send_email', e.target.value)}
                                
                            />
                            <InputError message={errors.send_email} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="project_code" value="كود المشروع " />
                            <TextInput
                                id="name"
                                type="text"
                                value={data.project_code}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('project_code', e.target.value)}
                                
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
                    {['admin' , 'acc'].some(role => userRoles?.includes(role)) &&
                    
                    <div>
                        <InputLabel htmlFor="advance_payment" value="دفعه مقدمه " />
                        <TextInput
                            id="advance_payment"
                            type="number"
                            value={data.advance_payment}
                            className="mt-1 block w-full"
                            onWheel={(e) => e.target.blur()}
                            onChange={(e) => setData('advance_payment', e.target.value)} />
                        <InputError message={errors.advance_payment} className="mt-2" />
                    </div>
                    }
                    {!userRoles.includes('tech') &&

                        <><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="start_date" value="تاريخ البداية" />
                                <TextInput
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
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('end_date', e.target.value)} />
                                <InputError message={errors.end_date} className="mt-2" />
                            </div>
                           
                        </div>
                        <div className='border p-2'>
                                    <InputLabel className='mb-2' htmlFor="user_ids"  >
                                        <p className='inline'>فريق العمل</p>
                                    <button className='inline mr-2 text-blue-500 text-sm underline' onClick={(e)=>applyUserToAllTasks(e)}>
                                        تطبيق على كل المهام
                                        </button>
                                    </InputLabel>
                                    
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
                            handleCheckboxChange={handleCheckboxChange}
                            users={users}
                            userIds = {data.user_ids}
                            userRoles={userRoles}
                        />
                        {data.tasksnew.map((task, index) => (
                            <div key={index} className="p-4 mb-4 bg-gray-50 rounded border space-y-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <InputLabel className={'mt-3'} value="اسم البند" />
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
                                        onWheel={(e) => e.target.blur()}
                                        onChange={(e) => handleNewTaskChange(index, 'quantity', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.tasks?.[index]?.quantity} className="mt-1" />
                                </div>
                                <div>
                                    <InputLabel value=" .الوحدة" />

                                    <select
                                        required
                                        value={task.unit}
                                        onChange={(e) => handleNewTaskChange(index, 'unit', e.target.value)}

                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="" disabled>choose Unit</option>

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
                               {['admin' ,'acc'].some(role => userRoles?.includes(role)) && (

<><div>
    <InputLabel value="سعر الوحدة " />
    <TextInput
        type="number"
        value={task.up}
        step="0.01"
        onWheel={(e) => e.target.blur()}
        onChange={(e) => handleNewTaskChange(index, 'up', e.target.value)}
        className="mt-1 block w-full" />
    <InputError message={errors.tasks?.[index]?.up} className="mt-1" />
</div>
    <div>
        <InputLabel value="السعر الاجمالى " />
        <TextInput
            type="number"
            value={task.up * task.quantity}
            onWheel={(e) => e.target.blur()}
            onChange={(e) => handleNewTaskChange(index, 'tp', e.target.value)}
            className="mt-1 block w-full" />
        <InputError message={errors.tasks?.[index]?.tp} className="mt-1" />
    </div>
</>)
}
                                {['admin' ,'proj'].some(role => userRoles?.includes(role)) &&
                                    <>
                                    <div>
                                        <InputLabel value="تاريخ البداية" />
                                        <TextInput
                                            
                                            type="date"
                                            value={task.start_date}
                                            min={data.start_date}
                                            max={data.end_date}
                                            onChange={(e) => handleNewTaskChange(index, 'start_date', e.target.value)}
                                            className="mt-1 block w-full" />
                                        <InputError message={errors.tasks?.[index]?.start_date} className="mt-1" />
                                    </div><div>
                                            <InputLabel value="تاريخ النهاية" />
                                            <TextInput
                                                
                                                type="date"
                                                value={task.end_date}
                                                min={data.start_date}
                                                max={data.end_date}
                                                onChange={(e) => handleNewTaskChange(index, 'end_date', e.target.value)}
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
                                                            checked={task.users?.includes(user.id)}
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
                            </div>
                        ))}
                    </div>

                    {/* زر الإرسال */}
                    <div>
                        <PrimaryButton className="btn btn-green btn-fixed-bottom" disabled={processing}>
                            تعديل المشروع
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
