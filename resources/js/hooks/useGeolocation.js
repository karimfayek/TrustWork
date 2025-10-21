// resources/js/hooks/useGeolocation.js
import { useState, useEffect, useCallback } from 'react';

export default function useGeolocation() {
  // State لتخزين الإحداثيات
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  // State لحالة التحميل
  const [loading, setLoading] = useState(false);
  // State لتخزين أي خطأ يحصل أثناء الحصول على الموقع
  const [error, setError] = useState(null);

  /**
   * دالة getLocation(): عندما تستدعيها، تبدأ محاولة الحصول على الإحداثيات
   */
  const getLocation = useCallback(() => {
      console.log('starting')
    return new Promise((resolve, reject) => {
      setLoading(true);
      setError(null);
      console.log('strat promise')
  
      if (!navigator.geolocation) {
        console.log('navigator error')
        const msg = 'Geolocation not supported by this browser.';
        setError(msg);
        setLoading(false);
        return reject(msg);
      }
  
      navigator.geolocation.getCurrentPosition(
        
        (position) => {
          const { latitude, longitude } = position.coords;
          const loc = { latitude, longitude };
          console.log('loc' , loc)
          setLocation(loc);
          setLoading(false);
          resolve(loc);
        },
        (err) => {
            console.log('Error getting position', err);
          setError(err.message);
          setLoading(false);
          reject(err.message);
        }
      );
    });
  }, []);
  

  // مثال: إذا أردت طلب الموقع تلقائيًا عند أول تحميل الـComponent، يمكنك إلغاء التعليق:
  /*
  useEffect(() => {
    getLocation();
  }, [getLocation]);
  */

  return { location, loading, error, getLocation };
}
