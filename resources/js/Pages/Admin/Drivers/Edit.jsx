import { useForm, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/AuthenticatedLayout";

import Button from "@/components/PrimaryButton";
import Input from "@/components/TextInput";
import Label from "@/components/InputLabel";

export default function Edit({ driver, cars }) {
    const { data, setData, put, processing, errors } = useForm({
        residence: driver.residence || "",
        license_type: driver.license_type || "",
        license_number: driver.license_number || "",
        license_expiry_date:
            new Date(driver.license_expiry_date).toISOString().split("T")[0] ||
            "",
        car_id: driver.car_id || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("drivers.update", driver.id));
    };

    return (
        <AppLayout>
            <Head title="تعديل السائق" />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-2">
                    ✏️ تعديل بيانات السائق
                </h1>

                {/* User info (read only) */}
                <div className="mb-6 p-4 bg-gray-50 rounded border">
                    <p className="text-sm">
                        <strong>الحساب:</strong> {driver.user.name}
                    </p>
                    <p className="text-sm">
                        <strong>البريد:</strong> {driver.user.email}
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
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
                            value={data.license_expiry_date ?? ""}
                            onChange={(e) =>
                                setData("license_expiry_date", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <Label>السيارة</Label>
                        <select
                            className="w-full border rounded p-2"
                            value={data.car_id ?? ""}
                            onChange={(e) => setData("car_id", e.target.value)}
                        >
                            <option value="">بدون سيارة</option>
                            {cars.map((car) => (
                                <option key={car.id} value={car.id}>
                                    {car.plate_number} - {car.model}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="submit" disabled={processing}>
                            تحديث
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
        </AppLayout>
    );
}
