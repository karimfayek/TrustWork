export default function ExpenseTimeline({ expenses = [] }) {
    return (
        <div className="space-y-4 border-l pl-6">
            {expenses.map((exp) => (
                <div key={exp.id} className="relative">
                    <span className="absolute -left-[30px] top-1 w-4 h-4 bg-blue-600 rounded-full" />

                    <p className="text-xs text-gray-500">{exp.date}</p>
                    <p className="font-medium">{exp.description}</p>

                    <div className="flex justify-between items-center">
                        <span className="text-red-600 font-semibold">
                            - {exp.amount} EGP
                        </span>

                        {exp.receipt && (
                            <img
                                src={exp.receipt}
                                className="w-12 h-12 rounded cursor-pointer hover:scale-105 transition"
                            />
                        )}
                    </div>
                </div>
            ))}
            {expenses.length === 0 && (
                <p className="text-center text-gray-500">لا يوجد مصروفات</p>
            )}
        </div>
    );
}
