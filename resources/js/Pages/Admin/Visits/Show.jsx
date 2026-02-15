import React, { useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import dayjs from "dayjs";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function ShowVisit() {
    const { visit } = usePage().props;

    const [showEditModal, setShowEditModal] = useState(false);
    const [editNotes, setEditNotes] = useState(visit.notes || "");
    const [editReport, setEditReport] = useState(null);
    const [loading, setLoading] = useState(false);

    const [visitEnded, setVisitEnded] = useState(false);
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("notes", editNotes);
        if (editReport) formData.append("report", editReport);

        try {
            const response = await axios.post(
                route("visits.edit", visit.id),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            console.log(response);
            if (response.data.status === 200) {
                setVisitEnded(true);
                window.location.reload;
            }
        } catch (error) {
            alert(error.response.data.message);
            console.error(error);
            setLoading(false);
        }
        //setLoading(false);
        window.location.reload();
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mt-8 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    تفاصيل الزيارة
                </h1>

                <div className="space-y-4">
                    <div>
                        <span className="font-semibold text-gray-600">
                            اسم العميل:
                        </span>
                        <span className="ml-2 text-gray-800">
                            {visit.customer.name}
                        </span>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-600">
                            وقت الحضور:
                        </span>
                        <span className="ml-2 text-blue-600">
                            {visit.attendance?.check_in_time
                                ? dayjs(visit.attendance?.check_in_time).format(
                                      "YYYY-MM-DD HH:mm",
                                  )
                                : "لم يتم بعد"}
                        </span>
                        <span className="font-semibold text-gray-600">
                            موقع الحضور:
                        </span>
                        <span className="ml-2 text-blue-600">
                            <a
                                href={
                                    "https://www.google.com/maps?q=" +
                                    visit.attendance?.in_location
                                }
                                target="_blank"
                                className="text-blue-600 underline"
                            >
                                عرض
                            </a>
                        </span>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-600">
                            وقت الانصراف:
                        </span>
                        <span className="ml-2 text-green-600">
                            {visit.attendance?.check_out_time
                                ? dayjs(
                                      visit.attendance?.check_out_time,
                                  ).format("YYYY-MM-DD HH:mm")
                                : "لم يتم بعد"}
                        </span>
                        {visit.attendance?.check_out_time && (
                            <>
                                <span className="font-semibold text-gray-600">
                                    موقع الانصراف:
                                </span>
                                <span className="ml-2 text-blue-600">
                                    <a
                                        href={
                                            "https://www.google.com/maps?q=" +
                                            visit.attendance?.out_location
                                        }
                                        target="_blank"
                                        className="text-blue-600 underline"
                                    >
                                        عرض
                                    </a>
                                </span>
                            </>
                        )}
                    </div>

                    {visit.notes && (
                        <div>
                            <span className="font-semibold text-gray-600">
                                ملاحظات:
                            </span>
                            <p className="mt-1 text-gray-700">{visit.notes}</p>
                        </div>
                    )}

                    {visit.attendance?.check_out_time && visit.report_path && (
                        <div>
                            <span className="font-semibold text-gray-600">
                                تقرير الزيارة:
                            </span>
                            <div className="mt-2">
                                <a
                                    href={`/storage/${visit.report_path}`}
                                    target="_blank"
                                >
                                    <img
                                        src={`/storage/${visit.report_path}`}
                                        alt="تقرير الزيارة"
                                        className="max-w-xs border rounded shadow"
                                    />
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-6">
                    <Link
                        href={route("admin.visits.index")}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        ← العودة إلى قائمة الزيارات
                    </Link>
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="hover:bg-red-700 py-2 text-blue-800 transition"
                    >
                        تعديل الزيارة
                    </button>
                </div>
            </div>
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
                        <h2 className="text-lg font-bold mb-4">
                            تعديل الزيارة
                        </h2>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    ملاحظات
                                </label>
                                <textarea
                                    value={editNotes}
                                    onChange={(e) =>
                                        setEditNotes(e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    rows={3}
                                    placeholder="أدخل أي ملاحظات عن الزيارة"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    تقرير الزيارة (صورة)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setEditReport(e.target.files[0])
                                    }
                                    className="mt-1 block w-full text-sm text-gray-600"
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    {loading
                                        ? "جارٍ الإرسال..."
                                        : "تعديل الزيارة"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
