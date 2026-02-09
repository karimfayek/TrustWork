import React from "react";
export default function EmployeeReportView({ employees }) {
    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border">الموظف</th>
                        <th className="p-3 border">رقم العهدة</th>
                        <th className="p-3 border">تاريخ العهدة</th>
                        <th className="p-3 border">بيان</th>
                        <th className="p-3 border">التاريخ</th>
                        <th className="p-3 border">مدين</th>
                        <th className="p-3 border">دائن</th>
                        <th className="p-3 border">الرصيد</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((emp) =>
                        emp.advances.map((adv, advIndex) => {
                            let runningBalance = Number(adv.amount);

                            return (
                                <React.Fragment key={adv.id}>
                                    {/* Row: Advance */}
                                    <tr className="bg-blue-50 font-semibold">
                                        <td className="p-2 border">
                                            {advIndex === 0 ? emp.name : ""}
                                        </td>
                                        <td className="p-2 border">
                                            #{adv.id}
                                        </td>
                                        <td className="p-2 border">
                                            {adv.given_at}
                                        </td>
                                        <td className="p-2 border">عهدة</td>
                                        <td className="p-2 border">—</td>
                                        <td className="p-2 border text-green-600">
                                            {adv.amount}
                                        </td>
                                        <td className="p-2 border">—</td>
                                        <td className="p-2 border">
                                            {runningBalance}
                                        </td>
                                    </tr>

                                    {/* Expenses */}
                                    {adv.expenses.map((exp) => {
                                        runningBalance -= Number(exp.amount);

                                        return (
                                            <tr key={exp.id}>
                                                <td className="p-2 border"></td>
                                                <td className="p-2 border"></td>
                                                <td className="p-2 border"></td>
                                                <td className="p-2 border">
                                                    {exp.description}
                                                </td>
                                                <td className="p-2 border">
                                                    {exp.spent_at}
                                                </td>
                                                <td className="p-2 border"></td>
                                                <td className="p-2 border text-red-600">
                                                    {exp.amount}
                                                </td>
                                                <td className="p-2 border">
                                                    {runningBalance}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        }),
                    )}
                </tbody>
            </table>
        </div>
    );
}
