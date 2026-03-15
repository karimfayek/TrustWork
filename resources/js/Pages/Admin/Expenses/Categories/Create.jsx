import { useForm, Head, Link } from "@inertiajs/react";
import UserLayout from "@/layouts/AuthenticatedLayout";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import Label from "@/components/InputLabel";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("expense-categories.store"));
    };

    return (
        <UserLayout>
            <Head title="إضافة تصنيف جديد" />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-6">➕ إضافة تصنيف جديد</h1>

                <form onSubmit={submit} className="space-y-4">
                    {/* Plate Number */}
                    <div>
                        <Label>اسم التصنيف</Label>
                        <TextInput
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Model */}
                    <div>
                        <Label>الوصف</Label>
                        <TextInput
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <PrimaryButton type="submit" disabled={processing}>
                            حفظ
                        </PrimaryButton>

                        <Link
                            href={route("expense-categories.index")}
                            className="px-4 py-2 border rounded"
                        >
                            إلغاء
                        </Link>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}
