// resources/js/Pages/WorkOrders/Index.jsx
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import AssignModal from "./AssignModal";
import DetailsModal from "./DetailsModal";
import CompleteModal from "./CompleteModal";
import AssignDateModal from "./AssignDateModal";
import EditModal from "./EditModal";
export default function Index({ workOrders, employees, customers }) {
    const logedinUser = usePage().props.auth.user;
    const [open, setOpen] = useState(false);
    const [copyCustomers, setCopyCustomers] = useState(customers);
    const [assignDateModal, setAssignDateModal] = useState(false);
    const [assignDate, setAssignDate] = useState(
        new Date().toISOString().split("T")[0],
    );
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [detailsOrder, setDetailsOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [completeModal, setCompleteModal] = useState(false);
    const [completeFile, setCompleteFile] = useState(null);
    const [completeOrderData, setCompleteOrderData] = useState(
        new Date().toISOString().split("T")[0],
    );
    const {
        data: assignData,
        setData: setAssignData,
        post: assignPost,
        processing: assignProcessing,
    } = useForm({
        employees: [],
        assign_date: "",
    });
    const priority = {
        1: "عاجل",
        2: "متوسط",
        3: "منخفض",
    };
    function openAssignModal(order) {
        setSelectedOrder(order);
        setShowModal(true);
    }
    function openAssignDateModal(order) {
        setSelectedOrder(order);
        setAssignDateModal(true);
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
    function assignDateSubmit() {
        router.post(
            route("work-orders.assign-date", selectedOrder.id),
            {
                assign_date: assignDate,
            },
            {
                onSuccess: () => {
                    setAssignDateModal(false);
                    setAssignDate("");
                },
            },
        );
    }
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

    function submit(e) {
        e.preventDefault();
        post(route("work-orders.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
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
    useEffect(() => {
        if (data.customer_id) {
            const customer = customers.find((c) => c.id == data.customer_id);
            setData("client_name", customer.name);
            setData("client_phone", customer.phone);
            setData("client_address", customer.address);
        }
    }, [data.customer_id]);
    const [sortConfig, setSortConfig] = useState({
        key: "",
        direction: "desc",
    });
    function handleSort(key) {
        let direction = "desc";

        if (sortConfig.key === key && sortConfig.direction === "desc") {
            direction = "asc";
        }

        setSortConfig({ key, direction });
    }
    const [showCompleted, setShowCompleted] = useState(false);
    const pendingOrders = workOrders.filter(
        (order) => order.status !== "completed" || showCompleted,
    );
    const sortedOrders = [...pendingOrders].sort((a, b) => {
        if (!sortConfig.key) return 0;

        let aValue;
        let bValue;

        // 🔹 حالة employees
        if (sortConfig.key === "employees") {
            aValue = a.employees.map((emp) => emp.name).join(", ");
            bValue = b.employees.map((emp) => emp.name).join(", ");
        }
        // 🔹 التواريخ
        else if (
            sortConfig.key === "created_at" ||
            sortConfig.key === "assign_date"
        ) {
            aValue = new Date(a[sortConfig.key] || 0);
            bValue = new Date(b[sortConfig.key] || 0);
        }
        // 🔹 باقي القيم
        else {
            aValue = a[sortConfig.key] ?? "";
            bValue = b[sortConfig.key] ?? "";
        }

        // أرقام
        if (typeof aValue === "number" && typeof bValue === "number") {
            return sortConfig.direction === "asc"
                ? aValue - bValue
                : bValue - aValue;
        }

        // نصوص
        return sortConfig.direction === "asc"
            ? String(aValue).localeCompare(String(bValue), "ar")
            : String(bValue).localeCompare(String(aValue), "ar");
    });
    const [editModal, setEditModal] = useState(false);
    const handleEdit = (id) => {
        const order = workOrders.find((order) => order.id === id);

        if (!order) return;

        setSelectedOrder(id);

        setEditData({
            client_name: order.client_name || "",
            client_phone: order.client_phone || "",
            client_address: order.client_address || "",
            description: order.description || "",
            priority: order.priority || "",
        });

        setEditModal(true);
    };
    const {
        data: editData,
        setData: setEditData,
        post: editPost,
        processing: editProcessing,
        reset: editReset,
        errors: editErrors,
    } = useForm({
        client_name: "",
        client_phone: "",
        client_address: "",
        description: "",
        priority: "3",
    });
    function editSubmit() {
        console.log(selectedOrder);
        editPost(route("work-orders.update", selectedOrder), {
            onSuccess: () => {
                setEditModal(false);
                editReset();
            },
        });
    }
    return (
        <UserLayout>
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">طلبات أوامر الشغل</h1>
                    <div>
                        <button
                            onClick={() => setShowCompleted(!showCompleted)}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            {showCompleted
                                ? "إخفاء الأوامر المكتملة"
                                : "إظهار الأوامر المكتملة"}
                        </button>
                    </div>
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
                        <thead className="bg-white">
                            <tr>
                                <th
                                    onClick={() => handleSort("client_name")}
                                    className="p-2 text-right cursor-pointer"
                                >
                                    العميل
                                    {sortConfig.key === "client_name" &&
                                        (sortConfig.direction === "asc"
                                            ? " ↑"
                                            : " ↓")}
                                </th>
                                <th
                                    onClick={() => handleSort("client_phone")}
                                    className="p-2 text-right cursor-pointer"
                                >
                                    الهاتف
                                    {sortConfig.key === "client_phone" &&
                                        (sortConfig.direction === "asc"
                                            ? " ↑"
                                            : " ↓")}
                                </th>
                                <th
                                    onClick={() => handleSort("client_address")}
                                    className="p-2 text-right cursor-pointer"
                                >
                                    العنوان
                                    {sortConfig.key === "client_address" &&
                                        (sortConfig.direction === "asc"
                                            ? " ↑"
                                            : " ↓")}
                                </th>
                                <th
                                    onClick={() => handleSort("created_at")}
                                    className="p-2 text-right cursor-pointer"
                                >
                                    تاريخ الطلب
                                    {sortConfig.key === "created_at" &&
                                        (sortConfig.direction === "asc"
                                            ? " ↑"
                                            : " ↓")}
                                </th>
                                <th
                                    onClick={() => handleSort("assign_date")}
                                    className="p-2 text-right cursor-pointer"
                                >
                                    تاريخ التنفيذ
                                    {sortConfig.key === "assign_date" &&
                                        (sortConfig.direction === "asc"
                                            ? " ↑"
                                            : " ↓")}
                                </th>
                                <th
                                    onClick={() => handleSort("creator_id")}
                                    className="p-2 text-right cursor-pointer"
                                >
                                    طلب
                                    {sortConfig.key === "creator_id" &&
                                        (sortConfig.direction === "asc"
                                            ? " ↑"
                                            : " ↓")}
                                </th>
                                <th
                                    onClick={() => handleSort("status")}
                                    className="p-2 text-right cursor-pointer"
                                >
                                    الحالة
                                    {sortConfig.key === "status" &&
                                        (sortConfig.direction === "asc"
                                            ? " ↑"
                                            : " ↓")}
                                </th>
                                <th
                                    onClick={() => handleSort("priority")}
                                    className="p-2 text-right cursor-pointer"
                                >
                                    الأولوية
                                    {sortConfig.key === "priority" &&
                                        (sortConfig.direction === "asc"
                                            ? " ↑"
                                            : " ↓")}
                                </th>
                                <th
                                    onClick={() => handleSort("employees")}
                                    className="p-2 text-right cursor-pointer"
                                >
                                    تم تعيينه
                                    {sortConfig.key === "employees" &&
                                        (sortConfig.direction === "asc"
                                            ? " ↑"
                                            : " ↓")}
                                </th>
                                <th className="p-2 text-right">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className={`border-t cursor-pointer hover:bg-gray-100 ${order.status === "completed" && "bg-green-100 text-black hover:bg-green-200"} ${order.assign_date < new Date().toISOString().split("T")[0] && order.status !== "completed" && "bg-red-100 text-black hover:bg-red-200"} ${order.assign_date === null && order.status !== "completed" && "bg-yellow-100 text-black hover:bg-yellow-200"}`}
                                    onClick={() => handleEdit(order.id)}
                                >
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
                                        {order.assign_date
                                            ? new Date(
                                                  order.assign_date,
                                              ).toLocaleDateString()
                                            : "لم يتم التعيين"}
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
                                    <td className="flex gap-1 mt-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDetailsShow(order);
                                            }}
                                            className="mb-2 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            تفاصيل
                                        </button>
                                        {["operator", "admin"].some((role) =>
                                            logedinUser?.rolesnames?.includes(
                                                role,
                                            ),
                                        ) && (
                                            <>
                                                {order.status !==
                                                    "completed" && (
                                                    <>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openAssignDateModal(
                                                                    order,
                                                                );
                                                            }}
                                                            className="mb-2 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                                        >
                                                            تاريخ التنفيذ
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openAssignModal(
                                                                    order,
                                                                );
                                                            }}
                                                            className="mb-2 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                                        >
                                                            إسناد
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                completeOrder(
                                                                    order.id,
                                                                );
                                                            }}
                                                            className="mb-2 inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                                        >
                                                            تم الانتهاء
                                                        </button>
                                                    </>
                                                )}
                                            </>
                                        )}

                                        <Link
                                            href={route(
                                                "work-orders.destroy",
                                                order.id,
                                            )}
                                            method="delete"
                                            className="mb-2 inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-medium"
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
                        <div className="bg-white w-full max-w-lg rounded shadow p-6 overflow-y-auto max-h-[90vh]">
                            <h2 className="text-lg font-bold mb-4">
                                طلب أمر شغل
                            </h2>

                            <form onSubmit={submit} className="space-y-3">
                                <label
                                    className="block mt-2 text-sm text-blue-800"
                                    htmlFor="customer_id"
                                >
                                    العميل
                                </label>
                                <select
                                    className="w-full border rounded p-2"
                                    value={data.customer_id}
                                    onChange={(e) =>
                                        setData("customer_id", e.target.value)
                                    }
                                >
                                    <option value="">اختر العميل</option>
                                    {copyCustomers.map((customer) => (
                                        <option
                                            key={customer.id}
                                            value={customer.id}
                                        >
                                            {customer.name}
                                        </option>
                                    ))}
                                </select>
                                <label
                                    className="block mt-2 text-sm text-blue-800"
                                    htmlFor="client_name"
                                >
                                    اسم العميل
                                </label>
                                <input
                                    className="w-full border rounded p-2"
                                    placeholder="اسم العميل"
                                    value={data.client_name}
                                    onChange={(e) =>
                                        setData("client_name", e.target.value)
                                    }
                                />
                                <label
                                    className="block mt-2 text-sm text-blue-800"
                                    htmlFor="priority"
                                >
                                    الأولوية
                                </label>
                                <select
                                    className="w-full border rounded p-2"
                                    value={data.priority}
                                    onChange={(e) =>
                                        setData("priority", e.target.value)
                                    }
                                >
                                    <option value="1">عاجل</option>
                                    <option value="2">متوسط</option>
                                    <option value="3">عادي</option>
                                </select>
                                {errors.client_name && (
                                    <p className="text-red-500">
                                        {errors.client_name}
                                    </p>
                                )}
                                <label
                                    className="block mt-2 text-sm text-blue-800"
                                    htmlFor="client_phone"
                                >
                                    رقم الهاتف
                                </label>
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
                                <label
                                    className="block mt-2 text-sm text-blue-800"
                                    htmlFor="client_address"
                                >
                                    العنوان
                                </label>
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
                                <label
                                    className="block mt-2 text-sm text-blue-800"
                                    htmlFor="description"
                                >
                                    الوصف
                                </label>
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
                assignData={assignData}
                setAssignData={setAssignData}
                submit={assignSubmit}
                processing={processing}
            />
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
            <AssignDateModal
                showModal={assignDateModal}
                setShowModal={setAssignDateModal}
                assignDate={assignDate}
                setAssignDate={setAssignDate}
                assignDateSubmit={assignDateSubmit}
            />
            <EditModal
                showModal={editModal}
                editData={editData}
                setEditData={setEditData}
                setShowModal={setEditModal}
                submit={editSubmit}
                processing={processing}
                editErrors={editErrors}
            />
        </UserLayout>
    );
}
