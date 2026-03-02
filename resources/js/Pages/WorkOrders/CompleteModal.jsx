import React from "react";

export default function CompleteModal({
    showModal = false,
    setShowModal,
    order,
    submit,
    processing,
    setCompleteFile,
    setCompleteOrderData,
    completeOrderData,
}) {
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-lg font-bold mb-4">ارفاق ملف</h2>

                        <div className="space-y-2">
                            <div className="flex flex-col">
                                <label htmlFor="file">الملف</label>
                                <input
                                    className="border rounded p-2"
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={(e) =>
                                        setCompleteFile(e.target.files[0])
                                    }
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="date">تاريخ الانتهاء</label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={completeOrderData}
                                    onChange={(e) =>
                                        setCompleteOrderData(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-3 py-1 bg-gray-400 text-white rounded"
                            >
                                إغلاق
                            </button>
                            <button
                                onClick={submit}
                                disabled={processing}
                                className="px-3 py-1 bg-green-600 text-white rounded"
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
