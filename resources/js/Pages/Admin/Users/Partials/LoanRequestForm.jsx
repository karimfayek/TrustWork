import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function LoanRequestForm({ maxAmount }) {
  const { data, setData, post, processing,reset, errors, setError } = useForm({
    amount: '',
    reason: '',
  });
  const { props } = usePage();
  const errorMessage = props.errors.message;
  const [todayValid, setTodayValid] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const today = new Date();
    if (today.getDate() < 15) {
      setTodayValid(false);
    }
  }, []);
  const submit = (e) => {
    e.preventDefault();
    if (!todayValid) {
      setError('amount', 'لا يمكنك طلب السلفة إلا بعد يوم 15 من الشهر.');
      return;
    }
    post('/loans/request', {
      preserveScroll: true,
      onSuccess: () =>{
        setDone(true)
        reset()
      },
    }); 
  };
 

  return (
    <form onSubmit={submit} className=" bg-white p-4  shadow">
      <h2 className="text-xl font-bold mb-4">طلب سلفة</h2>
      {!todayValid && (
        <div className="text-red-600 font-medium mb-4">
          لا يمكنك طلب السلفة قبل يوم 15 من الشهر.
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
         تم طلب السلفه
        </div>
      )}
      <div className="mb-4">
        <label className="block font-medium">المبلغ المطلوب (حد أقصى: {maxAmount} ج.م)</label>
        <input
          type="number"
          step="0.01"
          className="w-full border rounded px-3 py-2"
          value={data.amount}
          onChange={(e) => setData('amount', e.target.value)}
          max={maxAmount}
        />
        {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
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
        disabled={processing}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        إرسال الطلب
      </button>
    </form>
  );
}
