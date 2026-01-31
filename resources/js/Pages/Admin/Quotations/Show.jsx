import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function QuotationShow({ quotation }) {
    console.log(quotation);
    return (
        <AuthenticatedLayout>
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-10 print:shadow-none print:p-0">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <img src="/logo.webp" className="h-14 mb-4" />
                        <p className="text-sm text-gray-600">Quotation No:</p>
                        <p className="font-semibold">
                            {quotation.quotation_number}
                        </p>
                    </div>

                    <div className="text-right space-y-1">
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium">
                            {quotation.quotation_date}
                        </p>

                        <p className="text-sm text-gray-600 mt-3">To</p>
                        <p className="font-semibold">
                            {quotation.company_name}
                        </p>
                    </div>
                </div>

                {/* Intro */}
                <p className="text-center mb-8 text-sm leading-relaxed">
                    After Greeting,
                    <br />
                    <span className="font-semibold">{quotation.body}</span>
                </p>

                {/* Items */}
                <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-3 py-2 text-right w-12">#</th>
                            <th className="px-3 py-2 text-right">
                                Description
                            </th>
                            <th className="px-3 py-2 text-center w-24">Qty</th>
                            <th className="px-3 py-2 text-right w-32">
                                Unit Price
                            </th>
                            <th className="px-3 py-2 text-right w-32">Total</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {quotation.items.map((item, index) => (
                            <tr key={item.id}>
                                <td className="px-3 py-2">{index + 1}</td>

                                <td className="px-3 py-2">
                                    <div className="font-medium">
                                        {item.product?.part_number}
                                    </div>
                                    {item.product?.description && (
                                        <div className="text-xs text-gray-500">
                                            {item.product?.description}
                                        </div>
                                    )}
                                </td>

                                <td className="px-3 py-2 text-center">
                                    {item.quantity}
                                </td>

                                <td className="px-3 py-2 text-right">
                                    {Number(item.unit_price).toLocaleString()}
                                </td>

                                <td className="px-3 py-2 text-right font-semibold">
                                    {Number(item.total).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Total */}
                <div className="mt-8 flex justify-end">
                    <div className="w-72 border-t-2 border-gray-800 pt-3 text-right">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold">
                            {Number(quotation.total).toLocaleString()} $
                        </p>
                    </div>
                </div>

                {/* Notes */}
                {quotation.notes && (
                    <div className="mt-8">
                        <p className="font-semibold mb-1">Notes</p>
                        <p className="text-sm text-gray-700">
                            {quotation.notes}
                        </p>
                    </div>
                )}

                {/* Footer */}
                <p className="text-center mt-10 text-sm">
                    Please accept my very Best Regards
                </p>

                {/* Actions */}
                <div className="flex justify-between mt-10 print:hidden">
                    <Link
                        href={route("quotes.index")}
                        className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
                    >
                        ← Back
                    </Link>

                    <button
                        onClick={() => window.print()}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Print
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
