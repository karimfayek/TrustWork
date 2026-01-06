import { useForm, Head } from "@inertiajs/react";

import Button from "@/components/PrimaryButton";
import Input from "@/components/TextInput";
import Label from "@/components/InputLabel";
import { useState } from "react";

export default function StartTrip() {
    const [loadingLocation, setLoadingLocation] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        start_km: "",
        lat: null,
        lng: null,
        from_location: "",
        to_location: "",
    });

    const getLocationAndStart = () => {
        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setData({
                    ...data,
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });

                post(route("driver.trips.start"), {
                    onFinish: () => setLoadingLocation(false),
                });
            },
            () => {
                alert("لم يتم السماح بالحصول على الموقع");
                setLoadingLocation(false);
            }
        );
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-xl font-bold mb-6 text-center">▶️ بدء رحلة</h1>

            <div className="space-y-4">
                <div>
                    <Label>من</Label>
                    <Input
                        placeholder="مكان الانطلاق"
                        value={data.from_location}
                        onChange={(e) =>
                            setData("from_location", e.target.value)
                        }
                    />
                    {errors.from_location && (
                        <p className="text-red-600 text-sm">
                            {errors.from_location}
                        </p>
                    )}
                </div>

                <div>
                    <Label>إلى</Label>
                    <Input
                        placeholder="الوجهة"
                        value={data.to_location}
                        onChange={(e) => setData("to_location", e.target.value)}
                    />
                    {errors.to_location && (
                        <p className="text-red-600 text-sm">
                            {errors.to_location}
                        </p>
                    )}
                </div>

                <div>
                    <Label>قراءة عداد الكيلومترات</Label>
                    <Input
                        type="number"
                        value={data.start_km}
                        onChange={(e) => setData("start_km", e.target.value)}
                    />
                    {errors.start_km && (
                        <p className="text-red-600 text-sm">
                            {errors.start_km}
                        </p>
                    )}
                </div>

                <Button
                    className="w-full"
                    onClick={getLocationAndStart}
                    disabled={processing || loadingLocation}
                >
                    {loadingLocation ? "جاري تحديد الموقع..." : "بدء الرحلة"}
                </Button>
            </div>
        </div>
    );
}
