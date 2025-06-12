import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AssignTasks({ project, tasks, users }) {

    const { data, setData, post } = useForm({
        // Initialize with existing assignments (if editing)
        employee_tasks: tasks.reduce((acc, task) => {
            // If task has assigned users, take the first one (since radio allows only one)
            acc[task.id] = task.users.length > 0 ? task.users[0].id : null;
            return acc;
        }, {}),
    });

    const handleTaskAssign = (taskId, userId) => {
        setData('employee_tasks', {
            ...data.employee_tasks,
            [taskId]: userId, // Only store the selected user for this task
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('projects.saveTasks', project.id));
    };

    return (

        <AuthenticatedLayout>
            <div className='container p-6'>
                <h1 className='text-2xl font-bold mb-4'>Assign Tasks to Employees for Project: {project.name}</h1>

                <form onSubmit={handleSubmit} className=" bg-white form-control p-6">
                    <div >
                        <b>Project Tasks</b>
                        <div className='mt-3'>
                            {project.tasks?.map((task) => (
                                <div key={task.id} className='mb-8 mt-2'>
                                    <li className='border p-2 text-2xl'>{task.title}</li>
                                    <div>
                                        {users.map((user) => (
                                            <div key={user.id} className=' mt-2'>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`task_${task.id}`} // Group radio buttons by task ID
                                                        checked={data.employee_tasks[task.id] === user.id}
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
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">Save Assignments</button>
                </form>
            </div>

        </AuthenticatedLayout>
    );
}
