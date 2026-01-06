import { useForm, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/UserLayout";

import Button from "@/components/PrimaryButton";
import Input from "@/components/TextInput";
import Label from "@/components/InputLabel";

export default function Edit({ car }) {
    const { data, setData, put, processing, errors } = useForm({
        plate_number: car.plate_number || "",
        model: car.model || "",
        current_km: car.current_km || "",
        oil_change_every: car.oil_change_every || "",
        maintenance_every: car.maintenance_every || "",
        license_number: car.license_number || "",
        license_expiry_date: car.license_expiry_date || "",
        chassis_number: car.chassis_number || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("cars.update", car.id));
    };

    return (
        <AppLayout>
            <Head title="تعديل السيارة" />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-6">
                    ✏️ تعديل بيانات السيارة
                </h1>

                <form onSubmit={submit} className="space-y-4">
                    {/* Plate Number */}
                    <div>
                        <Label>رقم اللوحة</Label>
                        <Input
                            value={data.plate_number}
                            onChange={(e) =>
                                setData("plate_number", e.target.value)
                            }
                        />
                        {errors.plate_number && (
                            <p className="text-red-600 text-sm">
                                {errors.plate_number}
                            </p>
                        )}
                    </div>

                    {/* Model */}
                    <div>
                        <Label>الموديل</Label>
                        <Input
                            value={data.model}
                            onChange={(e) => setData("model", e.target.value)}
                        />
                    </div>

                    {/* Current KM */}
                    <div>
                        <Label>عداد الكيلومترات الحالي</Label>
                        <Input
                            type="number"
                            value={data.current_km}
                            onChange={(e) =>
                                setData("current_km", e.target.value)
                            }
                        />
                    </div>

                    {/* Oil Change */}
                    <div>
                        <Label>تغيير الزيت كل (كم)</Label>
                        <Input
                            type="number"
                            value={data.oil_change_every}
                            onChange={(e) =>
                                setData("oil_change_every", e.target.value)
                            }
                        />
                    </div>

                    {/* Maintenance */}
                    <div>
                        <Label>الصيانة كل (كم)</Label>
                        <Input
                            type="number"
                            value={data.maintenance_every}
                            onChange={(e) =>
                                setData("maintenance_every", e.target.value)
                            }
                        />
                    </div>

                    {/* License Number */}
                    <div>
                        <Label>رقم الرخصة</Label>
                        <Input
                            value={data.license_number}
                            onChange={(e) =>
                                setData("license_number", e.target.value)
                            }
                        />
                    </div>

                    {/* License Expiry */}
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

                    {/* Chassis */}
                    <div>
                        <Label>رقم الشاسيه</Label>
                        <Input
                            value={data.chassis_number}
                            onChange={(e) =>
                                setData("chassis_number", e.target.value)
                            }
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button type="submit" disabled={processing}>
                            تحديث
                        </Button>

                        <Link
                            href={route("cars.index")}
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
