import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import InputError from "@/Components/InputError";
export default function QuotePreview({
    groupedProducts,
    quotationNumber,
    today,
}) {
    const { data, setData, post, errors } = useForm({
        quotation_number: quotationNumber,
        quotation_date: today,
        company_name: "",
        body: "",
        notes: "",
        items: [],
    });

    const updateQuantity = (product, qty) => {
        const unit = product.price;
        const total = qty * unit;

        const items = [...data.items];

        const index = items.findIndex(
            (i) => i.norden_product_id === product.id,
        );

        if (index > -1) {
            items[index] = {
                ...items[index],
                quantity: qty,
                total,
            };
        } else {
            items.push({
                norden_product_id: product.id,
                quantity: qty,
                unit_price: unit,
                total,
            });
        }

        setData("items", items);
    };
    useEffect(() => {
        const initialItems = [];

        Object.values(groupedProducts)
            .flat()
            .forEach((product) => {
                initialItems.push({
                    norden_product_id: product.id,
                    quantity: 1,
                    unit_price: product.price,
                    total: product.price,
                });
            });

        setData("items", initialItems);
    }, []);

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
            {Object.entries(groupedProducts).map(([category, products]) => (
                <div key={category} className="mb-8">
                    <h2 className="font-bold mb-2">{category}</h2>

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
                            {products.map((p, index) => {
                                const item =
                                    data.items.find(
                                        (i) => i.norden_product_id === p.id,
                                    ) || {};

                                return (
                                    <tr key={p.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-2">
                                            {index + 1}
                                        </td>

                                        <td className="px-3 py-2">
                                            <div className="font-medium">
                                                {p.part_number}
                                            </div>
                                            {p.description && (
                                                <div className="text-xs text-gray-500">
                                                    {p.description}
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-3 py-2 text-center">
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity || 1}
                                                onChange={(e) =>
                                                    updateQuantity(
                                                        p,
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="border rounded w-16 text-center print:hidden"
                                            />
                                            <span className="hidden print:inline">
                                                {item.quantity || 1}
                                            </span>
                                        </td>

                                        <td className="px-3 py-2 text-right">
                                            {Number(p.price).toLocaleString()}
                                        </td>

                                        <td className="px-3 py-2 text-right font-semibold">
                                            {Number(
                                                item.total || p.price,
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ))}

            {/* Footer */}
            <div className="mt-6 flex justify-end">
                <div className="w-72 border-t-2 border-gray-800 pt-3 text-right">
                    <div className="text-sm text-gray-600">Total Amount</div>
                    <div className="text-xl font-bold">
                        {Number(grandTotal).toLocaleString()}
                    </div>
                </div>
            </div>

            <p className="text-center">Please accept my very Best Regards</p>
            <textarea
                placeholder="ملاحظات"
                className="w-full border mt-4 p-3 print:hidden"
                onChange={(e) => setData("notes", e.target.value)}
            />
            {data.notes && (
                <p className="print-only hidden">Notes: {data.notes}</p>
            )}
            <button
                onClick={() => post(route("quotes.store"))}
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
