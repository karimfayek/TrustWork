import React from 'react';
import { Head } from '@inertiajs/react';
import ReportLayout from './ReportLayout';
import EmployeeReport from './EmployeeReport';
export default function Index() {
    return (
        <ReportLayout>
          <Head title="التقارير" />
      <div className="text-center text-gray-600 text-xl mt-20">
        الرجاء اختيار تقرير من القائمة الجانبية لعرض التفاصيل
      </div>
          </ReportLayout>
)    

}