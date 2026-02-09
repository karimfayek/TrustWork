import { useForm } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        client_name: "",
        client_phone: "",
        client_address: "",
        description: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("work-orders.store"));
    }

    return (
        <UserLayout>
            <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
                <h1 className="text-xl font-bold mb-4">طلب أمر شغل</h1>

                <form onSubmit={submit} className="space-y-4">
                    <input
                        className="w-full border rounded p-2"
                        placeholder="اسم العميل"
                        value={data.client_name}
                        onChange={(e) => setData("client_name", e.target.value)}
                    />
                    {errors.client_name && (
                        <p className="text-red-500">{errors.client_name}</p>
                    )}

                    <input
                        className="w-full border rounded p-2"
                        placeholder="رقم الهاتف"
                        value={data.client_phone}
                        onChange={(e) =>
                            setData("client_phone", e.target.value)
                        }
                    />
                    {errors.client_phone && (
                        <p className="text-red-500">{errors.client_phone}</p>
                    )}

                    <input
                        className="w-full border rounded p-2"
                        placeholder="عنوان العميل"
                        value={data.client_address}
                        onChange={(e) =>
                            setData("client_address", e.target.value)
                        }
                    />
                    {errors.client_address && (
                        <p className="text-red-500">{errors.client_address}</p>
                    )}

                    <textarea
                        className="w-full border rounded p-2"
                        placeholder="تفاصيل الطلب (زيارة – معاينة – إلخ)"
                        rows="4"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    {errors.description && (
                        <p className="text-red-500">{errors.description}</p>
                    )}

                    <button
                        disabled={processing}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        ✅ تأكيد وإرسال
                    </button>
                </form>
            </div>
        </UserLayout>
    );
}
