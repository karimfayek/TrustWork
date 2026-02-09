import DeleteButton from "@/Components/DeleteButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AdvancesList from "../../Admin/Users/Partials/AdvancesList";
import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export default function List() {
    const { pendingAdvances, users, activeProjects, advances } =
        usePage().props;

    const [fileError, setFileError] = useState(null);
    const [isAddingExpense, setIsAddingExpense] = useState(false);
    const [advanceId, setAdvanceId] = useState(null);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
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
        user_id: "",
        project_id: "",
        method: "",
    });
    const setUser = (id) => {
        setAdvanceData("user_id", id);
    };
    const confirmSettlement = () => {
        router.post(
            route("advance.settlement"),
            {
                amount: amount,
                advance_id: advanceId,
                asa: "settle",
                file: file,
                description: description,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setAmount("");
                },
            },
        );
    };
    const confirmExpense = () => {
        router.post(
            route("employee.expense.store"),
            {
                amount: amount,
                advance_id: advanceId,
                asa: "expense",
                file: file,
                description: description,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setAmount("");
                    setFile(null);
                    setDescription("");
                },
            },
        );
    };
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
                    setPendingAdvances((prev) =>
                        prev.filter((a) => a.id !== id),
                    );
                    setShowModal(false);
                    setPaymentMethod("");
                    setSelectedAdvanceId(null);
                },
            },
        );
    };
    const [showModal, setShowModal] = useState(false);
    const [selectedAdvanceId, setSelectedAdvanceId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("");

    const handleApproveClick = (id) => {
        setSelectedAdvanceId(id);
        setShowModal(true);
    };

    const confirmApproval = () => {
        const selectedAdvance = pendingAdvancesData.find(
            (a) => a.id === selectedAdvanceId,
        );

        router.post(
            route("admin.advance.status"),
            {
                advance_id: selectedAdvanceId,
                status: "accepted",
                amount: selectedAdvance.amount,
                note: selectedAdvance.note,
                payment_method: paymentMethod, // أرسل طريقة الدفع
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setPendingAdvances((prev) =>
                        prev.filter((a) => a.id !== selectedAdvanceId),
                    );
                    setShowModal(false);
                    setPaymentMethod("");
                    setSelectedAdvanceId(null);
                },
            },
        );
    };
    const handleStatusAdvance = (id, status) => {
        //e.preventDefault();

        const selectedAdvance = pendingAdvancesData.find((a) => a.id === id);

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
                    setPendingAdvances((prev) =>
                        prev.filter((a) => a.id !== id),
                    );
                },
            },
        );
    };
    const updatePendingAdvance = (index, field, value) => {
        setPendingAdvances((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item,
            ),
        );
    };
    return (
        <AuthenticatedLayout>
            <AdvancesList
                advances={pendingAdvancesData}
                type="pending"
                onDelete={handleDeleteAdvance}
                onApprove={handleApproveClick}
                onReject={handleStatusAdvance}
                onUpdate={updatePendingAdvance}
                admin
            />
            <div>
                <div className="flex justify-center px-4 gap-4">
                    {/* نموذج العهدة */}
                    <div className="bg-white p-4 rounded shadow max-w-2xl mt-4  border border-gray-200 mx-auto">
                        <h3 className="font-semibold mb-2">إضافة عهدة جديدة</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log("postadvance");
                                postAdvance(route("admin.advance.store"), {
                                    preserveScroll: true,
                                    onSuccess: () => resetAdvance(),
                                });
                            }}
                        >
                            <select
                                name="user_id"
                                className="w-full border p-2 mb-2"
                                onChange={(e) => setUser(e.target.value)}
                            >
                                <option value="">اختر الموظف</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                required
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                placeholder="المبلغ"
                                value={advanceData.amount}
                                onChange={(e) =>
                                    setAdvanceData("amount", e.target.value)
                                }
                                className="w-full border p-2 mb-2"
                            />
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
                                onChange={(e) =>
                                    setAdvanceData("note", e.target.value)
                                }
                                className="w-full border p-2 mb-2"
                            />
                            {advanceErrors.note && (
                                <div className="text-red-600">
                                    {advanceErrors.note}
                                </div>
                            )}
                            <select
                                required
                                value={advanceData.project_id}
                                onChange={(e) =>
                                    setAdvanceData("project_id", e.target.value)
                                }
                                className="w-full border p-2 mb-2"
                            >
                                <option value="">للمشروع</option>
                                {activeProjects.map((project) => (
                                    <option value={project.id} key={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                                <option value="null">اخرى</option>
                            </select>
                            <select
                                required
                                className="w-full p-2 border rounded mb-4"
                                value={advanceData.method}
                                onChange={(e) =>
                                    setAdvanceData("method", e.target.value)
                                }
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
                </div>
                <h2 className="text-2xl font-semibold mb-2 border-t underline">
                    العهد المُستلمة
                </h2>
                {users.map(
                    (user) =>
                        user.advances.length > 0 && (
                            <div key={user.id} className="mb-6">
                                <h1 className="text-xl font-bold mb-2">
                                    {user.name}
                                </h1>

                                {Array.isArray(user.advances) &&
                                user.advances.length > 0 ? (
                                    <ul className="bg-white p-4 rounded shadow">
                                        {user.advances.map((a, index) => (
                                            <li
                                                key={index}
                                                className="border-b py-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div>
                                                            📅{" "}
                                                            {a.given_at ||
                                                                a.status}
                                                        </div>
                                                        <div>
                                                            💵 {a.amount} ج.م
                                                        </div>
                                                        <div>
                                                            💸 {a.method}{" "}
                                                        </div>
                                                        <div>📝 {a.note}</div>
                                                        <div>
                                                            📝{" "}
                                                            {a.project?.name ||
                                                                "اخرى"}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DeleteButton
                                                            id={a.id}
                                                            routeName="admin.advance.delete"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">
                                        لا توجد سلفيات
                                    </p>
                                )}
                            </div>
                        ),
                )}
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            اختر طريقة تسليم العهدة
                        </h2>
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
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-200 px-4 py-2 rounded"
                            >
                                إلغاء
                            </button>
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
