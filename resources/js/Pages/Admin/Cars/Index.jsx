import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
export default function Index({ cars }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        السيارات
                    </h1>

                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full md:w-auto">
                        <Link
                            href={route("cars.create")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow text-center"
                        >
                            + إنشاء سيارة جديدة
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3"> موديل</th>
                                <th className="px-6 py-3">رقم اللوحة</th>
                                <th className="px-6 py-3">رقم الشاسيه</th>
                                <th className="px-6 py-3">رقم الرخصة</th>
                                <th className="px-6 py-3">
                                    تاريخ انتهاء الرخصة
                                </th>
                                <th className="px-6 py-3"> عداد حالي</th>
                                <th className="px-6 py-3">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {cars.map((car) => (
                                <tr key={car.id} className="text-right">
                                    <td className="px-6 py-3">{car.model}</td>
                                    <td className="px-6 py-3">
                                        {car.plate_number}
                                    </td>
                                    <td className="px-6 py-3">
                                        {car.chassis_number}
                                    </td>
                                    <td className="px-6 py-3">
                                        {car.license_number}
                                    </td>

                                    <td className="px-6 py-3">
                                        {car.license_expiry_date}
                                    </td>
                                    <td className="px-6 py-3">
                                        {car.current_km}
                                    </td>

                                    <td className="px-6 py-3">
                                        <Link
                                            href={route("cars.edit", car.id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow text-center"
                                        >
                                            تعديل
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
