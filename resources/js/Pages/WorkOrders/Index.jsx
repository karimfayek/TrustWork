// resources/js/Pages/WorkOrders/Index.jsx
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import AssignModal from "./AssignModal";
import DetailsModal from "./DetailsModal";
export default function Index({ workOrders, employees }) {
    const logedinUser = usePage().props.auth.user;
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [detailsOrder, setDetailsOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const {
        data: assignData,
        setData: setAssignData,
        post: assignPost,
        processing: assignProcessing,
    } = useForm({
        employees: [],
    });

    function openAssignModal(order) {
        setSelectedOrder(order);
        setShowModal(true);
    }
    function handleDetailsShow(order) {
        setDetailsOrder(order);
        setShowDetailsModal(true);
    }

    function toggleEmployee(id) {
        if (assignData.employees.includes(id)) {
            setAssignData(
                "employees",
                assignData.employees.filter((e) => e !== id),
            );
        } else {
            setAssignData("employees", [...assignData.employees, id]);
        }
    }

    function assignSubmit() {
        assignPost(route("work-orders.assign", selectedOrder.id), {
            onSuccess: () => {
                setShowModal(false);
                setAssignData("employees", []);
            },
        });
    }

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
                                <th className="p-2 text-right">التاريخ</th>
                                <th className="p-2 text-right">طلب</th>
                                <th className="p-2 text-right">الحالة</th>
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

                                    <td className="p-2">
                                        {new Date(
                                            order.created_at,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="p-2">
                                        {order.creator?.name}
                                    </td>
                                    <td className="p-2">
                                        <span
                                            className={`
    px-3 py-1 rounded text-white
    ${order.status === "pending" && "bg-yellow-500"}
    ${order.status === "assigned" && "bg-blue-500"}
    ${order.status === "completed" && "bg-green-600"}
`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
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
                                        {["operator", "admin"].some((role) =>
                                            logedinUser?.rolesnames?.includes(
                                                role,
                                            ),
                                        ) && (
                                            <>
                                                {order.status !==
                                                    "completed" && (
                                                    <>
                                                        <Link
                                                            href={route(
                                                                "work-orders.complete",
                                                                order.id,
                                                            )}
                                                            method="post"
                                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                                        >
                                                            تم الانتهاء
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                openAssignModal(
                                                                    order,
                                                                )
                                                            }
                                                            className="bg-blue-600 hover:bg-blue-700 mx-2 px-4 py-2 rounded text-white"
                                                        >
                                                            إسناد
                                                        </button>
                                                    </>
                                                )}
                                            </>
                                        )}
                                        <button
                                            onClick={() =>
                                                handleDetailsShow(order)
                                            }
                                            className="bg-blue-600 hover:bg-blue-700 mx-2 px-4 py-2 rounded text-white"
                                        >
                                            تفاصيل
                                        </button>
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
            <AssignModal
                showModal={showModal}
                setShowModal={setShowModal}
                employees={employees}
                toggleEmployee={toggleEmployee}
                submit={assignSubmit}
                processing={processing}
            />
            <DetailsModal
                showModal={showDetailsModal}
                setShowModal={setShowDetailsModal}
                order={detailsOrder}
            />
        </UserLayout>
    );
}
