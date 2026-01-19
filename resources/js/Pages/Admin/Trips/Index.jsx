import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
export default function Index({ trips }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        الرحلات
                    </h1>
                </div>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3"> من </th>
                                <th className="px-6 py-3">إلى</th>
                                <th className="px-6 py-3">السائق</th>
                                <th className="px-6 py-3">تاريخ </th>
                                <th className="px-6 py-3">وقت بدء الرحلة </th>
                                <th className="px-6 py-3">
                                    وقت انتهاء الرحلة{" "}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {trips.map((trip) => (
                                <tr key={trip.id} className="text-right">
                                    <td className="px-6 py-3">
                                        {trip.from_location}
                                        <a
                                            href={
                                                "https://maps.google.com/maps?q=" +
                                                trip.start_lat +
                                                "," +
                                                trip.start_lng
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600"
                                        >
                                            {" لوكيشن  "}
                                        </a>
                                    </td>
                                    <td className="px-6 py-3">
                                        {trip.to_location}
                                        <a
                                            href={
                                                "https://maps.google.com/maps?q=" +
                                                trip.end_lat +
                                                "," +
                                                trip.end_lng
                                            }
                                            target="_blank"
                                            className="text-blue-600"
                                        >
                                            {" لوكيشن  "}
                                        </a>
                                    </td>
                                    <td className="px-6 py-3">
                                        {trip.driver?.user?.name}
                                    </td>
                                    <td className="px-6 py-3">
                                        {new Date(
                                            trip.started_at,
                                        ).toLocaleDateString("en-GB")}
                                    </td>
                                    <td className="px-6 py-3">
                                        {new Date(
                                            trip.started_at,
                                        ).toLocaleTimeString("en-GB")}
                                    </td>
                                    <td className="px-6 py-3">
                                        {new Date(
                                            trip.ended_at,
                                        ).toLocaleTimeString("en-GB")}
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
