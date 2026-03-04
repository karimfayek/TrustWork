import UserLayout from "@/Layouts/UserLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import LoanRequestForm from "../Admin/Users/Partials/LoanRequestForm";
import SalaryCalculator from "../Admin/Users/Partials/SalaryCalculator";
import InputLabel from "@/Components/InputLabel";
import LeaveRequestForm from "../Admin/Users/Partials/LeaveRequestForm";
import Loans from "../Admin/Users/Partials/Loans";
import Leaves from "../Admin/Users/Partials/Leaves";

export default function Edit() {
    const {
        advances,
        expenses,
        totalAdvance,
        totalExpense,
        remaining,
        activeProjects,
        finalSalary,
        leaves,
        loans,
    } = usePage().props;
    const user = usePage().props.auth.user;
    console.log(user, "user");
    const [showAdvances, setShowAdvances] = useState(false);
    const [showExpenses, setShowExpenses] = useState(false);
    const [showLeaves, setShowLeaves] = useState(false);
    const [showAtt, setShowAtt] = useState(false);
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
        advance_id: "",
        file: null,
    });

    return (
        <UserLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4"> اوامر الشغل</h1>
                {user.pending_work_orders?.map((wo) => (
                    <div
                        key={wo.id}
                        className="border p-4 mb-4 cursor-pointer"
                        onClick={() =>
                            router.visit(route("employee.work-orders.index"))
                        }
                    >
                        <p>رقم الامر : {wo.id}</p>
                        <p>تاريخ الامر : {wo.assign_date}</p>
                        <p>الحالة : {wo.status}</p>
                    </div>
                ))}
            </div>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4"> معلوماتى</h1>
                <p>الاسم : {user.name}</p>
                <p>البريد : {user.email}</p>
                <p>رقم الهاتف : {user.phone}</p>
                <p>تاريخ التعيين : {user.hire_date}</p>
            </div>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                    {" "}
                    الحضور والمهام والادوات
                </h1>
                <button onClick={() => setShowAtt(!showAtt)}>
                    <p className="border p-1 border-black">
                        {" "}
                        {showAtt ? "اخفاء" : "عرض"}
                    </p>
                </button>
                <hr className="mt-6" />
                {showAtt && <SalaryCalculator user={user} forUser={true} />}
            </div>
            {user.rewards?.length > 0 && (
                <div className="md:grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-10">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h2 className="text-lg font-medium text-gray-900">
                            مكافئات
                        </h2>
                        <hr />
                        {user.rewards?.map((reward) => (
                            <>
                                <b>القيمة</b>
                                <p>
                                    {reward.amount} - {reward.reason}{" "}
                                </p>

                                <p>بتاريخ : {reward.reward_date}</p>
                                <hr className="my-2" />
                            </>
                        ))}
                    </div>
                </div>
            )}
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">العهدة المالية</h1>
                <button onClick={() => setShowAdvances(!showAdvances)}>
                    <p className="border p-1 border-black">
                        {" "}
                        {showAdvances ? "اخفاء" : "عرض"}
                    </p>
                </button>
                {showAdvances && (
                    <>
                        <div className="mb-6">
                            <p>
                                <strong>إجمالي العهدة:</strong> {totalAdvance} ج
                            </p>
                            <p>
                                <strong>إجمالي المصروفات:</strong>{" "}
                                {totalExpense} ج
                            </p>
                            <p>
                                <strong>المتبقي:</strong> {remaining} ج
                            </p>
                        </div>

                        <div className="sm:grid grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-lg font-semibold mb-2">
                                    العهد{" "}
                                </h2>
                                <ul className="bg-white p-4 rounded shadow">
                                    {advances?.map((a, index) => (
                                        <li
                                            key={index}
                                            className="border-b py-2"
                                        >
                                            <div>
                                                📅{" "}
                                                {a.given_at ||
                                                    "بانتظار الموافقه"}
                                            </div>
                                            <div>💵 {a.amount} ج</div>
                                            <div>📝 {a.note}</div>
                                            <div>
                                                📝 المشروع : {a.project?.name}
                                            </div>
                                            <div>📝 {a.status}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-2">
                                    المصروفات
                                </h2>
                                <ul className="bg-white p-4 rounded shadow">
                                    {expenses?.map((e, index) => (
                                        <li
                                            key={index}
                                            className="border-b py-2"
                                        >
                                            <div>📅 {e.spent_at}</div>
                                            <div>💸 {e.amount} ج</div>
                                            <div>📝 {e.description}</div>
                                            <div>
                                                📝 المشروع :{" "}
                                                {e.advance?.project?.name}
                                            </div>
                                            <div>
                                                اضيفت بواسطة : {e.by?.name}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* نموذج العهدة */}
                            <div className="bg-white p-4 rounded shadow">
                                <h3 className="font-semibold mb-2">
                                    طلب عهدة{" "}
                                </h3>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        postAdvance(
                                            route("employee.advance.store"),
                                            {
                                                onSuccess: () => resetAdvance(),
                                            },
                                        );
                                    }}
                                >
                                    <input
                                        type="number"
                                        placeholder="المبلغ"
                                        value={advanceData.amount}
                                        onChange={(e) =>
                                            setAdvanceData(
                                                "amount",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full border p-2 mb-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="الغرض من العهدة"
                                        value={advanceData.note}
                                        onChange={(e) =>
                                            setAdvanceData(
                                                "note",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full border p-2 mb-2"
                                        required
                                    />
                                    {advanceErrors.amount && (
                                        <div className="text-red-600">
                                            {advanceErrors.amount}
                                        </div>
                                    )}
                                    <select
                                        value={advanceData.project_id}
                                        onChange={(e) =>
                                            setAdvanceData(
                                                "project_id",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full border p-2 mb-2"
                                    >
                                        {activeProjects?.map((project) => (
                                            <option
                                                value={project.id}
                                                key={project.id}
                                            >
                                                {project.name}
                                            </option>
                                        ))}
                                        <option value="">اخرى</option>
                                    </select>
                                    <button
                                        type="submit"
                                        disabled={processingAdvance}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        طلب العهدة
                                    </button>
                                </form>
                            </div>

                            {/* نموذج المصروف */}
                            <div className="bg-white p-4 rounded shadow">
                                <h3 className="font-semibold mb-2">
                                    إضافة مصروف
                                </h3>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        postExpense(
                                            route("employee.expense.store"),
                                            {
                                                onSuccess: () => resetExpense(),
                                            },
                                        );
                                    }}
                                >
                                    <input
                                        required
                                        type="number"
                                        placeholder="المبلغ"
                                        value={expenseData.amount}
                                        onChange={(e) =>
                                            setExpenseData(
                                                "amount",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full border p-2 mb-2"
                                    />
                                    {expenseErrors.amount && (
                                        <div className="text-red-600">
                                            {expenseErrors.amount}
                                        </div>
                                    )}
                                    <input
                                        required
                                        type="text"
                                        placeholder="الوصف"
                                        value={expenseData.description}
                                        onChange={(e) =>
                                            setExpenseData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full border p-2 mb-2"
                                    />
                                    {expenseErrors.description && (
                                        <div className="text-red-600">
                                            {expenseErrors.description}
                                        </div>
                                    )}
                                    <select
                                        required
                                        value={expenseData.advance_id}
                                        onChange={(e) =>
                                            setExpenseData(
                                                "advance_id",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full border p-2 mb-2"
                                    >
                                        <option value="">من العهدة</option>
                                        {advances?.map((adv) => (
                                            <option value={adv.id} key={adv.id}>
                                                {adv.project
                                                    ? adv.project.name
                                                    : "اخرى"}{" "}
                                                - {adv.amount} جم
                                            </option>
                                        ))}
                                    </select>
                                    {expenseErrors.advance_id && (
                                        <div className="text-red-600">
                                            {expenseErrors.advance_id}
                                        </div>
                                    )}
                                    <InputLabel>ارفق الايصال</InputLabel>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setExpenseData(
                                                "file",
                                                e.target.files[0],
                                            )
                                        }
                                        className={
                                            "bg-[#FF2D20]/10 border border-black mb-2 w-full"
                                        }
                                        required
                                    />
                                    {expenseErrors.file && (
                                        <div className="text-red-600">
                                            {expenseErrors.file}
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
                        </div>
                    </>
                )}

                <hr className="py-6 my-4" />
                <h1 className="text-2xl font-bold mb-4"> السلف</h1>
                <button onClick={() => setShowExpenses(!showExpenses)}>
                    <p className="border p-1 border-black">
                        {" "}
                        {showExpenses ? "اخفاء" : "عرض"}
                    </p>
                </button>
                {showExpenses && (
                    <Loans totalExpense={totalExpense} loans={loans}>
                        <LoanRequestForm maxAmount={finalSalary * 0.25} />
                    </Loans>
                )}

                <hr className="py-6 my-4" />
                <h1 className="text-2xl font-bold mb-4"> الاجازات</h1>
                <button onClick={() => setShowLeaves(!showLeaves)}>
                    <p className="border p-1 border-black">
                        {" "}
                        {showLeaves ? "اخفاء" : "عرض"}
                    </p>
                </button>
                {showLeaves && (
                    <Leaves leaves={leaves}>
                        <LeaveRequestForm maxAmount={finalSalary * 0.25} />
                    </Leaves>
                )}
            </div>
        </UserLayout>
    );
}
