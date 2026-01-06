import { useForm, Head } from "@inertiajs/react";

import Button from "@/components/PrimaryButton";
import Input from "@/components/TextInput";
import Label from "@/components/InputLabel";
import { useState } from "react";

export default function EndTrip({ trip }) {
    const [loadingLocation, setLoadingLocation] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        end_km: "",
        lat: null,
        lng: null,
    });

    const getLocationAndEnd = () => {
        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setData({
                    ...data,
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });

                post(route("driver.trips.end", trip.id), {
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
            <h1 className="text-xl font-bold mb-6 text-center">
                ⏹️ إنهاء الرحلة
            </h1>

            <div className="space-y-4">
                <div className="text-sm bg-gray-50 p-3 rounded">
                    <p>📍 الرحلة بدأت: {trip.started_at}</p>
                    <p>🚗 قراءة البداية: {trip.start_km} كم</p>
                </div>

                <div>
                    <Label>قراءة العداد الحالية</Label>
                    <Input
                        type="number"
                        value={data.end_km}
                        onChange={(e) => setData("end_km", e.target.value)}
                    />
                    {errors.end_km && (
                        <p className="text-red-600 text-sm">{errors.end_km}</p>
                    )}
                </div>

                <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={getLocationAndEnd}
                    disabled={processing || loadingLocation}
                >
                    {loadingLocation ? "جاري تحديد الموقع..." : "إنهاء الرحلة"}
                </Button>
            </div>
        </div>
    );
}
