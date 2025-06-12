
import UserLayout from '@/Layouts/UserLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const [attData, setAttData] = useState({})
    const [totalCost, setTotalCost] = useState(0)
    console.log('user', user)
    useEffect(() => {
        fetch(`/calc-emp-att/${user.id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log('attdata', data);
                setAttData(data);
            });
    }, []);
    const absenceScore = Number(attData?.absenceDays) * Number(Number(user.salary?.base_salary) * .10)
    const deserved = Number(Number(user.salary?.base_salary) + Number(attData?.taskScore) + Number(attData?.rewards) - absenceScore - Number(attData?.lateScore) + Number(attData?.transportaionFees) - Number(attData.lostCostThisMonth) - Number(attData.deductions) - Number(attData.remaining)).toFixed(2)


    return (
        <UserLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="md:grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-10">

                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">

                    <h2 className='text-lg font-medium text-gray-900'>
                        استحقاقات
                    </h2>
                    <hr />
                    <div>
                        <b>
                            الاساسي
                        </b>
                        <p className='text-green-800'>{(Number(user.salary?.base_salary))}</p>
                    </div>
                    <div>
                        <b>
                            مستحق لانجاز المهام
                        </b>
                        <p className='text-green-800'> {Number(attData?.taskScore).toFixed(2)}</p>
                    </div>

                    <div>

                        <b>
                            الانتقالات
                        </b>
                        <p className='text-green-800'> {Number(attData?.transportaionFees).toFixed(2)}</p>
                    </div>
                    <div>

                        <b>
                            المكافئات
                        </b>
                        <p className='text-green-800'> {Number(attData?.rewards).toFixed(2)}</p>
                    </div>
                </div>

                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <h2 className='text-lg font-medium text-gray-900'>
                        استقطاعات
                    </h2>
                    <hr />
                    <div>
                        <b>
                            استقطاعات اساسيه من الراتب
                        </b>
                        <p className='text-red-800'>  {Number(attData?.deductions).toFixed(2)}</p>
                    </div>
                    <b>
                        التاخيرات
                    </b>
                    <p className='text-red-800'>  <span>{Number(attData.lateScore).toFixed(2)} </span></p>
                    <div>
                        <b>
                            غياب
                        </b>
                        <p className='text-red-800'> <span> {absenceScore}</span></p>
                    </div>
                    <div>
                        <b>
                            مفقودات
                        </b>
                        <p className='text-red-800'> <span> {attData.lostCostThisMonth}</span></p>
                    </div>

                    <div>
                        <b>
                            عهد - مصروفات
                        </b>
                        <p className='text-red-800'> {attData?.remaining}</p>
                    </div>

                </div>
                <div className='bg-white  shadow sm:rounded-lg sm:p-8 border mt-4 p-2.5 text-center'>
                    <b className='border p-1.5'>
                        المرتب المستحق
                    </b>
                    <p dir="ltr" className={`font-bold mt-3 text-2xl ${deserved < 1 ? 'text-red-500' : 'text-green-500'}`}>

                        <br />
                        {deserved}</p>
                </div>
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <h2 className='text-lg font-medium text-gray-900'>
                        الحضور
                    </h2>
                    <hr />
                    <b>
                        النسبة المئوية للحضور
                    </b>
                    <p>{attData?.attendance_percentage} %</p>
                    <div>
                        <b>
                            عدد ايام العمل فى الشهر
                        </b>
                        <p>{attData?.total_days} يوم</p>
                    </div>
                    <div>
                        <b>
                            عدد ايام الحضور المتأخر
                        </b>
                        <p>{attData?.late_days}</p>
                    </div>

                    <div>
                        <b>
                            عدد ايام الحضور خلال الشهر
                        </b>
                        <p>{attData?.att_days}</p>
                    </div>
                    <div>
                        <b>
                            عدد ايام الغياب خلال الشهر
                        </b>
                        <p>{attData?.absenceDays}</p>
                    </div>



                </div>
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <h2 className='text-lg font-medium text-gray-900'>
                        المهام
                    </h2>
                    <hr />
                    <b>
                        اجمالى المهام المسندة خلال الشهر
                    </b>
                    <p>{attData?.alltasks}</p>
                    <div>
                        <b>
                            المهام المكتمله
                        </b>
                        <p>{attData?.tasksCompleted}</p>
                    </div>
                    <div>
                        <b>
                            النسبه المئوية لاكمال المهام
                        </b>
                        <p>{attData?.completedTasksPercentage} %</p>
                    </div>

                </div>
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <h2 className='text-lg font-medium text-gray-900'>
                        الادوات
                    </h2>
                    <hr />
                    <b>
                        ادوات معه:
                    </b>

                    <ul className='inline-flex flex-wrap'>
                        {attData.assignments && attData.assignments.map((assign) => (
                            <>
                                {assign.status === 'assigned' &&
                                    <li className='bg-[#b7ffb7] p-1.5 m-2'>{assign.tool?.name} * {assign.quantity}</li>
                                }
                            </>

                        ))}
                    </ul>
                    <div>
                        <b>
                            ادوات مفقودة:
                        </b>
                        {attData.lostThismonth?.length < 1 &&
                            <p className='bg-[#FF2D20]/10 p-1.5 m-2' > لا يوجد</p>
                        }
                        <ul className='inline-flex flex-wrap'>
                            {attData.lostThismonth && attData.lostThismonth.map((t) => (


                                <li className='bg-[#FF2D20]/10 p-1.5 m-2'>{t.tool?.name} * {t.quantity} *{t.tool.estimated_value} ج </li>



                            ))}
                        </ul>

                    </div>
                    <div>
                        <b>
                            قيمه الادوات المفقودة
                        </b>
                        <p>
                            {attData.lostCostThisMonth} ج</p>
                    </div>

                </div>
            </div>
        </UserLayout >
    );
}
