import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function SalaryCalculator({
    user,
    forUser = false,
    totalAdvance,
    totalExpense,
    remaining,
}) {
    const [attData, setAttData] = useState({});
    const [month, setMonth] = useState(null);
    const admin = usePage().props.auth.user;
    const userRoles = admin?.rolesnames ?? [];
    // const absenceScore = Number(attData?.absenceDays) * Number(Number(user.salary?.base_salary) * 0.1)  ; Number(attData?.taskScore) +
    const absenceScoreold =
        Number(attData?.absenceDays) *
        Number(Number(user.salary?.final_salary) / 30);

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
    const [filters, setFilters] = useState(() => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = forUser
            ? new Date(now)
            : new Date(now.getFullYear(), now.getMonth() + 1, 0);

        return {
            from: firstDay.toLocaleDateString("en-CA"), // 'YYYY-MM-DD'
            to: lastDay.toLocaleDateString("en-CA"),
        };
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 1900); // 500ms = نص ثانية (تقدر تزود أو تقلل)

        return () => {
            clearTimeout(handler);
        };
    }, [filters]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `/calc-emp-att/${user.id}?from=${filters.from}&to=${filters.to}`,
                );
                const data = await response.json();
                setAttData(data);
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        if (filters.from && filters.to) {
            fetchData();
        }
    }, [debouncedFilters, user.id]);
    return (
        <div className="p-6">
            <div className="bg-gray-100 mb-12 p-5 shadow-sm ">
                <h2 className="bg-white p-5 text-2xl text-center underline">
                    {user.name}
                </h2>
                {!forUser && (
                    <MonthSelector
                        month={month}
                        setMonth={setMonth}
                        filters={filters}
                        setFilters={setFilters}
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {!forUser &&
                        ["admin", "acc"].some((role) =>
                            userRoles?.includes(role),
                        ) &&
                        admin.email !== "sherok@trustits.net" && (
                            <>
                                <EarningsSection
                                    user={user}
                                    attData={attData}
                                />
                                <DeductionsSection
                                    attData={attData}
                                    absenceScore={absenceScore}
                                />
                                <SalarySummary deserved={deserved} />
                            </>
                        )}
                    <AttendanceSection attData={attData} />
                    <TasksSection attData={attData} />
                    <ToolsSection attData={attData} />
                </div>
            </div>
        </div>
    );
}

const MonthSelector = ({ filters, setFilters }) => (
    <div>
        <form className="bg-white shadow rounded p-4 mb-8 space-y-4">
            <h2 className="text-lg font-semibold text-gray-600"> عرض نتائج</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                    <label htmlFor="from" className="mb-2">
                        من تاريخ
                    </label>
                    <input
                        required
                        className="border rounded p-2"
                        type="date"
                        value={filters.from}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                from: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="from" className="mb-2">
                        الى تاريخ
                    </label>
                    <input
                        required
                        className="border rounded p-2"
                        type="date"
                        value={filters.to}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                to: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
        </form>
    </div>
);

const EarningsSection = ({ user, attData }) => (
    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
        <h2 className="text-lg font-medium text-gray-900">استحقاقات</h2>
        <hr />
        <div>
            <b>المرتب</b>
            <p className="text-green-800">
                {Number(user.salary?.final_salary)}
            </p>
        </div>
        {/*  <div>
            <b>مستحق لانجاز المهام (متغير)</b>
            <p className="text-green-800">{Number(attData?.taskScore).toFixed(2)}</p>
        </div> */}
        <div>
            <b>الانتقالات</b>
            <p className="text-green-800">
                {Number(attData?.transportaionFees).toFixed(2)}
            </p>
        </div>
        <div>
            <b>المكافئات</b>
            <p className="text-green-800">
                {Number(attData?.rewards).toFixed(2)}
            </p>
        </div>
    </div>
);

const DeductionsSection = ({ attData, absenceScore }) => (
    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
        <h2 className="text-lg font-medium text-gray-900">استقطاعات</h2>
        <hr />
        <div>
            <b>استقطاعات من الراتب</b>
            <p className="text-red-800">
                {Number(
                    attData?.deductions - Number(attData?.lateDeductionsTotal),
                ).toFixed(2) ?? 0}
            </p>
        </div>
        <div>
            <b>تأخيرات</b>
            <p className="text-red-800">
                {Number(attData?.lateDeductionsTotal).toFixed(2) ?? 0}
            </p>
        </div>
        <div>
            <b> جزاءات</b>
            <p className="text-red-800">{Number(attData?.basics).toFixed(2)}</p>
        </div>
        <div>
            <b>غياب</b>
            <p className="text-red-800">
                <span>{absenceScore.toFixed(2)}</span>
            </p>
        </div>
        <div>
            <b>مفقودات</b>
            <p className="text-red-800">
                <span>{attData.lostCostThisMonth}</span>
            </p>
        </div>
        <div>
            <b>عهد - مصروفات</b>
            <p className="text-red-800">{attData?.remaining}</p>
        </div>
        <div>
            <b> سلف</b>
            <p className="text-red-800">{attData?.loans}</p>
        </div>
    </div>
);

const SalarySummary = ({ deserved }) => (
    <div className="bg-white shadow sm:rounded-lg sm:p-8 border mt-4 p-2.5 text-center">
        <b className="border p-1.5">المرتب المستحق</b>
        <p
            dir="ltr"
            className={`font-bold mt-3 text-2xl ${deserved < 1 ? "text-red-500" : "text-green-500"}`}
        >
            <br />
            {deserved}
        </p>
    </div>
);

const AttendanceSection = ({ attData }) => (
    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
        <h2 className="text-lg font-medium text-gray-900">الحضور</h2>
        <hr />
        <b>النسبة المئوية للحضور</b>
        <p>{attData?.attendance_percentage} %</p>
        {/*  <div>
            <b>عدد ايام العمل فى الشهر</b>
            <p>{attData?.total_days} يوم</p>
        </div> */}
        <div>
            <b>عدد ايام الحضور المتأخر</b>
            <p>{attData?.late_days}</p>
        </div>
        <div>
            <b>عدد ايام الحضور خلال الشهر</b>
            <p>{attData?.att_days}</p>
        </div>
        <div>
            <b>عدد ايام الغياب خلال الشهر</b>
            <p>{attData?.absenceDays}</p>
        </div>
    </div>
);

const TasksSection = ({ attData }) => (
    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
        <h2 className="text-lg font-medium text-gray-900">المهام</h2>
        <hr />
        <b>اجمالى المهام المسندة خلال الشهر</b>
        <p>{attData?.alltasks}</p>
        <div>
            <b>المهام المكتمله</b>
            <p>{attData?.tasksCompleted}</p>
        </div>
        <div>
            <b>النسبه المئوية لاكمال المهام</b>
            <p>{attData?.completedTasksPercentage} %</p>
        </div>
    </div>
);

const ToolsSection = ({ attData }) => (
    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
        <h2 className="text-lg font-medium text-gray-900">الادوات</h2>
        <hr />
        <b>ادوات معه:</b>
        <ul className="inline-flex flex-wrap">
            {attData.assignments &&
                attData.assignments.map(
                    (assign) =>
                        assign.status === "assigned" && (
                            <li
                                key={assign.id}
                                className="bg-[#b7ffb7] p-1.5 m-2"
                            >
                                {assign.tool?.name} * {assign.quantity}
                            </li>
                        ),
                )}
        </ul>
        <div>
            <b>ادوات مفقودة:</b>
            {attData.lostThismonth?.length < 1 && (
                <p className="bg-[#FF2D20]/10 p-1.5 m-2">لا يوجد</p>
            )}
            <ul className="inline-flex flex-wrap">
                {attData.lostThismonth &&
                    attData.lostThismonth.map((t) => (
                        <li key={t.id} className="bg-[#FF2D20]/10 p-1.5 m-2">
                            {t.tool?.name} * {t.quantity} *{" "}
                            {t.tool.estimated_value} ج
                        </li>
                    ))}
            </ul>
        </div>
        <div>
            <b>قيمه الادوات المفقودة</b>
            <p>{attData.lostCostThisMonth} ج</p>
        </div>
    </div>
);
