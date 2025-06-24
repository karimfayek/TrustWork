import { useState, useEffect } from 'react';

export default function SalaryCalculator({ user, acceptedAdvances, totalAdvance, totalExpense, remaining }) {
    const [attData, setAttData] = useState({});
    const [month, setMonth] = useState(null);
    
    const absenceScore = Number(attData?.absenceDays) * Number(Number(user.salary?.base_salary) * 0.1);
    
    const deserved = Number(
        Number(user.salary?.base_salary) +
        Number(attData?.taskScore) +
        Number(attData?.rewards) -
        absenceScore -
        Number(attData?.lateScore) +
        Number(attData?.transportaionFees) -
        Number(attData.lostCostThisMonth) -
        Number(attData.deductions) -
        Number(attData.remaining)
    ).toFixed(2);

    useEffect(() => {
        fetch(`/calc-emp-att/${user.id}/${month}`)
            .then((res) => res.json())
            .then((data) => setAttData(data));
    }, [month, user.id]);

    return (
        <div className="p-6">
            <h2 className='text-2xl text-center underline'>{user.name}</h2>
            <div className="bg-gray-100 mb-12 p-5 shadow-sm ">
                <MonthSelector month={month} setMonth={setMonth} />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <EarningsSection user={user} attData={attData} />
                    <DeductionsSection attData={attData} absenceScore={absenceScore} />
                    <SalarySummary deserved={deserved} />
                    <AttendanceSection attData={attData} />
                    <TasksSection attData={attData} />
                    <ToolsSection attData={attData} />
                </div>
            </div>
        </div>
    );
}

const MonthSelector = ({ month, setMonth }) => (
    <div>
        <select
            className="mb-4 w-48 print:hidden"
            name="month"
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
        >
            <option value="null">الى اليوم الحالى</option>
            <option value="1">يناير</option>
            <option value="2">فبراير</option>
            <option value="3">مارس</option>
            <option value="4">ابريل</option>
            <option value="5">مايو</option>
            <option value="6">يونيو</option>
            <option value="7">يوليو</option>
            <option value="8">اغسطس</option>
            <option value="9">سبتمبر</option>
            <option value="10">اكتوبر</option>
            <option value="11">نوفمبر</option>
            <option value="12">ديسمير</option>
        </select>
    </div>
);

const EarningsSection = ({ user, attData }) => (
    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
        <h2 className="text-lg font-medium text-gray-900">استحقاقات</h2>
        <hr />
        <div>
            <b>الاساسي</b>
            <p className="text-green-800">{Number(user.salary?.base_salary)}</p>
        </div>
        <div>
            <b>مستحق لانجاز المهام</b>
            <p className="text-green-800">{Number(attData?.taskScore).toFixed(2)}</p>
        </div>
        <div>
            <b>الانتقالات</b>
            <p className="text-green-800">{Number(attData?.transportaionFees).toFixed(2)}</p>
        </div>
        <div>
            <b>المكافئات</b>
            <p className="text-green-800">{Number(attData?.rewards).toFixed(2)}</p>
        </div>
    </div>
);

const DeductionsSection = ({ attData, absenceScore }) => (
    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
        <h2 className="text-lg font-medium text-gray-900">استقطاعات</h2>
        <hr />
        <div>
            <b>استقطاعات اساسيه من الراتب</b>
            <p className="text-red-800">{Number(attData?.deductions).toFixed(2)}</p>
        </div>
        <b>التاخيرات</b>
        <p className="text-red-800">
            <span>{Number(attData.lateScore).toFixed(2)}</span>
        </p>
        <div>
            <b>غياب</b>
            <p className="text-red-800"><span>{absenceScore}</span></p>
        </div>
        <div>
            <b>مفقودات</b>
            <p className="text-red-800"><span>{attData.lostCostThisMonth}</span></p>
        </div>
        <div>
            <b>عهد - مصروفات</b>
            <p className="text-red-800">{attData?.remaining}</p>
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
        <div>
            <b>عدد ايام العمل فى الشهر</b>
            <p>{attData?.total_days} يوم</p>
        </div>
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
                attData.assignments.map((assign) => (
                    assign.status === "assigned" && (
                        <li key={assign.id} className="bg-[#b7ffb7] p-1.5 m-2">
                            {assign.tool?.name} * {assign.quantity}
                        </li>
                    )
                ))}
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
                            {t.tool?.name} * {t.quantity} * {t.tool.estimated_value} ج
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