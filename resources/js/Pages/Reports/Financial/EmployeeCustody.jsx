import { useState } from "react";
import StatsBar from "./Components/StatsBar";
import EmployeeCard from "./Components/EmployeeCard";
import EmployeeDrawer from "./Components/EmployeeDrawer";
import ReportLayout from "../ReportLayout";
import EmployeeReportView from "./EmployeeReportView";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EmployeeCustody({
    employees,
    totalExpenses,
    openCustodiesCount,
    totalAdvances,
}) {
    const [viewMode, setViewMode] = useState("cards");
    // cards | report

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const employeesWithOpenCustodies = employees.filter((emp) =>
        emp.advances.some((adv) => adv.is_opened === true),
    );
    const employeesWithClosedCustodies = employees
        .filter((emp) => emp.advances.every((adv) => adv.is_opened === false))
        .sort((a, b) => b.total_advances - a.total_advances);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredEmployeesWithOpenCustodies =
        employeesWithOpenCustodies.filter((emp) =>
            emp.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    const filteredEmployeesWithClosedCustodies =
        employeesWithClosedCustodies.filter((emp) =>
            emp.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    if (viewMode === "report") {
        return <EmployeeReportView employees={employees} />;
    }
    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-6">
                <StatsBar
                    employees={employees}
                    totalExpenses={totalExpenses}
                    openCustodiesCount={openCustodiesCount}
                    totalAdvances={totalAdvances}
                />
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode("cards")}
                        className={`px-4 py-2 rounded-lg border 
      ${viewMode === "cards" ? "bg-blue-600 text-white" : "bg-white"}`}
                    >
                        Cards
                    </button>

                    <button
                        onClick={() => setViewMode("report")}
                        className={`px-4 py-2 rounded-lg border 
      ${viewMode === "report" ? "bg-blue-600 text-white" : "bg-white"}`}
                    >
                        تقرير
                    </button>
                </div>

                {/* Search */}
                <input
                    type="text"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-1/3 border rounded-lg px-4 py-2"
                    placeholder="Search employee..."
                />
                {filteredEmployeesWithOpenCustodies.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filteredEmployeesWithOpenCustodies.map((emp) => (
                            <EmployeeCard
                                className="bg-red-100"
                                key={emp.id}
                                employee={emp}
                                onClick={() => setSelectedEmployee(emp)}
                            />
                        ))}
                    </div>
                )}
                {/* Employees Grid */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredEmployeesWithClosedCustodies.map((emp) => (
                        <EmployeeCard
                            className="bg-green-100"
                            key={emp.id}
                            employee={emp}
                            onClick={() => setSelectedEmployee(emp)}
                        />
                    ))}
                </div>

                <EmployeeDrawer
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                />
            </div>
        </AuthenticatedLayout>
    );
}
