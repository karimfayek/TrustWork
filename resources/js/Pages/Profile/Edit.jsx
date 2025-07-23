
import UserLayout from '@/Layouts/UserLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    console.log(user ,'user')
    const [attData, setAttData] = useState({})
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
                        مكافئات
                    </h2>
                    <hr />
                    {user.rewards?.map(
                        (reward)=>(
                            <><b>
                               القيمة
                            </b>
                            <p>{reward.amount} - {reward.reason} </p>
                           
                            <p>بتاريخ : {reward.reward_date}</p>
                            <hr className='my-2' />
                            </>
                        )
                    )}
                   
                   



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
