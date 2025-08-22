import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import ReportLayout from "./ReportLayout";
import Projects from "./Project/Projects";
import Tasks from "./Project/Tasks";

export default function EmployeeReport({ employees }) {
    
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('all');
    const [show, setShow] = useState(false);
    const handleFIlter = (v) => {
        setSelectedEmployeeId(v)
        setShow(true)
    }
    return (
        <ReportLayout>
            <Head title="تقرير الموظفين" />

            <h1 className="text-2xl font-bold mb-6">تقرير الموظفين</h1>
            <div className="mb-4 print:hidden">
                    <label htmlFor="projectFilter" className="mr-2 font-semibold">فلترة حسب الموظف:</label>
                    <select
                        id="projectFilter"
                        value={selectedEmployeeId}
                        onChange={(e) => handleFIlter(e.target.value)}
                        className="border px-2 py-1 rounded"
                    >
                        <option value="all">الكل</option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>{employee.name}</option>
                        ))}
                    </select>
                </div>

            <button
                onClick={() => window.print()}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 print:hidden"
            >
                طباعة التقرير
            </button>

            <div className="overflow-x-auto">
                {show &&  employees.length > 0 &&
                    employees.filter(emp => selectedEmployeeId === 'all' || emp.id == selectedEmployeeId)
                    .map((emp, index) => {
                        return (

                        <React.Fragment key={index}>
                        <h2 className="mb-2 mt-2 text-2xl underline ">
                        {emp.name}
                        </h2>                         
                    
                            <Projects tasks={emp.tasks}  key={`active-projects-${index}`} projects={emp.active} title={'المشاريع المفتوحة'} className={'text-green-700'} />
                            <Tasks tasks={emp.tasks} key={`active-tasks-${index}`} projects={emp.active} title={'  المكلف بة'} className={'text-green-700'} />
                            <Projects name={emp.name}  key={`ended-projects-${index}`} projects={emp.ended} title={'المشاريع المنتهية'} className={'text-red-700'}/>
                            <Tasks tasks={emp.tasks}  key={`ended-tasks-${index}`} projects={emp.ended} title={'  المكلف بة'} className={'text-green-700'} />
                        <hr className="my-4 border-black"/>  
                        </React.Fragment>
                        );
                    })}
            </div>
        </ReportLayout>
    );
}
