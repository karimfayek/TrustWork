import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AssignTasks({ project, tasks, users }) {

    const { data, setData, post } = useForm({
        // Initialize with existing assignments (if editing)
        employee_tasks: tasks.reduce((acc, task) => {
            acc[task.id] = task.users.map(user => user.id); // أكثر من موظف لكل مهمة
            return acc;
        }, {}),
    });

    const handleTaskAssign = (taskId, userId) => {
        const currentAssignments = data.employee_tasks[taskId] || [];

        const isAlreadyAssigned = currentAssignments.includes(userId);
        const updatedAssignments = isAlreadyAssigned
            ? currentAssignments.filter(id => id !== userId) // إزالة
            : [...currentAssignments, userId]; // إضافة

        setData('employee_tasks', {
            ...data.employee_tasks,
            [taskId]: updatedAssignments,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('projects.saveTasks', project.id));
    };

    return (

        <AuthenticatedLayout>
            <div className='container p-6'>
                <h1 className='text-2xl font-bold mb-4'>اسناد المهام للموظفين للمشروع: {project.name}</h1>

                <form onSubmit={handleSubmit} className=" bg-white form-control p-6">
                    <div >
                        <b>Project Tasks</b>
                        <div className='mt-3'>
                            {project.tasks?.map((task) => (
                                <div key={task.id} className='mb-8 mt-2'>
                                    <li className='border p-2 text-2xl'>{task.title}</li>
                                    <div>
                                        {users.map((user) => (
                                            <div key={user.id} className='mt-2'>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name={`task_${task.id}[]`}
                                                        checked={data.employee_tasks[task.id]?.includes(user.id)}
                                                        onChange={() => handleTaskAssign(task.id, user.id)}
                                                        className="mr-2 ml-2"
                                                    />
                                                    {user.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-green btn-fixed-bottom"> حفظ</button>
                </form>
            </div>

        </AuthenticatedLayout>
    );
}
