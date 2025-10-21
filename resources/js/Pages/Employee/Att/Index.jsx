import UserLayout from "@/Layouts/UserLayout";
import { useEffect, useState } from 'react';
import { Link, useForm , router } from '@inertiajs/react';
import axios from 'axios';
import useGeolocation from '@/hooks/useGeolocation';

export default function AttFrom({ userId ,atts }) {
    const [IsLoading , setIsLoading] = useState(false)
    const {
        location,
        loading,
        error: LocationError,
        getLocation,
      } = useGeolocation();
      
      const [geoError, setGeoError] = useState(null);
      useEffect(() => {
        getLocation();
      }, [getLocation]);
    
      useEffect(() => {
        if (LocationError) {
            setGeoError(LocationError); 
        }
      }, [LocationError]);

    const [manuals, SetManulas] = useState({
        user_id: userId,
        project: "",
        inOut: "",
        type: "internal",
        customer: '',
        customer_id: ''
    });
    const handleManual = async (e, inOut) => {
        e.preventDefault();
        setIsLoading(false)
        if (!navigator.geolocation) {
            setIsLoading(false)
            alert('المتصفح لا يدعم تحديد الموقع');
           
           return
        }
        // عمل نسخة معدلة محليًا من البيانات
        const currentLocation = await getLocation();
        console.log(currentLocation)
        const payload = {
            ...manuals,
            customer: manuals.type !== 'external' ? '' : manuals.customer,
            location: `${currentLocation.latitude},${currentLocation.longitude}`,
        };

        router.post(route("check.manual"), payload, {
            preserveState: true,
            replace: true,
            onSuccess : ()=>  setIsLoading(false)
        });
        console.log("Sending payload: ", payload);
       
    };
    return (
        <UserLayout>
             <form
                        onSubmit={handleManual}
                        className="bg-white shadow rounded p-4 mb-8 space-y-4"
                    >
                        <h2 className="text-lg font-semibold text-gray-600">

                            تسجيل الحضور والانصراف 
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            
                            <div className="flex flex-col">
                                <label htmlFor="from" className="mb-2">

                                    اختر المكان
                                </label>
                                <select value={manuals.type}
                                    required
                                    onChange={(e) => SetManulas({
                                        ...manuals,
                                        type: e.target.value
                                    })}
                                    className="border rounded p-2">
                                    <option value="internal">داخل الشركة</option>
                                    <option value="external">خارج الشركة</option>
                                </select>
                            </div>

                            {manuals.type === 'external' &&
                                <div className="flex flex-col">
                                    <label htmlFor="from" className="mb-2">

                                        اسم العميل
                                    </label>
                                    <input type={'text'} value={manuals.customer}
                                        required
                                        className="border rounded p-2"
                                        onChange={(e) => SetManulas({
                                            ...manuals,
                                            customer: e.target.value
                                        })}
                                    />
                                </div>
                            }
                            <div className="flex flex-col">
                                <label htmlFor="from" className="mb-2">

                                    النوع
                                </label>
                                <select
                                    required
                                    className="border rounded p-2"
                                    value={manuals.inOut}
                                    onChange={(e) => SetManulas({
                                        ...manuals,
                                        inOut: e.target.value
                                    })}
                                >

                                    <option value="">اختر </option>
                                    <option value='in'>
                                        حضور
                                    </option>
                                    <option value='out'>
                                        انصراف
                                    </option>

                                </select>
                            </div>
                        </div>
                        <button
                        disabled={IsLoading}
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-25"
                        >
                            {IsLoading ? 'جار التسجيل' : 'تسجيل'}
                            
                        </button>
                    </form>
                    <div className="max-w-7xl mx-auto p-6">

              

                <div className="flex items-center justify-between mb-6 mt-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {" "}
                        الحضور والانصراف   
                    </h1>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3 ">المكان</th>
                                <th className="px-6 py-3 ">تسجيل الحضور</th>
                                <th className="px-6 py-3 ">الانصراف</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {atts &&
                                atts.map((att) => (
                                    <tr
                                        key={att.id}
                                        className="hover:bg-gray-50"
                                    >
                                        
                                        <td className="px-6 py-4">
                                            {att.project && 
                                            att.project?.name
                                            }
                                             {att.visit && 
                                            att.visit?.customer?.name
                                            }
                                             {att.type === 'internal' && 
                                            'داخل الشركة'
                                            }
                                             {att.type === 'external' && 
                                           att.customer
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {att.check_in_time}
                                            {att.in_location !== 'غير محدد' && att.in_location !== null &&
                                            <a href={'https://www.google.com/maps?q='+  att?.in_location } target="_blank" className="text-blue-600 underline">لوكيشن
                                            </a>
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {att.check_out_time}
                                            {att.out_location !== 'غير محدد' && att.out_location !== null &&
                                            <a href={'https://www.google.com/maps?q='+  att?.out_location } target="_blank" className="text-blue-600 underline">لوكيشن
                                            </a>
                                            }
                                        </td>
                                        
                                        
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </UserLayout>
    )
}