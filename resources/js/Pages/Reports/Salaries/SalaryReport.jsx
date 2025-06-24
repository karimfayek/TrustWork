import SalaryCalculator from '@/Pages/Admin/Users/Partials/SalaryCalculator';
import React from 'react';
import ReportLayout from '../ReportLayout';
export default function EmployeeReport({ users }) {
    console.log(users, 'empl')

    return (
        <ReportLayout>

            {users.map(
                (user) => (
                    <SalaryCalculator
                        key={user.id}
                        user={user}
                        acceptedAdvances={user.acceptedAdvances}
                        totalAdvance={user.totalAdvance}
                        totalExpense={user.totalExpense}
                        remaining={user.remaining}
                    />
                ))}

        </ReportLayout>
    );
}
