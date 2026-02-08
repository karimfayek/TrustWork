import React, { useEffect, useState } from "react";
import ReportLayout from "../ReportLayout";
import { Link } from "@inertiajs/react";

function SalaryRow({ user, filters, setLoading, onCalculated }) {
    const [attData, setAttData] = useState({});
    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 1000); // 500ms = نص ثانية (تقدر تزود أو تقلل)

        return () => {
            clearTimeout(handler);
        };
    }, [filters]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `/calc-emp-att/${user.id}?from=${debouncedFilters.from}&to=${debouncedFilters.to}`,
                );
                const data = await response.json();
                setAttData(data);
            } catch (err) {
                console.error("خطأ في جلب بيانات الحضور:", err);
            } finally {
                setLoading(false); // ⬅️ انتهى التحميل
            }
        };
        if (debouncedFilters.from && debouncedFilters.to) {
            fetchData();
        }
    }, [user.id, debouncedFilters]);

    const absenceScoreold =
        (Number(user.salary?.final_salary ?? 0) / 30) *
        Number(attData?.absenceDays ?? 0);

    const realAttDayes = attData?.month_days - attData?.absenceDays; //31-24 =7
    const att_days = attData?.absenceDays < 7 ? realAttDayes : attData.att_days;
    const attDayesSalary =
        (Number(user.salary?.final_salary ?? 0) / attData?.month_days) *
        Number(att_days ?? 0); //12500/31*7 = 2822
    const absenceScore =
        Number(user.salary?.final_salary ?? 0) - attDayesSalary; //7000-1580.65=5419.35

    const deservedOrig = Number(
        Number(user.salary?.final_salary ?? 0) + //7000 + 0 - 1129.03 = 5870.97
            Number(attData?.rewards ?? 0) - //0
            absenceScore + //1129.03
            Number(attData?.transportaionFees ?? 0) -
            Number(attData?.lostCostThisMonth ?? 0) -
            Number(attData?.deductions ?? 0) -
            Number(attData?.basics ?? 0) -
            Number(attData?.loans ?? 0) -
            Number(attData?.remaining ?? 0),
    ).toFixed(2);
    const tempSalary =
        Number(user.salary?.final_salary ?? 0) * attData.att_days;
    const deserved = user.temporary ? tempSalary : deservedOrig;
    useEffect(() => {
        if (!isNaN(deserved) && onCalculated) {
            onCalculated(deserved);
        }
    }, [deserved]);
    return (
        <tr className="border-b">
            <td className="p-2">
                <Link
                    className="hover:text-blue-500"
                    href={route("admin.user.edit", user.id)}
                >
                    {user.name}
                </Link>{" "}
            </td>
            <td className="p-2">{user.salary?.final_salary ?? 0}</td>
            <td className="p-2">{attData?.att_days ?? 0}</td>
            <td className="p-2">{attData?.absenceDays ?? 0}</td>
            <td className="p-2">{Number(absenceScore).toFixed(2)}</td>
            <td className="p-2">
                {Number(attData?.lostCostThisMonth).toFixed(2)}
            </td>
            <td className="p-2 remaining">{attData?.remaining}</td>
            <td className="p-2">{attData?.basics ?? 0}</td>
            <td className="p-2">
                {Number(
                    attData?.deductions - Number(attData?.lateDeductionsTotal),
                ).toFixed(2) ?? 0}
            </td>
            <td className="p-2 lateDeductions">
                {Number(attData?.lateDeductionsTotal).toFixed(2) ?? 0}
            </td>
            <td className="p-2">{attData?.loans ?? 0}</td>
            <td className="p-2">{attData?.rewards ?? 0}</td>
            <td className="p-2 font-bold">{deserved}</td>
        </tr>
    );
}
const MonthSelector = ({ filters, setFilters, loading }) => {
    const [tempFilters, setTempFilters] = useState(filters);

    const handleExecute = (e) => {
        e.preventDefault();
        setFilters(tempFilters);
    };

    return (
        <form
            onSubmit={handleExecute}
            className="bg-white shadow rounded p-4 mb-8 space-y-4 print:hidden"
        >
            <h2 className="text-lg font-semibold text-gray-600">عرض نتائج</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex flex-col">
                    <label htmlFor="from" className="mb-2">
                        من تاريخ
                    </label>
                    <input
                        required
                        className="border rounded p-2"
                        type="date"
                        value={tempFilters.from}
                        onChange={(e) =>
                            setTempFilters({
                                ...tempFilters,
                                from: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="to" className="mb-2">
                        إلى تاريخ
                    </label>
                    <input
                        required
                        className="border rounded p-2"
                        type="date"
                        value={tempFilters.to}
                        onChange={(e) =>
                            setTempFilters({
                                ...tempFilters,
                                to: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="flex flex-col justify-end">
                    <button
                        type="submit"
                        disabled={loading} // ⬅️ يتعطل أثناء التحميل
                        className={`py-2 px-4 rounded-lg transition text-white ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "جاري التنفيذ..." : "تنفيذ"}
                    </button>
                </div>

                {/* زر الطباعة */}
                <div className="flex flex-col justify-end">
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                    >
                        طباعة
                    </button>
                </div>
            </div>
        </form>
    );
};

export default function EmployeeReport({ users }) {
    const [userTotals, setUserTotals] = useState({});
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState(() => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return {
            from: firstDay.toLocaleDateString("en-CA"),
            to: lastDay.toLocaleDateString("en-CA"),
        };
    });
    // reset لما يتغير الفلاتر
    useEffect(() => {
        setUserTotals({});
    }, [filters]);
    const totals = Object.values(userTotals).reduce(
        (sum, v) => sum + Number(v || 0),
        0,
    );
    return (
        <ReportLayout>
            <div className="mb-4">
                <MonthSelector
                    filters={filters}
                    setFilters={setFilters}
                    loading={loading}
                />
            </div>

            <div className="mb-[100px]">
                <h2 className="text-xl font-semibold border-b pb-2 mb-2">
                    الرواتب
                </h2>
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">الموظف</th>
                            <th className="p-2 border">الراتب</th>
                            <th className="p-2 border">الحضور</th>
                            <th className="p-2 border">عدد ايام الغياب</th>
                            <th className="p-2 border">الغياب</th>
                            <th className="p-2 border">مفقودات</th>
                            <th className="p-2 border">عهد</th>
                            <th className="p-2 border">الاستقطاعات</th>
                            <th className="p-2 border">جزاءات</th>
                            <th className="p-2 border">التأخيرات</th>
                            <th className="p-2 border">سلف</th>
                            <th className="p-2 border">المكافآت</th>
                            <th className="p-2 border">المستحق</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <SalaryRow
                                key={user.id}
                                user={user}
                                filters={filters}
                                setLoading={setLoading}
                                onCalculated={(val) =>
                                    setUserTotals((prev) => ({
                                        ...prev,
                                        [user.id]: Math.max(
                                            Number(val) || 0,
                                            0,
                                        ),
                                    }))
                                }
                            />
                        ))}
                        <tr className="font-bold bg-gray-50">
                            <td colSpan={12} className="p-2 border text-center">
                                الإجمالي
                            </td>
                            <td className="p-2 border text-center">
                                {totals.toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ReportLayout>
    );
}
