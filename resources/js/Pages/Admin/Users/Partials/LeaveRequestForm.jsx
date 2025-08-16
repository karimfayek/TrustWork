import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function LeaveRequestForm({ maxAmount }) {
  const { data, setData, post, processing,reset, errors, setError } = useForm({
    type: 'regular',
    reason: '',
    leave_date: '',
  });
  const { props } = usePage();
  const errorMessage = props.errors.message;
  const [todayValid, setTodayValid] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
   if (!data?.leave_date || !data?.type) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const leaveDate = new Date(data.leave_date);
    leaveDate.setHours(0, 0, 0, 0);
    
    //  نحسب الفرق بالأيام
    const timeDiff = leaveDate.getTime() - today.getTime();
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    if (data.type === 'regular' && daysDiff < 3) {
      setTodayValid(false);
      console.log(daysDiff ,  'daysDiff not valid')
    } else {
      setTodayValid(true);
      console.log(daysDiff , 'daysDiff valid')
    }
  }, [data.leave_date, data.type]);
  const submit = (e) => {
    e.preventDefault();
    if (!todayValid) {
      setError('amount', 'يمكن فقط طلب الاجازة الاعتيادى قبلها ب ثلاث ايام.');
      return;
    }
    post('/leaves/request', {
      preserveScroll: true,
      onSuccess: () =>{
        setDone(true)
        reset()
      },
    }); 
  };
 

  return (
    <form onSubmit={submit} className=" bg-white p-4  shadow">
      <h2 className="text-xl font-bold mb-4">طلب اجازة</h2>
      {!todayValid && (
        <div className="text-red-600 font-medium mb-4">
         يمكن فقط طلب الاجازة الاعتيادى قبلها ب ثلاث ايام.
        </div>
      )}
      {errorMessage  &&(
        <div className="text-red-600 font-medium mb-4">
      {errorMessage}
      </div>
      )
      }
       {done && (
        <div className="text-green-600 font-medium mb-4">
      تم تقديم طلب الإجازة بنجاح. في انتظار الموافقة.
        </div>
      )}
      <div className="mb-4">
        <label className="block font-medium"> النوع</label>
        <select
        
          className="w-full border rounded px-3 py-2"
          value={data.type}
          onChange={(e) => setData('type', e.target.value)}
        
       >
        <option value="regular"> اعتيادية </option>
        <option value="casual">عارضة </option>
        </select>
        {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
      </div>
      <div className="mb-4">
        <label className="block font-medium">التاريخ</label>
        <input
        type={'date'}
          className="w-full border rounded px-3 py-2"
          value={data.leave_date}
          onChange={(e) => setData('leave_date', e.target.value)}
        />
        {errors.leave_date && <div className="text-red-500 text-sm mt-1">{errors.leave_date}</div>}
      </div>
      <div className="mb-4">
        <label className="block font-medium">السبب</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={data.reason}
          onChange={(e) => setData('reason', e.target.value)}
        />
        {errors.reason && <div className="text-red-500 text-sm mt-1">{errors.reason}</div>}
      </div>

      <button
        type="submit"
        disabled={processing || !todayValid}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        إرسال الطلب
      </button>
    </form>
  );
}
