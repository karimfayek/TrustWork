import React from 'react';
import { usePage, useForm } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import LoanRequestForm from '../Admin/Users/Partials/LoanRequestForm';
import InputLabel from '@/Components/InputLabel';

export default function AdvancePage() {
    const { advances, expenses, totalAdvance, totalExpense, remaining , activeProjects , finalSalary} = usePage().props;
   
    const {
        data: advanceData,
        setData: setAdvanceData,
        post: postAdvance,
        processing: processingAdvance,
        reset: resetAdvance,
        errors: advanceErrors,
    } = useForm({
        amount: '',
        note: '',
    });
    const {
        data: expenseData,
        setData: setExpenseData,
        post: postExpense,
        processing: processingExpense,
        reset: resetExpense,
        errors: expenseErrors,
    } = useForm({
        amount: '',
        description: '',
        advance_id: '',
        file: null,
    });

    return (
        <UserLayout>

       
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">العهدة المالية</h1>

            <div className="mb-6">
                <p><strong>إجمالي العهدة:</strong> {totalAdvance} ج</p>
                <p><strong>إجمالي المصروفات:</strong> {totalExpense} ج</p>
                <p><strong>المتبقي:</strong> {remaining} ج</p>
            </div>

            <div className="sm:grid grid-cols-3 gap-6">
                <div>
                    <h2 className="text-lg font-semibold mb-2">العهد </h2>
                    <ul className="bg-white p-4 rounded shadow">
                        {advances.map((a, index) => (
                            <li key={index} className="border-b py-2">
                                <div>📅 {a.given_at || 'بانتظار الموافقه'}</div>
                                <div>💵 {a.amount} ج</div>
                                <div>📝 {a.note}</div>
                                <div>📝 المشروع : {a.project?.name}</div>
                                <div>📝 {a.status }</div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">المصروفات</h2>
                    <ul className="bg-white p-4 rounded shadow">
                        {expenses.map((e, index) => (
                            <li key={index} className="border-b py-2">
                                <div>📅 {e.spent_at}</div>
                                <div>💸 {e.amount} ج</div>
                                <div>📝 {e.description}</div>
                                <div>📝 المشروع : {e.advance?.project?.name}</div>
                                <div>اضيفت بواسطة :  {e.by?.name}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">السلف</h2>
                    <ul className="bg-white p-4 rounded shadow">
                        {expenses.map((e, index) => (
                            <li key={index} className="border-b py-2">
                                <div>📅 {e.spent_at}</div>
                                <div>💸 {e.amount} ج</div>
                                <div>📝 {e.description}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                    {/* نموذج العهدة */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-semibold mb-2">طلب عهدة </h3>
                        <form onSubmit={e => {
                            e.preventDefault();
                            postAdvance(route('employee.advance.store'), {
                                onSuccess: () => resetAdvance(),
                            });
                        }}>
                            <input
                                type="number"
                                placeholder="المبلغ"
                                value={advanceData.amount}
                                onChange={e => setAdvanceData('amount', e.target.value)}
                                className="w-full border p-2 mb-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="الغرض من العهدة"
                                value={advanceData.note}
                                onChange={e => setAdvanceData('note', e.target.value)}
                                className="w-full border p-2 mb-2"
                                required
                            />
                            {advanceErrors.amount && <div className="text-red-600">{advanceErrors.amount}</div>}
                            <select required value={advanceData.project_id}  onChange={e => setAdvanceData('project_id', e.target.value)} className="w-full border p-2 mb-2">
                                <option value="">للمشروع</option>
                                {activeProjects.map(
                                    (project)=>(
                                        <option value={project?.id} key={project?.id} >{project?.name}</option>
                                    )
                                )}
                            </select>
                            <button type="submit" disabled={processingAdvance} className="bg-blue-500 text-white px-4 py-2 rounded">
                                طلب العهدة
                            </button>
                        </form>
                    </div>
                   
                    <LoanRequestForm  maxAmount= {finalSalary *.25}/>

                    {/* نموذج المصروف */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-semibold mb-2">إضافة مصروف</h3>
                        <form onSubmit={e => {
                            e.preventDefault();
                            postExpense(route('employee.expense.store'), {
                                onSuccess: () => resetExpense(),
                            });
                        }}>
                            <input
                            required
                                type="number"
                                placeholder="المبلغ"
                                value={expenseData.amount}
                                onChange={e => setExpenseData('amount', e.target.value)}
                                className="w-full border p-2 mb-2"
                            />
                              {expenseErrors.amount && <div className="text-red-600">{expenseErrors.amount}</div>}
                            <input
                            required
                                type="text"
                                placeholder="الوصف"
                                value={expenseData.description}
                                onChange={e => setExpenseData('description', e.target.value)}
                                className="w-full border p-2 mb-2"
                            />
                             {expenseErrors.description && <div className="text-red-600">{expenseErrors.description}</div>}
                            <select required value={expenseData.advance_id}  onChange={e => setExpenseData('advance_id', e.target.value)} className="w-full border p-2 mb-2">
                                <option value="">من العهدة</option>
                                {advances.map(
                                    (adv)=>(
                                        <option value={adv.id} key={adv.id} >{adv.project?.name} - {adv.amount} جم</option>
                                    )
                                )}
                            </select>
                            {expenseErrors.advance_id && <div className="text-red-600">{expenseErrors.advance_id}</div>}
                            <InputLabel>ارفق الايصال</InputLabel>
                            <input
                                type="file"
                                onChange={e => setExpenseData('file', e.target.files[0])}
                                className={'bg-[#FF2D20]/10 border border-black mb-2 w-full'}
                                required
                            />
                             {expenseErrors.file && <div className="text-red-600">{expenseErrors.file}</div>}
                            <button type="submit" disabled={processingExpense} className="bg-green-500 text-white px-4 py-2 rounded">
                                حفظ المصروف
                            </button>
                        </form>
                    </div>

            </div>
        </div>
        </UserLayout>
    );
}
