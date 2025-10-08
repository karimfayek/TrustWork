import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';

export default function LoanIndex({ loans, users }) {
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, reset, errors } = useForm({
        user_id: '',
        loan_date: '',
        status: '',
        reason: '',
        points: 1,
        amount: '',
    });

   const handelSpent = (e , id) => {
  router.post(route("admin.loans.spent", { id }));
   }
    return (
        <AuthenticatedLayout>
            <Head title="نظام السلف" />
            <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md ">
                <div className='bg-white flex items-center justify-between mb-4 p-2 sticky top-0'>
                    <h1 className="text-2xl font-bold  text-center">سلف  الموظفين</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        {showForm ? 'إغلاق النموذج' : 'إضافة سلفة'}
                    </button>
                </div>
                <hr className='mb-12' />
                {!showForm &&

                    <React.Fragment>
 {
                    (loans.length === 0) ?
                        (
                            <p className="text-center text-gray-500">لا توجد سلف حتى الآن.</p>
                        ) 
                        :
                        (
                            loans.map((user, index) => (
                                <div key={index} className="mb-8 border-b pb-4">
                                    <h2 className="text-xl font-semibold text-indigo-600">
                                        {user.user}
                                    </h2>

                                    <table className="w-full mt-3 text-sm border border-gray-300 rounded">
                                        <thead className="bg-gray-100 text-gray-700">
                                            <tr>
                                                <th className="p-2 border">التاريخ</th>
                                                <th className="p-2 border">السبب</th>
                                                <th className="p-2 border">القيمة</th>
                                                <th className="p-2 border">الحاله</th>
                                                <th className="p-2 border">الموافقه</th>
                                                <th className="p-2 border">-</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.records.map((r, i) => (
                                                <tr key={i} className="text-center hover:bg-gray-50">
                                                    <td className="p-2 border">{r.date}</td>
                                                    <td className="p-2 border">{r.reason}</td>
                                                    <td className="p-2 border">{r.amount}</td>
                                                    <td className="p-2 border">{r.status}</td>
                                                    <td className="p-2 border">{r.admin_status}</td>
                                                    <td className="p-2 border">
                                                        {r.status !== 'paid' &&
                                                        
                                                          <button
                                                                onClick={(e) => handelSpent(e, r.id)}
                                                                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                                            >
                                                            صرف
                                                            </button>
                                                        }
                                                        <DeleteButton id={r.id} routeName='loan.delete' />
                                                        </td>
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
                        post(route('admin.loan.store'), {
                            onSuccess: () => {
                                reset();
                                setShowForm(false);
                            }
                        });
                    }}
                    className="mb-8 bg-gray-50 p-6 rounded-md shadow"
                >
                    <h3 className="text-lg font-bold mb-4 text-gray-700">إضافة سلفة جديدة</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                value={data.loan_date}
                                onChange={e => setData('loan_date', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                            {errors.loan_date && <p className="text-red-500 text-sm">{errors.loan_date}</p>}
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
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            حفظ السلفه
                        </button>
                    </div>
                </form>
            )}

        </AuthenticatedLayout>
    );
}
