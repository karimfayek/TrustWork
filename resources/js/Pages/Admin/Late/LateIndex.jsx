import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteButton from "@/Components/DeleteButton";
export default function LateIndex() {
    const { flash, users } = usePage().props;
    const { user } = usePage().props.auth;
    const [lateAttendances, setLateAttendances] = useState([]);
    const [filters, setFilters] = useState({
        from: new Date().toISOString().split("T")[0],
        to: new Date().toISOString().split("T")[0],
        user_id: "",
    });
    const [selectedUser, setSelectedUser] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [discountType, setDiscountType] = useState("");
    const cancelDeduct = (id) => {
        axios
            .post(route("admin.lateAttendances.cancelDeduct", { id: id }))
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLateAttendances((prev) => {
                    const newData = { ...prev };

                    Object.keys(newData).forEach((date) => {
                        newData[date] = newData[date].map((att) =>
                            att.id === id
                                ? { ...att, late_deduct_type: null }
                                : att,
                        );
                    });

                    return newData;
                });
            });
    };
    const openModal = (row) => {
        setSelectedRow(row);
        setDiscountType("");
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedRow(null);
    };

    const handleSave = () => {
        console.log("Row:", selectedRow);
        console.log("Discount:", discountType);
        // هنا ترسل البيانات للباك اند بالـ axios
        axios
            .post(
                route("admin.lateAttendances.updateDeduct", {
                    id: selectedRow.id,
                }),
                {
                    late_deduct_type: discountType,
                },
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLateAttendances((prev) => {
                    const newData = { ...prev };

                    Object.keys(newData).forEach((date) => {
                        newData[date] = newData[date].map((att) =>
                            att.id === selectedRow.id
                                ? { ...att, late_deduct_type: discountType }
                                : att,
                        );
                    });

                    return newData;
                });
            });
        closeModal();
    };
    const getLateAttendances = (e) => {
        e.preventDefault();
        axios
            .get(
                route("admin.lateAttendances.getLateAttendances", {
                    id: filters.user_id || 9999,
                    from: filters.from,
                    to: filters.to,
                }),
            )
            .then((response) => {
                setLateAttendances(response.data);
                console.log(response.data);
            });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-white rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold"> التأخيرات</h1>
                </div>

                {flash.success && (
                    <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                        {flash.success}
                    </div>
                )}
                <form
                    onSubmit={getLateAttendances}
                    className="bg-white shadow rounded p-4 mb-8 space-y-4"
                >
                    <h2 className="text-lg font-semibold text-gray-600">
                        {" "}
                        عرض مخصص
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="from" className="mb-2">
                                {" "}
                                اختر الموظف
                            </label>
                            <select
                                className="border rounded p-2"
                                value={filters.user_id}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        user_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">الكل</option>
                                {users.map((users) => (
                                    <option key={users.id} value={users.id}>
                                        {users.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="from" className="mb-2">
                                من تاريخ
                            </label>
                            <input
                                required
                                className="border rounded p-2"
                                type="date"
                                value={filters.from}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        from: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="from" className="mb-2">
                                الى تاريخ
                            </label>
                            <input
                                required
                                className="border rounded p-2"
                                type="date"
                                value={filters.to}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        to: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        فلتر
                    </button>
                </form>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3 ">الموظف</th>
                                <th className="px-6 py-3 ">التاريخ</th>
                                <th className="px-6 py-3 ">تسجيل الحضور</th>
                                <th className="px-6 py-3 ">الانصراف</th>
                                <th className="px-6 py-3 ">خصم</th>
                                <th className="px-6 py-3 ">-</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {lateAttendances &&
                                lateAttendances.map((attendance) => (
                                    <tr
                                        key={attendance.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            {attendance.user?.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                attendance.check_in_time.split(
                                                    " ",
                                                )[0]
                                            }
                                            {attendance.project &&
                                                attendance.project?.name}
                                            {attendance.visit &&
                                                attendance.visit?.customer
                                                    ?.name}
                                            {attendance.type === "internal" &&
                                                "داخل الشركة"}
                                            {attendance.type === "external" &&
                                                attendance.customer}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                attendance.check_in_time?.split(
                                                    " ",
                                                )[1]
                                            }
                                            {attendance.in_location !==
                                                "غير محدد" &&
                                                attendance.in_location !==
                                                    null && (
                                                    <a
                                                        href={
                                                            "https://www.google.com/maps?q=" +
                                                            attendance?.in_location
                                                        }
                                                        target="_blank"
                                                        className="text-blue-600 underline"
                                                    >
                                                        لوكيشن
                                                    </a>
                                                )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                attendance.check_out_time?.split(
                                                    " ",
                                                )[1]
                                            }
                                            {attendance.out_location !==
                                                "غير محدد" &&
                                                attendance.out_location !==
                                                    null && (
                                                    <a
                                                        href={
                                                            "https://www.google.com/maps?q=" +
                                                            attendance?.out_location
                                                        }
                                                        target="_blank"
                                                        className="text-blue-600 underline"
                                                    >
                                                        لوكيشن
                                                    </a>
                                                )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                deducts[
                                                    attendance.late_deduct_type
                                                ]
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {attendance.late_deduct_type ==
                                            null ? (
                                                <button
                                                    onClick={() =>
                                                        openModal(attendance)
                                                    }
                                                    className="text-blue-600 underline"
                                                >
                                                    خصم
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        cancelDeduct(
                                                            attendance.id,
                                                        )
                                                    }
                                                    className="text-green-600 underline"
                                                >
                                                    الغاء الخصم
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {showModal && (
                        <div style={overlayStyle}>
                            <div style={modalStyle}>
                                <h3>اختر نوع الخصم</h3>

                                <select
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        marginBottom: "16px",
                                    }}
                                    value={discountType}
                                    onChange={(e) =>
                                        setDiscountType(e.target.value)
                                    }
                                >
                                    <option value="">-- اختر --</option>
                                    <option value="1">ربع يوم</option>
                                    <option value="2">نصف يوم</option>
                                    <option value="3">يوم كامل</option>
                                </select>

                                <div style={{ marginTop: "20px" }}>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                        onClick={handleSave}
                                        disabled={!discountType}
                                    >
                                        حفظ
                                    </button>
                                    <button
                                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                                        onClick={closeModal}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
export const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

export const modalStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
};
export const deducts = ["لا يوجد", "ربع يوم", "نصف يوم", "يوم كامل"];
