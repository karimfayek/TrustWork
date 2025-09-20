import { useForm, Link } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("holidays.store"));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">إضافة إجازة جديدة</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">اسم الإجازة</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData("title", e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.title && <div className="text-red-500">{errors.title}</div>}
        </div>

        <div>
          <label className="block mb-1">تاريخ الإجازة</label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => setData("date", e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.date && <div className="text-red-500">{errors.date}</div>}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            حفظ
          </button>
          <Link
            href={route("holidays.index")}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            رجوع
          </Link>
        </div>
      </form>
    </div>
  );
}
