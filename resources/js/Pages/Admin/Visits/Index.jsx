import React from "react";
import { useForm, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import axios from "axios";
export default function AdminVisits({ visits, customers }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [visitsClone, setVisitsClone] = useState(visits);
    //define this month
    const thisMonth = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();
    const [month, setMonth] = useState(thisMonth);
    const [customer, setCustomer] = useState(null);
    const [year, setYear] = useState(thisYear);
    const [actionType, setActionType] = useState(null);

    const openTransaction = (item, type) => {
        setCustomer(item);
        const visits = visitsClone.filter(
            (visit) => visit.customer_id === item.id,
        );
        //setSelectedItem(visits);
        setActionType(type);
        console.log(visits);
        axios
            .post(route("admin.visit.details", [item.id, month, year]))
            .then((response) => {
                setSelectedItem(response.data[0].visits);
                console.log(selectedItem, "selectedItem");
            });
    };
    const handleClose = () => {
        setSelectedItem(null);
        setActionType(null);
        setCustomer(null);
        setMonth(thisMonth);
        setYear(thisYear);
    };
    useEffect(() => {
        if (selectedItem) {
            console.log(selectedItem, "selectedItem");
            axios
                .post(route("admin.visit.details", [customer.id, month, year]))
                .then((response) => {
                    setSelectedItem(response.data[0].visits);
                    console.log(selectedItem, "selectedItem");
                });
        }
    }, [month, year]);
    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {" "}
                        العملاء
                    </h1>
                </div>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3 ">اسم العميل</th>
                                <th className="px-6 py-3 ">عدد الزيارات</th>
                                <th className="px-6 py-3 ">
                                    {" "}
                                    عدد ما تم زيارات هذا لشهر
                                </th>
                                <th className="px-6 py-3 ">- </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {customers.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        {customer.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {customer.visits_nu}
                                    </td>
                                    <td className="px-6 py-4">
                                        {customer.visits?.length}
                                    </td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                        <button
                                            onClick={() =>
                                                openTransaction(customer, "out")
                                            }
                                            className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            عرض الزيارات
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* مودال العملية */}
                    {selectedItem && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex  justify-center z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <button
                                onClick={() => handleClose()}
                                className="absolute top-4 left-4"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className="bg-white rounded shadow-lg p-6 w-full">
                                <div className="flex gap-2 items-center mb-4">
                                    <h2 className="text-xl font-bold">
                                        زيارات العميل {customer?.name}
                                    </h2>
                                    <select
                                        className="border border-gray-300 rounded-md p-2 w-28"
                                        onChange={(e) => {
                                            setMonth(e.target.value);
                                        }}
                                        value={month}
                                    >
                                        <option value="1">يناير</option>
                                        <option value="2">فبراير</option>
                                        <option value="3">مارس</option>
                                        <option value="4">أبريل</option>
                                        <option value="5">مايو</option>
                                        <option value="6">يونيو</option>
                                        <option value="7">يوليو</option>
                                        <option value="8">أغسطس</option>
                                        <option value="9">سبتمبر</option>
                                        <option value="10">أكتوبر</option>
                                        <option value="11">نوفمبر</option>
                                        <option value="12">ديسمبر</option>
                                    </select>
                                    <select
                                        className="border border-gray-300 rounded-md p-2 w-24"
                                        onChange={(e) => {
                                            setYear(e.target.value);
                                        }}
                                        value={year}
                                    >
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                    </select>
                                </div>

                                <Visits visits={selectedItem} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
export const Visits = ({ visits }) => {
    const handleDeleteVisit = (e, id) => {
        e.preventDefault();

        const confirmed = window.confirm("هل أنت متأكد أنك تريد الحذف  ");

        if (!confirmed) return;

        router.post(
            route("admin.visit.delete"),
            { id },
            {
                preserveScroll: true,
            },
        );
    };
    return (
        <div
            className="overflow-x-auto bg-white rounded-lg shadow"
            onClick={(e) => e.stopPropagation()}
        >
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700">
                    <tr className="text-right">
                        <th className="px-6 py-3 ">العميل </th>
                        <th className="px-6 py-3 ">تسجيل الحضور</th>
                        <th className="px-6 py-3 ">الانصراف</th>
                        <th className="px-6 py-3 ">ملاحظات </th>
                        <th className="px-6 py-3 "> بواسطة</th>
                        <th className="px-6 py-3 ">- </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {visits.map((visit) => (
                        <tr key={visit.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                {visit.customer?.name}
                            </td>
                            <td className="px-6 py-4">
                                {visit.attendance?.check_in_time}
                            </td>
                            <td className="px-6 py-4">
                                {visit.attendance?.check_out_time}
                            </td>
                            <td className="px-6 py-4  max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                                {visit.notes}
                            </td>
                            <td className="px-6 py-4">{visit.user?.name}</td>
                            <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                <Link
                                    href={route("admin.visits.show", visit.id)}
                                    className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                >
                                    عرض
                                </Link>

                                <button
                                    onClick={(e) =>
                                        handleDeleteVisit(e, visit.id)
                                    }
                                    className="inline-block bg-red-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                >
                                    مسح
                                </button>
                            </td>
                        </tr>
                    ))}
                    {visits.length === 0 && (
                        <tr>
                            <td colSpan="6" className="px-6 py-4 text-center">
                                لا توجد زيارات
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
