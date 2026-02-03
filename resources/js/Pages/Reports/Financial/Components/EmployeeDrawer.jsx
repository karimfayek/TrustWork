import CustodyAccordion from "./CustodyAccordion";

export default function EmployeeDrawer({ employee, onClose }) {
    if (!employee) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 flex justify-end z-50"
            onClick={onClose}
        >
            <div
                className="bg-white w-full md:w-[420px] h-full p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="text-gray-500 mb-4">
                    ✕ Close
                </button>

                <h2 className="text-xl font-bold">{employee.name}</h2>
                <p className="text-gray-500 mb-6">{employee.job_title}</p>

                <div className="space-y-4">
                    {employee.advances?.map((custody) => (
                        <CustodyAccordion
                            key={custody.id}
                            custody={custody}
                            amountOrig={
                                Number(custody.amount) -
                                custody.expenses.reduce(
                                    (total, expense) =>
                                        total + Number(expense.amount || 0),
                                    0,
                                )
                            }
                            user_id={employee.id}
                            advanceId={custody.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
