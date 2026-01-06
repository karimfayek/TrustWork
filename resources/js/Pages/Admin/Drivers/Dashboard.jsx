import StartTrip from "./StartTrip";
import EndTrip from "./EndTrip";
import { usePage } from "@inertiajs/react";
export default function Dashboard({ driver, activeTrip }) {
    const { props } = usePage();
    console.log(props, "driver");
    const user = props.auth.user;
    console.log(driver, "driver");
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold">مرحبًا {user.name}</h1>

            <div className="bg-white p-4 rounded shadow">
                <p>🚗 السيارة: {driver.car?.plate_number}</p>
                <p>
                    🪪 انتهاء الرخصة:{" "}
                    {new Date(driver.license_expiry_date).toLocaleDateString(
                        "en-GB"
                    )}
                </p>
            </div>

            {!driver.active_trip?.id && driver.car_id && <StartTrip />}

            {driver.active_trip?.id && <EndTrip trip={driver.active_trip} />}
        </div>
    );
}
