import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { Link, router } from "@inertiajs/react";

export default function QuotationsIndex({ quotations }) {
    const handleDeleteQuotation = (e, id) => {
        e.preventDefault();
        router.delete(route("quotations.destroy", { id }));
    };
    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                        <h1 className="text-xl font-semibold text-gray-800">
                            Quotations
                        </h1>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600 border-b">
                                <tr>
                                    <th className="px-4 py-3 text-right w-16">
                                        #
                                    </th>
                                    <th className="px-4 py-3 text-right">
                                        Quotation No
                                    </th>
                                    <th className="px-4 py-3 text-right">
                                        Date
                                    </th>
                                    <th className="px-4 py-3 text-right">
                                        Company
                                    </th>
                                    <th className="px-4 py-3 text-right">
                                        Total
                                    </th>
                                    <th className="px-4 py-3 text-right">
                                        Created By
                                    </th>
                                    <th className="px-4 py-3 text-right w-24">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {quotations.data.map((q, index) => (
                                    <tr key={q.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            {index + 1}
                                        </td>

                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {q.quotation_number}
                                        </td>

                                        <td className="px-4 py-3 text-gray-600">
                                            {q.quotation_date}
                                        </td>

                                        <td className="px-4 py-3">
                                            {q.company_name}
                                        </td>

                                        <td className="px-4 py-3 text-right font-semibold">
                                            {Number(q.total).toLocaleString()}
                                        </td>

                                        <td className="px-4 py-3 text-gray-600">
                                            {q.user?.name}
                                        </td>

                                        <td className="pl-4 py-4 space-x-2 rtl:space-x-reverse flex">
                                            <Link
                                                href={route(
                                                    "quotations.show",
                                                    q.id,
                                                )}
                                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={route(
                                                    "quotations.approve",
                                                    q.id,
                                                )}
                                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
                                            >
                                                {q.approved
                                                    ? "Approved"
                                                    : "Approve"}
                                            </Link>
                                            <button
                                                onClick={(e) =>
                                                    handleDeleteQuotation(
                                                        e,
                                                        q.id,
                                                    )
                                                }
                                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200"
                                            >
                                                Delete !
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t">
                        <Pagination links={quotations.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
