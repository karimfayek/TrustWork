import { useState, useEffect } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    advance_request_notify: "",
    visit_request_notify: "",
    pricing_notify:"",
    att_notify:"",
    loan_notify:"",
    leave_request_notify:"",
  });

  // تحميل البيانات الحالية
  useEffect(() => {
    axios.get("/admin/settings").then((res) => {
      setSettings(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    axios.post("/admin/settings", settings).then((res) => {
      alert("تم الحفظ بنجاح");
    });
  };

  return (
    <AuthenticatedLayout>

    <div className="my-6 mx-auto bg-white shadow rounded p-6">
      <h1 className="text-xl font-bold mb-4">إعدادات الإشعارات</h1>
      <form onSubmit={handleSave} className="space-y-4">
        {/* إشعارات طلب العهدة */}
        <div>
          <label className="block mb-1 font-medium">
            ضع إيميلات الإشعار في حالة طلب عهدة جديدة
          </label>
          <input
            type="text"
            name="advance_request_notify"
            value={settings.advance_request_notify}
            onChange={handleChange}
            placeholder="مثال: kk@test.com, k2@test2.com"
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            ضع إيميلات الإشعارعند طلب سلفة</label>
          <input
            type="text"
            name="loan_notify"
            value={settings.loan_notify}
            onChange={handleChange}
            placeholder="مثال: v1@test.com, v2@test.com"
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        {/* إشعارات الزيارة */}
        <div>
          <label className="block mb-1 font-medium">
            ضع إيميلات الإشعار في حالة عمل زيارة جديدة
          </label>
          <input
            type="text"
            name="visit_request_notify"
            value={settings.visit_request_notify}
            onChange={handleChange}
            placeholder="مثال: v1@test.com, v2@test.com"
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            ضع إيميلات الإشعار عند طلب اجازة
          </label>
          <input
            type="text"
            name="leave_request_notify"
            value={settings.leave_request_notify}
            onChange={handleChange}
            placeholder="مثال: v1@test.com, v2@test.com"
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            ضع إيميلات الإشعار  لتسعير مشروع جديد </label>
          <input
            type="text"
            name="pricing_notify"
            value={settings.pricing_notify}
            onChange={handleChange}
            placeholder="مثال: v1@test.com, v2@test.com"
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            ضع إيميلات الإشعار عند تسجيل حضور موظف</label>
          <input
            type="text"
            name="att_notify"
            value={settings.att_notify}
            onChange={handleChange}
            placeholder="مثال: v1@test.com, v2@test.com"
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          حفظ الإعدادات
        </button>
      </form>
    </div>
    </AuthenticatedLayout>
  );
}
