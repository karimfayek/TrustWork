import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteButton from "@/Components/DeleteButton";
export default function Index() {
    const { holidays, flash } = usePage().props;

    const deleteHoliday = (id) => {
        if (confirm("هل أنت متأكد من الحذف؟")) {
            router.delete(route("holidays.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-white rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">الإجازات الرسمية</h1>
                    <Link
                        href={route("holidays.create")}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        + إضافة إجازة
                    </Link>
                </div>

                {flash.success && (
                    <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                        {flash.success}
                    </div>
                )}

                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">#</th>
                            <th className="border p-2">اسم الإجازة</th>
                            <th className="border p-2">التاريخ</th>
                            <th className="border p-2">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holidays.map((holiday, index) => (
                            <tr key={holiday.id}>
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{holiday.title}</td>
                                <td className="border p-2">{holiday.date}</td>
                                <td className="border p-2">
                                    <Link
                                        href={route(
                                            "holidays.edit",
                                            holiday.id,
                                        )}
                                        className="text-blue-600 hover:underline mr-2  p-2 rounded"
                                    >
                                        تعديل
                                    </Link>

                                    <DeleteButton
                                        id={holiday.id}
                                        routeName={"holidays.delete"}
                                    />
                                </td>
                            </tr>
                        ))}
                        {holidays.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center p-4">
                                    لا توجد إجازات بعد
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
