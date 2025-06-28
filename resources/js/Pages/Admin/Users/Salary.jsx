import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import SalaryCalculator from "./Partials/SalaryCalculator";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EditUser({ user }) {
    const {
        acceptedAdvances,
        totalAdvance,
        totalExpense,
        remaining,
    } = usePage().props;
    return (
        <AuthenticatedLayout>
        <Head title=" تقرير راتب موظف" />

        <div className=" px-6 py-8 bg-white rounded shadow">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
               تقرير راتب موظف
            </h1>
            <button
                onClick={() => window.print()}
                className="block mx-auto mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 print:hidden"
            >
                طباعة التقرير
            </button>
            <SalaryCalculator
                user={user}
                acceptedAdvances={acceptedAdvances}
                totalAdvance={totalAdvance}
                totalExpense={totalExpense}
                remaining={remaining}
            />
            </div>
            </AuthenticatedLayout>
    )
}