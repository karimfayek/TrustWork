import React, { useState } from 'react';
import ReportLayout from '../ReportLayout';
export default function FinancialReport({ users, projects }) {
    const [selectedProjectId, setSelectedProjectId] = useState('all');
    return (
        <ReportLayout>
            <div className="bg-white max-w-6xl mx-auto px-4 py-6 space-y-10">
                <h1 className="text-2xl font-bold text-center">تقرير العهد المالية</h1>
                <div className="mb-4 print:hidden">
                    <label htmlFor="projectFilter" className="mr-2 font-semibold">فلترة حسب المشروع:</label>
                    <select
                        id="projectFilter"
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                        className="border px-2 py-1 rounded"
                    >
                        <option value="all">الكل</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                    </select>
                </div>
                {/* قسم العهدة */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">العهدة المصروفة للمشروعات</h2>
                    <div className="overflow-x-auto border rounded shadow">
                        <table className="min-w-full table-auto text-sm text-right">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 border">اسم المشروع</th>
                                    <th className="p-2 border">التاريخ</th>
                                    <th className="p-2 border">القيمة (جنيه)</th>
                                    <th className="p-2 border"> للموظف </th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects
                                    .filter(project => selectedProjectId === 'all' || project.id == selectedProjectId)
                                    .map((project, projectIndex) => {
                                        let totalAdvances = 0;
                                        let totalExpenses = 0;

                                        return (
                                            <React.Fragment key={projectIndex}>
                                                {/* عنوان المشروع */}
                                                <tr className="bg-gray-200">
                                                    <td colSpan={4} className="font-bold p-2 text-2xl text-green-600">
                                                        {project.name}
                                                    </td>
                                                </tr>

                                                {/* العهد والمصاريف */}
                                                {project.advances?.map((adv, advIndex) => {
                                                    const expensesTotal = adv.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
                                                    totalAdvances += Number(adv.amount);
                                                    totalExpenses += Number(expensesTotal);

                                                    return (
                                                        <React.Fragment key={advIndex}>
                                                            {/* صف العهدة */}
                                                            <tr className="bg-gray-100">
                                                                <td className="p-2 border font-semibold" colSpan={4}>
                                                                    {advIndex + 1} -
                                                                    عهدة بتاريخ {adv.given_at} - بقيمة {adv.amount.toLocaleString()} جنيه - {adv.user?.name}
                                                                </td>
                                                            </tr>

                                                            {/* المصروفات المرتبطة بالعهدة */}
                                                            {adv.expenses?.length > 0 ? (
                                                                adv.expenses.map((exp, expIndex) => (
                                                                    <tr key={expIndex} className="hover:bg-gray-50">
                                                                        <td className="p-2 border"></td>
                                                                        <td className="p-2 border">{exp.spent_at}</td>
                                                                        <td className="p-2 border">{exp.amount.toLocaleString()}</td>
                                                                        <td className="p-2 border">{exp.description}</td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td className="p-2 border text-gray-500" colSpan={4}>
                                                                        لا توجد مصروفات لهذه العهدة
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </React.Fragment>
                                                    );
                                                })}

                                                {/* الإجماليات للمشروع */}
                                                <tr className="bg-gray-100 font-bold">
                                                    <td className="p-2 border" colSpan={2}>إجمالي العهد</td>
                                                    <td className="p-2 border" colSpan={2}>{totalAdvances.toLocaleString()} جنيه</td>
                                                </tr>
                                                <tr className="bg-gray-100 font-bold">
                                                    <td className="p-2 border" colSpan={2}>إجمالي المصروفات</td>
                                                    <td className="p-2 border" colSpan={2}>{totalExpenses.toLocaleString()} جنيه</td>
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })}

                            </tbody>
                        </table>
                    </div>
                </div>

                {/* قسم المصروفات */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">المصروفات</h2>
                    <div className="overflow-x-auto border rounded shadow">
                        <table className="min-w-full table-auto text-sm text-right">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 border">اسم المشروع</th>
                                    <th className="p-2 border">القيمة (جنيه)</th>
                                    <th className="p-2 border">الموظف</th>
                                    <th className="p-2 border">اضيفت بواسطه</th>
                                    <th className="p-2 border">الإيصال</th>
                                    <th className="p-2 border">التاريخ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, projectIndex) => (
                                    <React.Fragment key={projectIndex}>
                                        {project.advances.map((advance, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="p-2 border">{advance.project?.name}</td>
                                                <td className="p-2 border">{advance.amount.toLocaleString()}</td>
                                                <td className="p-2 border">{advance.user.name}</td>
                                                <td className="p-2 border">{advance.by?.name}</td>
                                                <td className="p-2 border"> <a className='text-blue-700 underline' href={"/storage/" + advance.file_path}> عرض</a></td>
                                                <td className="p-2 border">{advance.spent_at}</td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ReportLayout>
    );
}
