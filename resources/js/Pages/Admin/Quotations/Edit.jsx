import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
export default function QuoteEdit({ quotation }) {
    const { data, setData, post, errors } = useForm({
        quotation_number: quotation.quotation_number,
        quotation_date: quotation.quotation_date,
        company_name: quotation.company_name,
        currency: quotation.currency,
        body: quotation.body,
        notes: quotation.notes,
        items: quotation.items,
    });
    const updateQuantity = (product, qty) => {
        const items = [...data.items];

        const index = items.findIndex(
            (i) => i.norden_product_id === product.norden_product_id,
        );
        if (index > -1) {
            const unit = items[index].unit_price;

            items[index] = {
                ...items[index],
                quantity: qty,
                total: qty * unit,
            };
        }

        setData("items", items);
    };
    const updateUnitPrice = (product, price) => {
        const items = [...data.items];

        const index = items.findIndex(
            (i) => i.norden_product_id === product.norden_product_id,
        );

        if (index > -1) {
            const qty = items[index].quantity;

            items[index] = {
                ...items[index],
                unit_price: price,
                total: qty * price,
            };
        }

        setData("items", items);
    };

    const grandTotal = Array.isArray(data.items)
        ? data.items.reduce((sum, item) => sum + Number(item.total || 0), 0)
        : 0;

    return (
        <div className="max-w-5xl mx-auto bg-white p-10" dir="ltr">
            {/* Header */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                    <img src="/logo.webp" className="h-16 mb-4" />
                    <p>Quotation No: {data.quotation_number}</p>
                    <InputError
                        message={errors.quotation_number}
                        className="mt-2"
                    />
                </div>

                <div className=" space-y-2">
                    <input
                        type="date"
                        value={data.quotation_date}
                        onChange={(e) =>
                            setData("quotation_date", e.target.value)
                        }
                        className="print:hidden  border px-3 py-1"
                    />
                    <p> Date: {data.quotation_date}</p>
                    <input
                        placeholder="اسم الشركة"
                        value={data.company_name}
                        onChange={(e) =>
                            setData("company_name", e.target.value)
                        }
                        className="print:hidden border px-3 py-1 w-full"
                        required
                    />
                    <InputError
                        message={errors.company_name}
                        className="mt-2"
                    />
                    <p> To: {data.company_name}</p>
                    <InputLabel
                        htmlFor="currency"
                        value="العملة"
                        className="print:hidden"
                    />
                    <select
                        dir="rtl"
                        value={data.currency}
                        onChange={(e) => setData("currency", e.target.value)}
                        className="print:hidden border px-3 py-1 w-full"
                        required
                    >
                        <option value="EGP">EGP</option>
                        <option value="USD">USD</option>
                    </select>
                    <InputError message={errors.currency} className="mt-2" />
                </div>
            </div>
            <p className="text-center hidden print-only">
                After Greeting,,,,,
                <br />
                <br />
                {data.body}
            </p>
            <p className="text-center">
                <textarea
                    name="body"
                    id=""
                    value={data.body}
                    onChange={(e) => setData("body", e.target.value)}
                    className="print:hidden border px-3 py-1 w-full"
                    required
                ></textarea>
            </p>
            {/* Products */}
            {data.items.map((p) => (
                <div key={p.id} className="mb-8">
                    <h2 className="font-bold mb-2">{p.category}</h2>

                    <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-800">
                            <tr>
                                <th className="px-3 py-2 text-left w-12">#</th>
                                <th className="px-3 py-2 text-left">
                                    Description
                                </th>
                                <th className="px-3 py-2 text-center w-24">
                                    Qty
                                </th>
                                <th className="px-3 py-2 text-right w-32">
                                    Unit Price
                                </th>
                                <th className="px-3 py-2 text-right w-32">
                                    Total
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="px-3 py-2">{1}</td>

                                <td className="px-3 py-2">
                                    <div className="font-medium">
                                        {p.product.part_number}
                                    </div>
                                    {p.product.description && (
                                        <div className="text-xs text-gray-500">
                                            {p.product.description}
                                        </div>
                                    )}
                                </td>

                                <td className="px-3 py-2 text-center">
                                    <input
                                        type="number"
                                        min="1"
                                        value={p.quantity || 1}
                                        onChange={(e) =>
                                            updateQuantity(
                                                p,
                                                Number(e.target.value),
                                            )
                                        }
                                        className="border rounded w-16 text-center print:hidden"
                                    />
                                    <span className="hidden print:inline">
                                        {p.quantity || 1}
                                    </span>
                                </td>

                                <td className="px-3 py-2 text-right">
                                    {/* Screen */}
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={p.unit_price || p.price}
                                        onChange={(e) =>
                                            updateUnitPrice(
                                                p,
                                                Number(e.target.value),
                                            )
                                        }
                                        className="border rounded w-28 text-right px-2 print:hidden"
                                    />

                                    {/* Print */}
                                    <span className="hidden print:inline">
                                        {Number(
                                            p.unit_price || p.price,
                                        ).toLocaleString()}
                                    </span>
                                </td>

                                <td className="px-3 py-2 text-right font-semibold">
                                    {Number(
                                        p.total || p.price,
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}

            {/* Footer */}
            <div className="mt-6 flex justify-end">
                <div className="w-72 border-t-2 border-gray-800 pt-3 text-right">
                    <div className="text-sm text-gray-600">Total Amount</div>
                    <div className="text-xl font-bold">
                        {Number(grandTotal).toLocaleString()} {data.currency}
                    </div>
                </div>
            </div>

            <p className="text-center">Please accept my very Best Regards</p>
            <textarea
                placeholder="ملاحظات"
                className="w-full border mt-4 p-3 print:hidden"
                value={data.notes}
                onChange={(e) => setData("notes", e.target.value)}
            />
            {data.notes && (
                <p className="print-only hidden">Notes: {data.notes}</p>
            )}
            <button
                onClick={() => post(route("quotes.update", quotation.id))}
                className="mt-6 bg-green-600 text-white px-6 py-2 rounded print:hidden"
            >
                حفظ عرض السعر
            </button>

            <button
                onClick={() => window.print()}
                className="bg-gray-600 text-white px-6 py-2 rounded print:hidden"
            >
                Print
            </button>
        </div>
    );
}
