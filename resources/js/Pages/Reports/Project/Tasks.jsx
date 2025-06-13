



export default function Tasks ({tasks ,className , projects, title}){
    console.log('projects' , projects)

    return(
        <>
        
        <h2 className={"mb-2 mt-2 text-xl " + className}>
           {title}
        </h2>
        <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">
                            اسم المشروع
                        </th>
                        <th className="p-2 border">
                            اسم البند
                        </th>
                        <th className="p-2 border">
                            الجدول الزمنى - تاريخ بدء 
                        </th>
                        <th className="p-2 border">
                        الجدول الزمنى - تاريخ الانتهاء 
                        </th>
                        <th className="p-2 border">
                          العدد
                        </th>
                        <th className="p-2 border">
                      الموظف انجز 
                        </th>
                       
                       
                        <th className="p-2 border">
                         العدد المتبقى
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {projects?.length > 0 ? (
                        projects?.map(
                            (proj , index) => (
                                proj.user_tasks?.map(
                                   
                                    (tsk , indx)=> (
                                     
                                        <tr
                                        key={indx}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="p-2 border">
                                            {proj.name}
                                        </td>
                                        <td className="p-2 border">
                                            {tsk.title}
                                        </td>
                                        <td className="p-2 border text-green-700">
                                            {tsk.start_date}
                                        </td>
                                        <td className="p-2 border text-center text-red-500">
                                            {tsk.end_date}
                                        </td>
                                        <td className="p-2 border text-center">
                                            {tsk.quantity}
                                        </td>
                                        <td className="p-2 border text-center">
                                        {tsk.done_by_employee}
                                        </td>
                                        <td className="p-2 border text-center">
                                        {tsk.quantity - tsk.done_by_employee }
                                        </td>
                                      
                                    </tr>
                                    )
                                )
                               
                            )
                        )
                    ) : (
                        <tr>
                            <td
                                className="p-4 text-center text-gray-500"
                                colSpan="7"
                            >
                                لا توجد بيانات متاحة حاليًا
                            </td>
                        </tr>
                    )}
                </tbody>
            </table><hr className="my-3 " /></>
    )
}