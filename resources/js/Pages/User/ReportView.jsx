export default function ReportView({ report, user, from, to }) {
    return (
      <div className="max-w-4xl mx-auto mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">
          تقرير حضور: {user.name} من {from} إلى {to}
        </h2>
  
        <table className="min-w-full table-auto border">
  <thead>
    <tr className="bg-gray-100">
      <th className="border px-4 py-2">التاريخ</th>
      <th className="border px-4 py-2">النوع</th>
      <th className="border px-4 py-2">المكان</th>
      <th className="border px-4 py-2">الحضور</th>
      <th className="border px-4 py-2">الانصراف</th>
    </tr>
  </thead>
  <tbody>
    {report.map((row, index) => (
      <tr key={index} className="text-center">
        <td className="border px-4 py-2">{row.date}</td>
        <td className="border px-4 py-2">
          {row.type === 'project'
            ? 'مشروع'
            : row.type === 'visit'
            ? 'زيارة'
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
    );
  }
  