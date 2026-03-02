import React from "react";

export default function AssignDateModal({
    showModal = false,
    setShowModal,
    assignDate,
    setAssignDate,
    assignDateSubmit,
}) {
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-lg font-bold mb-4">
                            تاريخ التنفيذ
                        </h2>

                        <div className="space-y-2">
                            <div className="flex flex-col">
                                <label htmlFor="date">تاريخ التنفيذ</label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={assignDate}
                                    onChange={(e) =>
                                        setAssignDate(e.target.value)
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
                                onClick={assignDateSubmit}
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
