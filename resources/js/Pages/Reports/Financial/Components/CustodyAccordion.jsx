import { useState } from "react";
import ExpenseTimeline from "./ExpenseTimeline";
import { router } from "@inertiajs/react";

export default function CustodyAccordion({
    custody,
    amountOrig,
    user_id,
    advanceId,
}) {
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [fileError, setFileError] = useState(null);
    const [isAddingExpense, setIsAddingExpense] = useState(false);
    const [amount, setAmount] = useState(amountOrig);
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const handleAddExpense = (e) => {
        e.stopPropagation();
        setIsAddingExpense(true);
        setShowModal(true);
    };
    const confirmApproval = () => {
        if (amount > amountOrig || amount < 1) {
            alert("ادخل قيمه اكبر من واحد واقل من المبلغ المتبقى من السلفه");
            return;
        }
        if (isAddingExpense && !file) {
            setFileError("الملف مطلوب");
            return;
        }
        if (!description && isAddingExpense) {
            alert("ادخل الوصف");
            return;
        }
        const asa = isAddingExpense ? "expense" : "settle";
        const routeName = isAddingExpense
            ? "employee.expense.store"
            : "admin.advance.settlement";
        router.post(
            route(routeName),
            {
                amount: amount,
                user_id: user_id,
                advance_id: advanceId,
                asa: asa,
                file: file,
                description: description,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                    setAmount(0);
                    router.reload();
                },
            },
        );
    };

    return (
        <>
            <div className="border rounded-xl">
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full p-4 flex justify-between items-center"
                >
                    <div>
                        <p
                            className="font-semibold"
                            style={{
                                color: custody.is_opened ? "red" : "green",
                            }}
                        >
                            عهدة #{custody.project?.name}-{" "}
                            {custody.is_opened ? "مفتوحة" : "مغلقة"}
                        </p>
                        <p className="text-sm text-gray-500">
                            {custody.date} • {custody.amount} EGP
                        </p>
                        {custody.is_opened && (
                            <div className="flex gap-2 justify-between">
                                <div>
                                    <button
                                        onClick={(e) => setShowModal(true)}
                                        className="text-red-500 hover:underline text-sm"
                                    >
                                        🗑 تسوية
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={(e) => handleAddExpense(e)}
                                        className="text-green-500 hover:underline text-sm"
                                    >
                                        اضافة مصروف
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <span>{open ? "−" : "+"}</span>
                </button>

                {open && (
                    <div className="p-4 border-t space-y-4">
                        <ExpenseTimeline expenses={custody.expenses} />
                    </div>
                )}
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            {isAddingExpense ? "مبلغ المصروف" : "مبلغ التسوية"}
                        </h2>
                        <input
                            type={"text"}
                            className="w-full p-2 border rounded mb-4"
                            value={amount}
                            min={1}
                            max={amountOrig}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        {isAddingExpense && (
                            <>
                                {fileError && (
                                    <p className="text-red-500 text-sm">
                                        {fileError}
                                    </p>
                                )}
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    الايصال
                                </label>
                                <input
                                    required
                                    type={"file"}
                                    className="w-full p-2 border rounded mb-4"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    الوصف *
                                </label>
                                <input
                                    required
                                    type={"text"}
                                    className="w-full p-2 border rounded mb-4"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </>
                        )}

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-200 px-4 py-2 rounded"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={confirmApproval}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                تأكيد
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
