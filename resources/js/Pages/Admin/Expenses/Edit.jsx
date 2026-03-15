import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function EditExpense({ expense, projects, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: expense.category_id,
        project_id: expense.project_id,
        amount: expense.amount,
        description: expense.description,
        expense_date: expense.expense_date,
        file: null,
    });

    const [preview, setPreview] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files[0];
        setData("file", file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const formatCurrency = (value) => {
        const number = value.replace(/[^0-9]/g, "");
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleAmount = (e) => {
        const formatted = formatCurrency(e.target.value);
        setData("amount", formatted);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("expenses.update", expense.id));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">
                    تعديل مصروف
                </h1>

                <form onSubmit={submit} className="space-y-6">
                    {/* المشروع */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            المشروع
                        </label>

                        <select
                            className="w-full border rounded-lg px-4 py-2"
                            value={data.project_id}
                            onChange={(e) =>
                                setData("project_id", e.target.value)
                            }
                        >
                            <option value="">اختر المشروع</option>

                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* التصنيف */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            تصنيف المصروف
                        </label>

                        <select
                            className="w-full border rounded-lg px-4 py-2"
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                        >
                            <option value="">اختر التصنيف</option>

                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* المبلغ */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            المبلغ
                        </label>

                        <input
                            type="text"
                            className="w-full border rounded-lg px-4 py-2"
                            value={data.amount}
                            onChange={handleAmount}
                            placeholder="0"
                        />
                    </div>

                    {/* التاريخ */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            تاريخ المصروف
                        </label>

                        <input
                            type="date"
                            className="w-full border rounded-lg px-4 py-2"
                            value={data.expense_date}
                            onChange={(e) =>
                                setData("expense_date", e.target.value)
                            }
                        />
                    </div>

                    {/* الوصف */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            الوصف
                        </label>

                        <textarea
                            rows="3"
                            className="w-full border rounded-lg px-4 py-2"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                    </div>

                    {/* رفع الفاتورة */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            صورة الفاتورة
                        </label>

                        <input type="file" onChange={handleFile} />

                        {preview && (
                            <img
                                src={preview}
                                className="mt-4 w-40 rounded-lg shadow"
                            />
                        )}
                        {expense.file_path && (
                            <a
                                href={route("expenses.file", expense.id)}
                                target="_blank"
                            >
                                <svg
                                    className="w-6 h-6 text-gray-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                                    />
                                </svg>
                            </a>
                        )}
                    </div>

                    {/* زر الحفظ */}
                    <div className="pt-4">
                        <button
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            حفظ المصروف
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
