import React from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const TaskList = ({ tasks, setData, errors, handleTaskChange, users, handleCheckboxChange, role }) => {

    const taskList = Array.isArray(tasks) ? tasks : [tasks];

    const handleDeleteOldTask = async (e, id) => {
        e.preventDefault();
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            const response = await fetch('/admin/task/delete/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
            });

            const res = await response.json();

            if (res.success) {
                // If tasks was an array, filter out the deleted one
                const updatedTasks = taskList.filter(task => task.id !== id);
                setData('tasks', updatedTasks.length === 1 ? updatedTasks[0] : updatedTasks);
            } else {
                alert('Failed to delete task.');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Something went wrong.');
        }
    };
  
    return (
        <>
        
            {taskList && taskList.map((task, index) => (
                <div key={index} className="p-4 mb-4 bg-gray-50 rounded border space-y-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <InputLabel className={'mt-3'} value="اسم البند" />
                        <TextInput
                            required
                            type="text"
                            value={task?.title}
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
                            onWheel={(e) => e.target.blur()}
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
                            <option value="" disabled >choose Unit</option>
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
                    {(role === 'acc' || role === 'admin') &&
                        <><div>
                            <InputLabel value="سعر الوحدة " />
                            <TextInput
                                type="number"
                                step="0.01"
                                value={task.up}
                                onWheel={(e) => e.target.blur()}
                                onChange={(e) => handleTaskChange(index, 'up', e.target.value)}
                                className="mt-1 block w-full" />
                            <InputError message={errors.tasks?.[index]?.up} className="mt-1" />
                        </div>
                        <div>
                                <InputLabel value="السعر الاجمالى " />
                                <TextInput
                                    type="number"
                                    value={task.up * task.quantity}
                                    onWheel={(e) => e.target.blur()}
                                    onChange={(e) => handleTaskChange(index, 'tp', e.target.value)}
                                    className="mt-1 block w-full" />
                                <InputError message={errors.tasks?.[index]?.tp} className="mt-1" />
                            </div></>
                    }
                    {(role === 'proj' || role === 'admin') &&
                        <>
                            <div>
                                <InputLabel value="تاريخ البداية" />
                                <TextInput
                                    required
                                    type="date"
                                    value={task.start_date}
                                    onChange={(e) => handleTaskChange(index, 'start_date', e.target.value)}
                                    className="mt-1 block w-full" />
                                <InputError message={errors.tasks?.[index]?.start_date} className="mt-1" />
                            </div><div>
                                <InputLabel value="تاريخ النهاية" />
                                <TextInput
                                    required
                                    type="date"
                                    value={task.end_date}
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
                                                checked={task.users?.includes(user.id)}
                                                onChange={() => handleCheckboxChange(index, user.id)}
                                                className="mr-2 ml-1"
                                            />
                                            {user.name}
                                        </label>
                                    ))}
                                </div>

                            </div>


                          

                        </>
                    }
                   
                    <div>
                        <button onClick={(e) => handleDeleteOldTask(e, task.id)} className='active:bg-gray-900 bg-red-800 border border-transparent duration-150 ease-in-out focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-semibold hover:bg-gray-700 mt-7 py-2 rounded-md text-white text-xs tracking-widest transition w-full'>حذف</button>
                    </div>
                </div>
            ))}
        </>
    );
}
export default TaskList;
