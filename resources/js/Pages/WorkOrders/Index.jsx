// resources/js/Pages/WorkOrders/Index.jsx
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";

export default function Index({ workOrders }) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        client_name: "",
        client_phone: "",
        client_address: "",
        description: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("work-orders.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    }

    return (
        <UserLayout>
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">طلبات أوامر الشغل</h1>
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        ➕ طلب جديد
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 text-right">العميل</th>
                                <th className="p-2 text-right">الهاتف</th>
                                <th className="p-2 text-right">العنوان</th>
                                <th className="p-2 text-right">التفاصيل</th>
                                <th className="p-2 text-right">التاريخ</th>
                                <th className="p-2 text-right">الموظف</th>
                                <th className="p-2 text-right">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workOrders.map((order) => (
                                <tr key={order.id} className="border-t">
                                    <td className="p-2">{order.client_name}</td>
                                    <td className="p-2">
                                        {order.client_phone}
                                    </td>
                                    <td className="p-2">
                                        {order.client_address}
                                    </td>
                                    <td className="p-2">{order.description}</td>
                                    <td className="p-2">
                                        {new Date(
                                            order.created_at,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="p-2">{order.user?.name}</td>
                                    <td className="p-2">
                                        <Link
                                            href={route(
                                                "work-orders.destroy",
                                                order.id,
                                            )}
                                            method="delete"
                                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                        >
                                            مسح
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {!workOrders.length && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-4 text-center text-gray-500"
                                    >
                                        لا توجد طلبات
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {open && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white w-full max-w-lg rounded shadow p-6">
                            <h2 className="text-lg font-bold mb-4">
                                طلب أمر شغل
                            </h2>

                            <form onSubmit={submit} className="space-y-3">
                                <input
                                    className="w-full border rounded p-2"
                                    placeholder="اسم العميل"
                                    value={data.client_name}
                                    onChange={(e) =>
                                        setData("client_name", e.target.value)
                                    }
                                />
                                {errors.client_name && (
                                    <p className="text-red-500">
                                        {errors.client_name}
                                    </p>
                                )}
                                <input
                                    className="w-full border rounded p-2"
                                    placeholder="رقم الهاتف"
                                    value={data.client_phone}
                                    onChange={(e) =>
                                        setData("client_phone", e.target.value)
                                    }
                                />
                                {errors.client_phone && (
                                    <p className="text-red-500">
                                        {errors.client_phone}
                                    </p>
                                )}
                                <input
                                    className="w-full border rounded p-2"
                                    placeholder="العنوان"
                                    value={data.client_address}
                                    onChange={(e) =>
                                        setData(
                                            "client_address",
                                            e.target.value,
                                        )
                                    }
                                />
                                {errors.client_address && (
                                    <p className="text-red-500">
                                        {errors.client_address}
                                    </p>
                                )}
                                <textarea
                                    className="w-full border rounded p-2"
                                    rows="3"
                                    placeholder="زيارة / معاينة / تفاصيل"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                {errors.description && (
                                    <p className="text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-2 border rounded"
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        disabled={processing}
                                        className="bg-green-600 text-white px-4 py-2 rounded"
                                    >
                                        ✅ تأكيد
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
