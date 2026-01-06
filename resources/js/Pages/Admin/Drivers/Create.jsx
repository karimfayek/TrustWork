import { useForm, Head, Link } from "@inertiajs/react";
import UserLayout from "@/layouts/AuthenticatedLayout";
import Button from "@/components/PrimaryButton";
import Input from "@/components/TextInput";
import Label from "@/components/InputLabel";

export default function Create({ users }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: "",
        residence: "",
        license_type: "",
        license_number: "",
        license_expiry_date: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("drivers.store"));
    };
    return (
        <UserLayout>
            <Head title="إكمال بيانات السائق" />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-6">👨‍✈️ بيانات السائق</h1>

                <form onSubmit={submit} className="space-y-4">
                    {/* User */}
                    <div>
                        <Label>الحساب</Label>
                        <select
                            className="w-full border rounded p-2"
                            value={data.user_id}
                            onChange={(e) => setData("user_id", e.target.value)}
                        >
                            <option value="">اختر مستخدم</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} - {user.email}
                                </option>
                            ))}
                        </select>
                        {errors.user_id && (
                            <p className="text-red-600 text-sm">
                                {errors.user_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label>الإقامة</Label>
                        <Input
                            value={data.residence}
                            onChange={(e) =>
                                setData("residence", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <Label>نوع رخصة القيادة</Label>
                        <Input
                            value={data.license_type}
                            onChange={(e) =>
                                setData("license_type", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <Label>رقم الرخصة</Label>
                        <Input
                            value={data.license_number}
                            onChange={(e) =>
                                setData("license_number", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <Label>تاريخ انتهاء الرخصة</Label>
                        <Input
                            type="date"
                            value={data.license_expiry_date}
                            onChange={(e) =>
                                setData("license_expiry_date", e.target.value)
                            }
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="submit" disabled={processing}>
                            حفظ
                        </Button>

                        <Link
                            href={route("drivers.index")}
                            className="px-4 py-2 border rounded"
                        >
                            رجوع
                        </Link>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}
