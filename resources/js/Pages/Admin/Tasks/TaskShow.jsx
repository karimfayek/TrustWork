
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import ProjectProgress from '@/Pages/User/Projects/ProjectProgress';

import { Head, Link, useForm } from '@inertiajs/react';
import TaskList from './TaskList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
const TaskShow = ({ task, assignedUsers, users }) => {
  console.log(assignedUsers , 'assignde')
    const { data, setData, post, processing, errors } = useForm({
        id: task.id,
        title: task?.title || '',
        description: task?.description || '',
        due_date: task?.due_date || '',
        user: task?.user_id || '',
       // user:  [],
        task: task, // نضيف المهمة هنا كـ object داخل data
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.projects.update'));
    };

    // دالة لتحديث المهمة الواحدة
    const handleTaskChange = (index, field, value) => {
        const updatedTask = { ...data.task, [field]: value };
        setData('task', updatedTask);
    };

    return (
        <AuthenticatedLayout>
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4"> المشروع :
            <Link  href={route('project.show', task.project.id)}>
         
            {task.project?.name}
            </Link>
           
            
            </h1>
            <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
            <p className="text-gray-600 mb-6">{task.description}</p>
            <p>{task.due_date}</p>

            <h2 className="text-lg font-semibold">الموظف المسؤول:</h2>
            {assignedUsers ? (
                <React.Fragment>
                     {assignedUsers.map(
                        (usr) => (
                            <div key={usr.id} className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded mt-2">
                            {usr.name} ({usr.email})
                        </div>
                        )
                     )}
                   
                </React.Fragment>
               
                
            ) : (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded mt-2">
                    لا يوجد موظف معين حاليًا
                </div>
            )}
            {task.is_completed ? 
            
        <p  className=" bg-green-500  px-3 py-1 rounded text-white"
        >
            مكتمله بتاريخ : 
            {task.completed_at}
            </p>
        :
        <>
        
        <form onSubmit={handleSubmit}>
                <TaskList
                tasks={data.task}
                setData={setData}
                errors={errors}
                handleTaskChange={handleTaskChange}
                users={users} />
                 <div>
                        <PrimaryButton className="w-full justify-center" disabled={processing}>
                            تعديل المهمه
                        </PrimaryButton>
                    </div>
                    </form>
                    <ProjectProgress task={task} />
        </>
             }
        </div>
        </AuthenticatedLayout>
    );
};

export default TaskShow;
