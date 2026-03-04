import React from "react";

export default function EditModal({
    showModal = false,
    setShowModal,
    editData,
    setEditData,
    submit,
    processing,
    editErrors,
}) {
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-lg font-bold mb-4">
                            Edit Work Order
                        </h2>
                        <div className="flex flex-col">
                            <label htmlFor="date"> اسم العميل </label>
                            <input
                                type="text"
                                name="client_name"
                                id="client_name"
                                value={editData?.client_name}
                                onChange={(e) =>
                                    setEditData("client_name", e.target.value)
                                }
                            />
                            {editErrors?.client_name && (
                                <p className="text-red-500">
                                    {editErrors?.client_name}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="date"> رقم العميل </label>
                            <input
                                type="text"
                                name="client_phone"
                                id="client_phone"
                                value={editData?.client_phone}
                                onChange={(e) =>
                                    setEditData("client_phone", e.target.value)
                                }
                            />
                            {editErrors?.client_phone && (
                                <p className="text-red-500">
                                    {editErrors?.client_phone}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="date"> عنوان العميل </label>
                            <input
                                type="text"
                                name="client_address"
                                id="client_address"
                                value={editData?.client_address}
                                onChange={(e) =>
                                    setEditData(
                                        "client_address",
                                        e.target.value,
                                    )
                                }
                            />
                            {editErrors?.client_address && (
                                <p className="text-red-500">
                                    {editErrors?.client_address}
                                </p>
                            )}
                        </div>
                        {/* priority */}
                        <div className="flex flex-col">
                            <label htmlFor="date"> أولوية الطلب </label>
                            <select
                                name="priority"
                                id="priority"
                                value={editData?.priority}
                                onChange={(e) =>
                                    setEditData("priority", e.target.value)
                                }
                            >
                                <option value="1">عاجل</option>
                                <option value="2">متوسط</option>
                                <option value="3">منخفض</option>
                            </select>
                            {editErrors?.priority && (
                                <p className="text-red-500">
                                    {editErrors?.priority}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="date"> وصف الطلب </label>
                            <textarea
                                name="description"
                                id="description"
                                value={editData?.description}
                                onChange={(e) =>
                                    setEditData("description", e.target.value)
                                }
                            />
                            {editErrors?.description && (
                                <p className="text-red-500">
                                    {editErrors?.description}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-3 py-1 bg-gray-400 text-white rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => submit()}
                                disabled={processing}
                                className="px-3 py-1 bg-blue-600 text-white rounded"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
