import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

export default function ReportView({ report, user, from, to }) {
  console.log(report , 'report')
  
  const [originalData, setOriginalData] = useState(report); // نسخة الأصل
const [filteredData, setFilteredData] = useState(report);
  const TrClassName = (type) => {
    if(type !== 'absent'){
      return 'bg-green-100'
    } 
    return 'bg-[#FF2D20]/10'
  }
  const filterAbsent = () => {
    setFilteredData(report.filter(d => d.type === 'absent'));
  };
  const filterAtt = () => {
    setFilteredData(report.filter(d => d.type === 'visit' || d.type === 'project' || d.type === 'internal' || d.type === 'external'));
  };
  
  const resetFilter = () => {
    setFilteredData(originalData); // لعرض كل البيانات مرة أخرى
  };
    return (
      <AuthenticatedLayout>
      <div className="max-w-4xl mx-auto mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">
          تقرير حضور: {user?.name} من {from} إلى {to}
        </h2>
        <div className="flex gap-2 items-center">
  <button className= "border p-2 my-2 border-red-500" onClick={filterAbsent}>غياب فقط
 
  </button>
  <button className= "border p-2 my-2 border-green-500" onClick={filterAtt}>حضور فقط</button>
  <button className= "border p-2 my-2 border-blue-500" onClick={resetFilter}>الكل </button>
  <b className="border px-3">{filteredData.length}</b>
        </div>
        <table className="min-w-full table-auto border">
  <thead>
    <tr className="bg-gray-100">
      <th className="border px-4 py-2">الموظف</th>
      <th className="border px-4 py-2">التاريخ</th>
      <th className="border px-4 py-2">النوع</th>
      <th className="border px-4 py-2">المكان</th>
      <th className="border px-4 py-2">الحضور</th>
      <th className="border px-4 py-2">الانصراف</th>
    </tr>
  </thead>
  <tbody>
    {filteredData.map((row, index) => (
      <tr key={index} className={"text-center "+ TrClassName(row.type)}>
      <td className="border px-4 py-2">{row.user_name}</td>
        <td className="border px-4 py-2">{row.date}</td>
        <td className="border px-4 py-2">
          {row.type === 'project'
            ? 'مشروع'
            : row.type === 'off'
            ? 'عطله اسبوعية'
            : row.type === 'visit'
            ? 'زيارة'
            : row.type === 'internal'
            ? 'الشركة'
            : row.type === 'external'
            ? 'خارج الشركة'
            : row.type === 'leave'
            ? ' اجازة'
            : 'غياب'}
        </td>
        <td className="border px-4 py-2">{row.name}</td>
        <td className="border px-4 py-2">
          {row.check_in ? new Date(row.check_in).toLocaleTimeString() : '—'}
        </td>
        <td className="border px-4 py-2">
          {row.check_out ? new Date(row.check_out).toLocaleTimeString() : '—'}
        </td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
      </AuthenticatedLayout>
    );
  }
  