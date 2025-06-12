import { useEffect, useState } from 'react';
import { Link, useForm , router } from '@inertiajs/react';
import axios from 'axios';
import useGeolocation from '@/hooks/useGeolocation';

export default function VisitStartPage({ customers, activeVisit  }) {
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
   // console.log(activeVisit )
    const [visitId, setVisitId] = useState(null);
    const [error, setError] = useState(null);
    const [reportUploaded, setReportUploaded] = useState(true);
    const [visitEnded, setVisitEnded] = useState(false);
    const { data, setData, post, processing } = useForm({
        customer_id: '',
        notes: '',
        report: null,
    });
    console.log('LocationError:', LocationError);
    
    const startVisit = async (e) => {
        e.preventDefault()
        if (!navigator.geolocation) {
            alert('المتصفح لا يدعم تحديد الموقع');
           
           return
        }
        try {
            const currentLocation = await getLocation();
            axios.post(route('visits.store'), {
                customer_id: data.customer_id,
                location: `${currentLocation.latitude},${currentLocation.longitude}`,
            })
            .then(response => {
                if (response.data.error) {
                    setError(response.data.error);
                } else if (response.data.visit) {
                    setVisitId(response.data.visit.id);
                    setError(null);
                }
            })
            .catch(error => {
                console.error(error);
                setError('حدث خطأ أثناء إرسال البيانات');
            });
           
            // التحديث بعد نجاح الطلب
        } catch (error) {
            console.error('Visit start error:', error);
            alert(error)
        }
    };

    const endVisit = async () => {
        if (!data.report) {
        setReportUploaded(false)
            alert("Please upload a file");
            return;
        }
        const currentLocation = await getLocation();
        const formData = new FormData();
        formData.append('customer_id', data.customer_id);
        formData.append('notes', data.notes);
        formData.append('report', data.report); 
        formData.append('location', `${currentLocation.latitude},${currentLocation.longitude}`);
    
        try {
            const response = await axios.post(route('visits.update' , visitId), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response)
            if(response.data.success){
                setVisitEnded(true)
                window.location.href = response.data.redirect;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
               {error &&
            
            <div className="bg-[#FF2D20]/10 p-4 rounded shadow text-yellow-900 mb-6">
        <p>  {error}</p>
          {/* حالة التحميل أو الخطأ أثناء جلب الموقع */}
      {loading && (
        <p className="text-gray-600">جاري الحصول على الموقع...</p>
      )}
      {geoError && (
        <p className="text-red-500">خطأ في تحديد الموقع: {geoError}</p>
      )}
       
    </div>}
            {!visitId &&  !activeVisit && (
                <div>
                    <select
                        value={data.customer_id}
                        onChange={e => setData('customer_id', e.target.value)}
                        className="mb-4 border px-4 py-2 w-full"
                    >
                        <option value="">اختر العميل</option>
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={(e)=>startVisit(e)}
                        disabled={!data.customer_id}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        بدء الزيارة
                    </button>
                </div>
            )}

            {visitId && (
                <div className="space-y-4 mt-4">
                    <textarea
                        value={data.notes}
                        onChange={e => setData('notes', e.target.value)}
                        placeholder="ملاحظات الزيارة"
                        className="w-full border p-2"
                    />
                    <input
                        type="file"
                        onChange={e => setData('report', e.target.files[0])}
                        className={reportUploaded ? 'w-full' : 'w-full bg-[#FF2D20]/10'}
                        required
                    />
                    <button
                        onClick={endVisit}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        disabled={processing || visitEnded}
                    >
                        إنهاء الزيارة
                    </button>
                </div>
            )}
            {activeVisit &&
            
            <div className="bg-yellow-100 p-4 rounded shadow text-yellow-900 mb-6">
        <p>أنت في زيارة حالياً، يجب إنهاؤها أولاً قبل بدء زيارة جديدة.</p>
        <Link
            href={route('visits.show', activeVisit.id)}
            className="text-blue-600 underline mt-2 inline-block"
        >
            الذهاب إلى الزيارة الحالية
        </Link>
    </div>}
        </div>
    );
}
