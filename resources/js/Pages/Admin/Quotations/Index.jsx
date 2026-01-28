import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { Link } from "@inertiajs/react";

export default function QuotationsIndex({ quotations }) {
    return (
        <AuthenticatedLayout>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">Quotations</h1>

                <div className="bg-white shadow rounded">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-right">#</th>
                                <th className="px-4 py-2 text-right">
                                    Quotation No
                                </th>
                                <th className="px-4 py-2 text-right">Date</th>
                                <th className="px-4 py-2 text-right">
                                    Company
                                </th>
                                <th className="px-4 py-2 text-right">Total</th>
                                <th className="px-4 py-2 text-right">
                                    Created By
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotations.data.map((q) => (
                                <tr key={q.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 text-right">
                                        {q.id}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        {q.quotation_number}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        {q.quotation_date}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        {q.company_name}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        {q.total}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        {q.user?.name}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        <Link
                                            href={route(
                                                "quotations.show",
                                                q.id,
                                            )}
                                            className="text-blue-600"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination links={quotations.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
