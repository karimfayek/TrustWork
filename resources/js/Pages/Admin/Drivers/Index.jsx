import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
export default function Index({ drivers }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        السائقين
                    </h1>

                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full md:w-auto">
                        <Link
                            href={route("drivers.create")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow text-center"
                        >
                            + إنشاء سائق جديد
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3"> اسم السائق</th>
                                <th className="px-6 py-3">محل الاقامة</th>
                                <th className="px-6 py-3">رقم الرخصة</th>
                                <th className="px-6 py-3">
                                    تاريخ انتهاء الرخصة
                                </th>
                                <th className="px-6 py-3">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {drivers.map((driver) => (
                                <tr key={driver.id} className="text-right">
                                    <td className="px-6 py-3">
                                        {driver.user.name}
                                    </td>
                                    <td className="px-6 py-3">
                                        {driver.residence}
                                    </td>
                                    <td className="px-6 py-3">
                                        {driver.license_number}
                                    </td>
                                    <td className="px-6 py-3">
                                        {new Date(
                                            driver.license_expiry_date
                                        ).toLocaleDateString("en-GB")}
                                    </td>

                                    <td className="px-6 py-3">
                                        <Link
                                            href={route(
                                                "drivers.edit",
                                                driver.id
                                            )}
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
