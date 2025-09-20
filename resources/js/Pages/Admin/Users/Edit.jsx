import React, { useState, useEffect } from "react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import UserForm from "./Partials/UserForm";
import SalaryCalculator from "./Partials/SalaryCalculator";
import FinancialCustodySection from "./Partials/FinancialCustodySection";
import AdvancesList from "./Partials/AdvancesList";
import FinancialSettlement from "./Partials/FinancialSettlement";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteButton from "@/Components/DeleteButton";
import Loans from "./Partials/Loans";
import Leaves from "./Partials/Leaves";
import LoanRequestForm from "./Partials/LoanRequestForm";

export default function EditUser({ user }) {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);
    console.log(user, "user");
    const admin = usePage().props.auth.user;
    const role = admin?.role;
    const {
        acceptedAdvances,
        pendingAdvances,
        expenses,
        totalAdvance,
        totalExpense,
        remaining,
        deductions,
        roles
    } = usePage().props;
    const [attData, setAttData] = useState({});
    const [month, setMonth] = useState(null);
    const absenceScore =
        Number(attData?.absenceDays) *
        Number(Number(user.salary?.base_salary) * 0.1);
    const deserved = Number(
        Number(user.salary?.base_salary) +
        Number(attData?.taskScore) +
        Number(attData?.rewards) -
        absenceScore -
        Number(attData?.lateScore) +
        Number(attData?.transportaionFees) -
        Number(attData.lostCostThisMonth) -
        Number(attData.deductions) -
        Number(attData.remaining)
    ).toFixed(2);




    const [pendingAdvancesData, setPendingAdvances] = useState(pendingAdvances);
    const handleDeleteAdvance = (id) => {
        //e.preventDefault();
        console.log(id);

        router.post(
            route("admin.advance.delete"),
            { id },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setPendingAdvances(prev => prev.filter(a => a.id !== id));
                    setShowModal(false);
                    setPaymentMethod('');
                    setSelectedAdvanceId(null);
                }

            }
        );
    };
    const [showModal, setShowModal] = useState(false);
    const [selectedAdvanceId, setSelectedAdvanceId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleApproveClick = (id) => {
        setSelectedAdvanceId(id);
        setShowModal(true);
    };

    const confirmApproval = () => {
        const selectedAdvance = pendingAdvancesData.find(a => a.id === selectedAdvanceId);

        router.post(
            route("admin.advance.status"),
            {
                advance_id: selectedAdvanceId,
                status: 'accepted',
                amount: selectedAdvance.amount,
                note: selectedAdvance.note,
                payment_method: paymentMethod, // أرسل طريقة الدفع
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setPendingAdvances(prev => prev.filter(a => a.id !== selectedAdvanceId));
                    setShowModal(false);
                    setPaymentMethod('');
                    setSelectedAdvanceId(null);
                }
            }
        );
    };
    const updatePendingAdvance = (index, field, value) => {
        setPendingAdvances(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    }
    const handleStatusAdvance = (id, status) => {
        //e.preventDefault();

        const selectedAdvance = pendingAdvancesData.find(a => a.id === id);

        router.post(
            route("admin.advance.status"),
            {
                advance_id: id,
                status: status,
                amount: selectedAdvance.amount,
                note: selectedAdvance.note,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    // بعد نجاح الطلب، احذف السلفة من قائمة "بانتظار الموافقة"
                    setPendingAdvances(prev => prev.filter(a => a.id !== id));
                }
            }
        );
    };


    const {
        data: advanceData,
        setData: setAdvanceData,
        post: postAdvance,
        processing: processingAdvance,
        reset: resetAdvance,
        errors: advanceErrors,
    } = useForm({
        amount: "",
        note: "",
        user_id: user?.id,
        project_id: '',
        method: '',
    });
    const {
        data: expenseData,
        setData: setExpenseData,
        post: postExpense,
        processing: processingExpense,
        reset: resetExpense,
        errors: expenseErrors,
    } = useForm({
        amount: "",
        description: "",
        user_id: user?.id,
    });
    const {
        data: deductionData,
        setData: setDeductionData,
        post: postDeduction,
        processing: processingDeduction,
        reset: resetDeduction,
        errors: deductionErrors,
    } = useForm({
        amount: "",
        note: "",
        type: "",
        deducted_at:'',
        user_id: user?.id,
    });
    const [showSection, setShowSection] = useState('')
    const handleShowSection = (section) => {
        if (showSection === section) {
            setShowSection('')
        } else {
            setShowSection(section)
        }
    }
    return (
        <AuthenticatedLayout>
            <Head title="تعديل موظف " />

            <div className=" px-6 py-8 bg-white rounded shadow">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 ">
                    تعديل موظف{" "}
                    <button onClick={() => handleShowSection('userform')}>
                        <p className='border p-1 border-black text-sm'>  {showSection === 'userform' ? 'اخفاء' : 'عرض'}</p>
                    </button>
                </h1>

                {showSection === 'userform' &&

                    <UserForm user={user} allRoles={roles}  />
                }
                <hr />
                <h1 className="text-2xl font-bold text-gray-800 mb-6 ">
                    الحضور - المرتب - المهام - معلومات اخرى
                    <button onClick={() => handleShowSection('salary')}>
                        <p className='border p-1 border-black text-sm'>  {showSection === 'salary' ? 'اخفاء' : 'عرض'}</p>
                    </button>
                </h1>
                {showSection === 'salary' &&
                    <SalaryCalculator
                        user={user}
                        acceptedAdvances={acceptedAdvances}
                        totalAdvance={totalAdvance}
                        totalExpense={totalExpense}
                        remaining={remaining}
                    />
                }
                <hr />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">العهدة المالية
                    <button onClick={() => handleShowSection('advances')}>
                        <p className='border p-1 border-black text-sm'>  {showSection === 'advances' ? 'اخفاء' : 'عرض'}</p>
                    </button>
                    </h1>
                    {showSection === 'advances' &&
                    <><div className="mb-6">
                            <p>
                                <strong>إجمالي العهدة:</strong> {totalAdvance} ج
                            </p>
                            <p>
                                <strong>إجمالي المصروفات:</strong> {totalExpense} ج
                            </p>
                            <p>
                                <strong>المتبقي:</strong> {remaining} ج
                                {remaining > 0 &&

                                    <FinancialSettlement user_id={user.id} amountOrig={remaining} />}
                            </p>
                        </div><div className="md:grid grid-cols-3 gap-6" id="advances">
                                <AdvancesList
                                    advances={pendingAdvances}
                                    type="pending"
                                    onDelete={handleDeleteAdvance}
                                    onApprove={handleApproveClick}
                                    onReject={handleStatusAdvance}
                                    onUpdate={updatePendingAdvance} />
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">
                                        العهد المُستلمة
                                    </h2>

                                    <ul className="bg-white p-4 rounded shadow">
                                       {Array.isArray(acceptedAdvances) && acceptedAdvances.length > 0 && acceptedAdvances.map((a, index) => (
                                            <li key={index} className="border-b py-2">

                                                <div className="flex items-center justify-between">

                                                    <div>
                                                        <div>
                                                            📅{" "}
                                                            {a.given_at || "بانتظار الموافقة"}
                                                        </div>
                                                        <div>💵 {a.amount} ج.م</div>
                                                        <div>💸 {a.method} </div>
                                                        <div>📝 {a.note}</div>
                                                        <div>📝 {a.project?.name}</div>
                                                    </div>

                                                    <div>
                                                        <DeleteButton id={a.id} routeName='admin.advance.delete' />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold mb-2 mt-3">
                                        المصروفات
                                    </h2>
                                    <ul className="bg-white p-4 rounded shadow">
                                        {expenses.map((e, index) => (
                                            <li key={index} className="border-b py-2">
                                                <div className="flex items-center justify-between">

                                                    <div>
                                                        <div>📅 {e.spent_at}</div>
                                                        <div>💸 {e.amount} ج</div>
                                                        <div>📝 {e.description}</div>
                                                    </div>

                                                    <div>
                                                        <DeleteButton id={e.id} routeName='' />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold mb-2 mt-3">
                                        الاستقطاعات
                                    </h2>
                                    <ul className="bg-white p-4 rounded shadow">
                                        {deductions.map((d, index) => (
                                            <li key={index} className="border-b py-2">

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div>📅 {d.deducted_at}</div>
                                                        <div>💸 {d.amount} ج</div>
                                                        <div>📝 {d.note}</div>
                                                        <div>📝 {d.type ==='basic' ? 'استقطاع' : d.type === 'deduction' ? 'جزاء' : ''}</div>
                                                    </div>

                                                    <div>
                                                        <DeleteButton id={d.id} routeName='admin.deduction.delete' />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div><div className="mt-10 md:grid grid-cols-3 gap-6">
                                {/* نموذج العهدة */}
                                <div className="bg-white p-4 rounded shadow">
                                    <h3 className="font-semibold mb-2">
                                        إضافة عهدة جديدة
                                    </h3>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            console.log('postadvance');
                                            postAdvance(
                                                route("admin.advance.store"),
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => resetAdvance()
                                                }
                                            );
                                        } }
                                    >
                                        <input
                                            required
                                            type="number"
                                            onWheel={(e) => e.target.blur()}
                                            placeholder="المبلغ"
                                            value={advanceData.amount}
                                            onChange={(e) => setAdvanceData("amount", e.target.value)}
                                            className="w-full border p-2 mb-2" />
                                        {advanceErrors.amount && (
                                            <div className="text-red-600">
                                                {advanceErrors.amount}
                                            </div>
                                        )}
                                        <input
                                            required
                                            type="text"
                                            placeholder="الغرض من العهدة"
                                            value={advanceData.note}
                                            onChange={(e) => setAdvanceData("note", e.target.value)}
                                            className="w-full border p-2 mb-2" />
                                        {advanceErrors.note && (
                                            <div className="text-red-600">
                                                {advanceErrors.note}
                                            </div>
                                        )}
                                        <select required value={advanceData.project_id} onChange={e => setAdvanceData('project_id', e.target.value)} className="w-full border p-2 mb-2">
                                            <option value="">للمشروع</option>
                                            {user.active_projects.map(
                                                (project) => (
                                                    <option value={project.id} key={project.id}>{project.name}</option>
                                                )
                                            )}
                                        </select>
                                        <select
                                            required
                                            className="w-full p-2 border rounded mb-4"
                                            value={advanceData.method}
                                            onChange={(e) => setAdvanceData('method', e.target.value)}
                                        >
                                            <option value="">-- اختر طريقة --</option>
                                            <option value="cash">كاش</option>
                                            <option value="wallet">محفظة</option>
                                            <option value="insta">انستا باي</option>
                                            <option value="bank">تحويل بنكي</option>
                                        </select>
                                        <button
                                            type="submit"
                                            disabled={processingAdvance}
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            حفظ العهدة
                                        </button>
                                    </form>
                                </div>

                                {/* نموذج المصروف */}
                                <div className="bg-white p-4 rounded shadow">
                                    <h3 className="font-semibold mb-2">إضافة مصروف</h3>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            postExpense(
                                                route("employee.expense.store"),
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => resetExpense()
                                                }
                                            );
                                        } }
                                    >
                                        <input
                                            type="number"
                                            onWheel={(e) => e.target.blur()}
                                            placeholder="المبلغ"
                                            value={expenseData.amount}
                                            onChange={(e) => setExpenseData("amount", e.target.value)}
                                            className="w-full border p-2 mb-2" />
                                        {expenseErrors.note && (
                                            <div className="text-red-600">
                                                {expenseErrors.note}
                                            </div>
                                        )}
                                        <input
                                            type="text"
                                            placeholder="الوصف"
                                            value={expenseData.description}
                                            onChange={(e) => setExpenseData(
                                                "description",
                                                e.target.value
                                            )}
                                            className="w-full border p-2 mb-2" />
                                        {expenseErrors.description && (
                                            <div className="text-red-600">
                                                {expenseErrors.description}
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={processingExpense}
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            حفظ المصروف
                                        </button>
                                    </form>
                                </div>
                                <div className="bg-white p-4 rounded shadow">
                                    <h3 className="font-semibold mb-2">
                                        إضافة استقطاعات
                                    </h3>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            postDeduction(
                                                route("admin.deduction.store"),
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => resetDeduction()
                                                }
                                            );
                                        } }
                                    >
                                        <input
                                            type="number"
                                            onWheel={(e) => e.target.blur()}
                                            placeholder="المبلغ"
                                            value={deductionData.amount}
                                            onChange={(e) => setDeductionData(
                                                "amount",
                                                e.target.value
                                            )}
                                            className="w-full border p-2 mb-2" />
                                        {deductionErrors.amount && (
                                            <div className="text-red-600">
                                                {deductionErrors.amount}
                                            </div>
                                        )}
                                       
                                        <select className="w-full border p-2 mb-2"  value={deductionData.type}
                                         onChange={(e) => setDeductionData("type", e.target.value)} required
                                        >
                                            <option value="">نوع الاستقطاع</option> 
                                            <option value="basic">اساسى</option>                                            
                                            <option value="deduction">جزاء</option>
                                        </select>
                                       
                                        {deductionErrors.type && (
                                            <div className="text-red-600">
                                                {deductionErrors.type}
                                            </div>
                                        )}
                                         {deductionData.type === 'deduction' &&
                                        
                                        <input type="date" name="deducted_at"  id="deducted_at" className="w-full border mb-2"
                                        value={deductionData.deducted_at}
                                          onChange={(e) => setDeductionData("deducted_at", e.target.value)}
                                       required
                                          />
                                        }
                                        <input
                                            type="text"
                                            placeholder="الوصف"
                                            value={deductionData.note}
                                            onChange={(e) => setDeductionData("note", e.target.value)}
                                            className="w-full border p-2 mb-2" />
                                        {deductionErrors.note && (
                                            <div className="text-red-600">
                                                {deductionErrors.note}
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={processingDeduction}
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            حفظ الاستقطاع
                                        </button>
                                    </form>
                                </div>
                            </div></>
}
                </div>
                <hr />
                <h1 className="text-2xl font-bold text-gray-800 p-6 ">
                   السلف
                    <button onClick={() => handleShowSection('loans')}>
                        <p className='border p-1 border-black text-sm'>  {showSection === 'loans' ? 'اخفاء' : 'عرض'}</p>
                    </button>
                </h1>
                {showSection === 'loans' &&
                   
                <Loans totalExpense={totalExpense} loans={user.loans} role={role} />
                }
                <LoanRequestForm maxAmount ={ user.salary.final_salary * 0.25}
                 routeName={'/admin/loans/store/'+ user.id}
                 title={'اضافه سلفه'}
                 />
                <hr />
                <h1 className="text-2xl font-bold text-gray-800 p-6 ">
                   الاجازات
                    <button onClick={() => handleShowSection('leaves')}>
                        <p className='border p-1 border-black text-sm'>  {showSection === 'leaves' ? 'اخفاء' : 'عرض'}</p>
                    </button>
                </h1>
                {showSection === 'leaves' &&
                   
                   <Leaves leaves={user.leaves} role={role} />
                }
               
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">اختر طريقة تسليم العهدة</h2>
                        <select
                            className="w-full p-2 border rounded mb-4"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="">-- اختر طريقة --</option>
                            <option value="cash">كاش</option>
                            <option value="wallet">محفظة</option>
                            <option value="insta">انستا باي</option>
                            <option value="bank">تحويل بنكي</option>
                        </select>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowModal(false)} className="bg-gray-200 px-4 py-2 rounded">إلغاء</button>
                            <button
                                onClick={confirmApproval}
                                disabled={!paymentMethod}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                تأكيد الموافقة
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
