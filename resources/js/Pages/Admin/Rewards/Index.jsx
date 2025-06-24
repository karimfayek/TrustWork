import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function RewardIndex({ rewards, users }) {
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, reset, errors } = useForm({
        user_id: '',
        reward_date: '',
        type: '',
        reason: '',
        points: 1,
        amount: '',
    });

    const handleDelete = (e, id)=> {
       
        router.post(
            route("employee.reward.delete"),
            {
                id: id,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                   setShowForm(false)
                }
            }
        );
   }
    return (
        <AuthenticatedLayout>
            <Head title="نظام المكافآت" />
            <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md ">
                <div className='bg-white flex items-center justify-between mb-4 p-2 sticky top-0'>
                    <h1 className="text-2xl font-bold  text-center">نظام مكافآت الموظفين</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        {showForm ? 'إغلاق النموذج' : 'إضافة مكافأة'}
                    </button>
                </div>
                <hr className='mb-12' />
                {!showForm &&

                    <React.Fragment>
 {
                    (rewards.length === 0) ?
                        (
                            <p className="text-center text-gray-500">لا توجد مكافآت حتى الآن.</p>
                        ) 
                        :
                        (
                            rewards.map((user, index) => (
                                <div key={index} className="mb-8 border-b pb-4">
                                    <h2 className="text-xl font-semibold text-indigo-600">
                                        {user.user} - إجمالي النقاط: {user.total_points}
                                    </h2>

                                    <table className="w-full mt-3 text-sm border border-gray-300 rounded">
                                        <thead className="bg-gray-100 text-gray-700">
                                            <tr>
                                                <th className="p-2 border">التاريخ</th>
                                                <th className="p-2 border">النوع</th>
                                                <th className="p-2 border">السبب</th>
                                                <th className="p-2 border">النقاط</th>
                                                <th className="p-2 border">القيمة</th>
                                                <th className="p-2 border">-</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.records.map((r, i) => (
                                                <tr key={i} className="text-center hover:bg-gray-50">
                                                    <td className="p-2 border">{r.date}</td>
                                                    <td className="p-2 border">{r.type}</td>
                                                    <td className="p-2 border">{r.reason}</td>
                                                    <td className="p-2 border">{r.points}</td>
                                                    <td className="p-2 border">{r.amount}</td>
                                                    <td className="p-2 border"><button onClick={(e)=> handleDelete(e, r.id)}>حذف</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        )       
                }
                    </React.Fragment>
                }
               
            </div>
            <div className="flex justify-end mb-4">

            </div>
            {showForm && (
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        post(route('rewards.store'), {
                            onSuccess: () => {
                                reset();
                                setShowForm(false);
                            }
                        });
                    }}
                    className="mb-8 bg-gray-50 p-6 rounded-md shadow"
                >
                    <h3 className="text-lg font-bold mb-4 text-gray-700">إضافة مكافأة جديدة</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">الموظف</label>
                            <select
                                value={data.user_id}
                                onChange={e => setData('user_id', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            >
                                <option value="">اختر موظفًا</option>
                                {users.map((u, idx) => (
                                    <option key={idx} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                            {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
                        </div>

                        <div>
                            <label className="block mb-1">التاريخ</label>
                            <input
                                type="date"
                                value={data.reward_date}
                                onChange={e => setData('reward_date', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                            {errors.reward_date && <p className="text-red-500 text-sm">{errors.reward_date}</p>}
                        </div>

                        <div>
                            <label className="block mb-1">النوع</label>
                            <input
                                type="text"
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                        </div>

                        <div>
                            <label className="block mb-1">النقاط</label>
                            <input
                                type="number"
                                value={1}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                            {errors.points && <p className="text-red-500 text-sm">{errors.points}</p>}
                        </div>
                        <div>
                            <label className="block mb-1">القيمة</label>
                            <input
                                type="number"
                                value={data.amount}
                                onChange={e => setData('amount', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-1">السبب</label>
                            <textarea
                                value={data.reason}
                                onChange={e => setData('reason', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                rows="3"
                            ></textarea>
                            {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
                        </div>
                    </div>

                    <div className="mt-4 text-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            حفظ المكافأة
                        </button>
                    </div>
                </form>
            )}

        </AuthenticatedLayout>
    );
}
