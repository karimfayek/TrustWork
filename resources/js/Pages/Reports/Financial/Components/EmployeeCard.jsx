export default function EmployeeCard({ employee, onClick, className }) {
    return (
        <div
            onClick={onClick}
            className={` rounded-xl shadow p-5 cursor-pointer hover:shadow-lg transition ${className}`}
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                    {employee.name.charAt(0)}
                </div>
                <div>
                    <h3 className="font-semibold">{employee.name}</h3>
                    <p className="text-sm text-gray-500">
                        {employee.job_title}
                    </p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 text-sm">
                <div>
                    اجمالى العهد
                    <div className="font-bold">{employee.total_advances}</div>
                </div>
                <div>
                    اجمالى المصروفات
                    <div className="font-bold text-green-600">
                        {employee.total_expenses} EGP
                    </div>
                </div>
            </div>
        </div>
    );
}
