import UserLayout from "@/Layouts/UserLayout";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import DetailsModal from "./DetailsModal";
import CompleteModal from "./CompleteModal";
export default function EmployeeIndex({ workOrders }) {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [detailsOrder, setDetailsOrder] = useState(null);
    const [completeModal, setCompleteModal] = useState(false);
    const [completeFile, setCompleteFile] = useState(null);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [completeOrderData, setCompleteOrderData] = useState(
        new Date().toISOString().split("T")[0],
    );
    const priority = {
        1: "عاجل",
        2: "متوسط",
        3: "منخفض",
    };
    const { data, setData, post, processing, reset, errors } = useForm({
        client_name: "",
        client_phone: "",
        client_address: "",
        description: "",
        priority: "3",
        file: "",
        customer_id: "",
        assign_date: "",
    });
    function handleDetailsShow(order) {
        setDetailsOrder(order);
        setShowDetailsModal(true);
        console.log(order);
    }
    function completeOrder(id) {
        setCompleteModal(true);
        setSelectedOrder(id);
    }
    function completeSubmit() {
        const formData = new FormData();
        formData.append("file", completeFile);
        formData.append("date", completeOrderData);
        router.post(
            route("work-orders.complete", selectedOrder),
            { completeFile, completeOrderData },
            {
                onSuccess: () => {
                    setCompleteModal(false);
                },
            },
        );
    }
    return (
        <UserLayout>
            <div className="flex justify-between items-center mb-4 p-4">
                <h1 className="text-xl font-bold"> أوامر الشغل</h1>
            </div>

            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-right cursor-pointer">
                                العميل
                            </th>
                            <th className="p-2 text-right cursor-pointer">
                                الهاتف
                            </th>
                            <th className="p-2 text-right cursor-pointer">
                                العنوان
                            </th>
                            <th className="p-2 text-right cursor-pointer">
                                تاريخ الطلب
                            </th>
                            <th className="p-2 text-right cursor-pointer">
                                تاريخ التنفيذ
                            </th>
                            <th className="p-2 text-right cursor-pointer">
                                طلب
                            </th>
                            <th className="p-2 text-right cursor-pointer">
                                الحالة
                            </th>
                            <th className="p-2 text-right cursor-pointer">
                                الأولوية
                            </th>
                            <th className="p-2 text-right cursor-pointer">
                                تم تعيينه
                            </th>
                            <th className="p-2 text-right">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workOrders.map((order) => (
                            <tr
                                key={order.id}
                                className="border-t cursor-pointer hover:bg-gray-100"
                                onClick={() => handleEdit(order.id)}
                            >
                                <td className="p-2">{order.client_name}</td>
                                <td className="p-2">{order.client_phone}</td>
                                <td className="p-2">{order.client_address}</td>

                                <td className="p-2">
                                    {new Date(
                                        order.created_at,
                                    ).toLocaleDateString()}
                                </td>
                                <td className="p-2">
                                    {order.assign_date
                                        ? new Date(
                                              order.assign_date,
                                          ).toLocaleDateString()
                                        : "لم يتم التعيين"}
                                </td>
                                <td className="p-2">{order.creator?.name}</td>
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
                                    <span
                                        className={`
    px-3 py-1 rounded text-white
    ${order.priority === 1 && "bg-red-500"}
    ${order.priority === 2 && "bg-yellow-500"}
    ${order.priority === 3 && "bg-green-600"}
`}
                                    >
                                        {priority[order.priority]}
                                    </span>
                                </td>
                                <td className="p-2">
                                    {order.employees
                                        .map((emp) => emp.name)
                                        .join(", ")}
                                </td>
                                <td className="flex gap-1 p-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDetailsShow(order);
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 mx-2 px-4 py-2 rounded text-white"
                                    >
                                        تفاصيل
                                    </button>

                                    {order.status !== "completed" && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    completeOrder(order.id);
                                                }}
                                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                            >
                                                تم الانتهاء
                                            </button>
                                        </>
                                    )}
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
            <DetailsModal
                showModal={showDetailsModal}
                setShowModal={setShowDetailsModal}
                order={detailsOrder}
            />
            <CompleteModal
                showModal={completeModal}
                setShowModal={setCompleteModal}
                order={selectedOrder}
                submit={completeSubmit}
                setCompleteOrderData={setCompleteOrderData}
                processing={processing}
                completeOrderData={completeOrderData}
                setCompleteFile={setCompleteFile}
            />
        </UserLayout>
    );
}
