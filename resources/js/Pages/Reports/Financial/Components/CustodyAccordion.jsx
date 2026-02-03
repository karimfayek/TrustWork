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
    const [amount, setAmount] = useState(amountOrig);

    const confirmApproval = () => {
        if (amount > amountOrig || amount < 1) {
            alert("ادخل قيمه اكبر من واحد واقل من المبلغ المتبقى من السلفه");
            return;
        }
        router.post(
            route("admin.advance.settlement"),
            {
                amount: amount,
                user_id: user_id,
                advance_id: advanceId,
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
                            <button
                                onClick={(e) => setShowModal(true)}
                                className="text-red-500 hover:underline text-sm"
                            >
                                🗑 تسوية
                            </button>
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
                            {" "}
                            مبلغ التسوية
                        </h2>
                        <input
                            type={"text"}
                            className="w-full p-2 border rounded mb-4"
                            value={amount}
                            min={1}
                            max={amountOrig}
                            onChange={(e) => setAmount(e.target.value)}
                        />

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
