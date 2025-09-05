



export default function Projects ({tasks ,className , projects, title}){
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
                            تاريخ بدء المشروع
                        </th>
                        <th className="p-2 border">
                        تاريخ انتهاء المشروع
                        </th>
                        <th className="p-2 border">
                           اجمالى عدد بنود المشروع
                        </th>
                        <th className="p-2 border">
                        اجمالى عدد البنود للموظف
                        </th>
                        <th className="p-2 border">
                        اجمالى عدد البنود المكتمله للموظف
                        </th>
                       
                        <th className="p-2 border">
                            بنود متبقية
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {projects?.length > 0 ? (
                        projects?.map(
                            (proj , index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="p-2 border">
                                        {proj.name}
                                    </td>
                                    <td className="p-2 border text-green-700">
                                        {proj.start_date}
                                    </td>
                                    <td className="p-2 border text-center text-red-500">
                                        {proj.end_date}
                                    </td>
                                    <td className="p-2 border text-center">
                                        {proj.total_project_tasks}
                                    </td>
                                    <td className="p-2 border text-center">
                                        {proj.user_tasks?.length}
                                    </td>
                                    <td className="p-2 border text-center">
                                        {proj.completed_user_tasks}
                                    </td>
                                    <td className="p-2 border text-center">
                                        {Number(  Number(proj.user_tasks?.length) -Number(proj.completed_user_tasks) )}
                                      
                                    </td>
                                </tr>
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