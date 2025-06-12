import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function ReportLayout({ children }) {
  return (
    <AuthenticatedLayout>
    <div className="flex min-h-screen bg-gray-100 ">
      <aside className="w-64 bg-white border-r p-4 print:hidden">
        <h2 className="text-lg font-bold mb-4">التقارير</h2>
        <ul className="space-y-2 text-right">
          <li><Link href="/reports/employees" className="block text-blue-600 hover:underline">تقرير الموظفين</Link></li>
          <li><Link href="/reports/finance" className="block text-blue-600 hover:underline">العهدة المالية</Link></li>
          <li><Link href="/reports/projects" className="block text-blue-600 hover:underline">تقرير المشاريع</Link></li>
          <li><Link href="/reports/attendance" className="block text-blue-600 hover:underline">الحضور والانصراف</Link></li>
          <li><Link href="/reports/expenses" className="block text-blue-600 hover:underline">التسويات والمصروفات</Link></li>
          <li><Link href="/reports/tools" className="block text-blue-600 hover:underline">العهد والأدوات</Link></li>
          <li><Link href="/reports/client-project" className="block text-blue-600 hover:underline">حسب العميل / المشروع</Link></li>
        </ul>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
    </AuthenticatedLayout>
  );
}
