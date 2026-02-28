import React from "react";

export default function AssignModal({
    showModal = false,
    setShowModal,
    employees,
    toggleEmployee,
    submit,
    processing,
}) {
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-lg font-bold mb-4">
                            Assign Employees
                        </h2>

                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {employees.map((emp) => (
                                <label
                                    key={emp.id}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={emp.id}
                                        onChange={() => toggleEmployee(emp.id)}
                                    />
                                    {emp.name}
                                </label>
                            ))}
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
