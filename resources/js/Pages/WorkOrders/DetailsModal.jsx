import React from "react";

export default function DetailsModal({
    showModal = false,
    setShowModal,
    order,
}) {
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-lg font-bold mb-4">
                            Order Details
                        </h2>

                        <div className="space-y-2">
                            <p>
                                <strong>العميل:</strong> {order.client_name}
                            </p>
                            <p>
                                <strong>الهاتف:</strong> {order.client_phone}
                            </p>
                            <p>
                                <strong>العنوان:</strong> {order.client_address}
                            </p>
                            <p>
                                <strong>التفاصيل:</strong> {order.description}
                            </p>
                            <p>
                                <strong>الموظفون:</strong>{" "}
                                {order.employees
                                    .map((emp) => emp.name)
                                    .join(", ")}
                            </p>
                            <p>
                                <strong>الحالة:</strong> {order.status}
                            </p>
                            <p>
                                <strong>تاريخ الطلب:</strong>{" "}
                                {new Date(
                                    order.created_at,
                                ).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-3 py-1 bg-gray-400 text-white rounded"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
