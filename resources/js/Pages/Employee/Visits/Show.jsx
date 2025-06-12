import React, { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function ShowVisit() {
    const { visit } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState('');
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const currentLocation = await getLocation();
        const formData = new FormData();
        formData.append('notes', notes);
        formData.append('location', `${currentLocation.latitude},${currentLocation.longitude}`);
        if (report) formData.append('report', report);

       
        try {
            const response = await axios.post(route('visits.update' , visit.id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response)
            if(response.data.success){
                setVisitEnded(true)
                window.location.href = response.data.redirect;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mt-8 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">تفاصيل الزيارة</h1>

            <div className="space-y-4">
                <div>
                    <span className="font-semibold text-gray-600">اسم العميل:</span>
                    <span className="ml-2 text-gray-800">{visit.customer.name}</span>
                </div>

                <div>
                    <span className="font-semibold text-gray-600">وقت الحضور:</span>
                    <span className="ml-2 text-blue-600">
                        {visit.check_in ? dayjs(visit.check_in).format('YYYY-MM-DD HH:mm') : 'لم يتم بعد'}
                    </span>
                </div>

                <div>
                    <span className="font-semibold text-gray-600">وقت الانصراف:</span>
                    <span className="ml-2 text-green-600">
                        {visit.check_out ? dayjs(visit.check_out).format('YYYY-MM-DD HH:mm') : 'لم يتم بعد'}
                    </span>
                </div>

                {visit.notes && (
                    <div>
                        <span className="font-semibold text-gray-600">ملاحظات:</span>
                        <p className="mt-1 text-gray-700">{visit.notes}</p>
                    </div>
                )}

                {visit.check_out && visit.report_path && (
                    <div>
                        <span className="font-semibold text-gray-600">تقرير الزيارة:</span>
                        <div className="mt-2">
                            <img
                                src={`/storage/${visit.report_path}`}
                                alt="تقرير الزيارة"
                                className="max-w-xs border rounded shadow"
                            />
                        </div>
                    </div>
                )}

                {!visit.check_out && (
                    <div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            إنهاء الزيارة
                        </button>
                    </div>
                )}

                {visit.check_out && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
                        تم إنهاء الزيارة بنجاح
                    </div>
                )}
            </div>

            <div className="mt-6">
                <Link
                    href={route('visits.index')}
                    className="text-sm text-blue-600 hover:underline"
                >
                    ← العودة إلى قائمة الزيارات
                </Link>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
                        <h2 className="text-lg font-bold mb-4">إنهاء الزيارة</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    ملاحظات
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
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
                                    onChange={(e) => setReport(e.target.files[0])}
                                    className="mt-1 block w-full text-sm text-gray-600"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    {loading ? 'جارٍ الإرسال...' : 'إنهاء الزيارة'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
