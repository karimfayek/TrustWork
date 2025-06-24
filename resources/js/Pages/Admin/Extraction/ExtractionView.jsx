import ApplicationLogo from '@/Components/ApplicationLogo';
import React from 'react';
import Items from './Items';

export default function ExtractionPreview({  project, extraction}) {

const type = extraction.type
const num =  extraction.num
const date =  extraction.date
const customer =  project.customer_name
const projectCode =  project.project_code
const items = extraction.items 
const deductions =  extraction.deductions_json

const totalCost = items.reduce((acc, task) => {
    return acc + parseFloat(task.total);
  }, 0);
  const totalWithoutVats = totalCost - (totalCost / 100) * deductions.vat
  const totalWithoutVat = (totalCost / 1.05)
  const VatValue = (totalWithoutVat / 100) * deductions.vat
  const profitTax = (totalWithoutVat / 100) * deductions.profit_tax
  const socialInsurance = (totalCost / 100) * deductions.social_insurance
  const initialInsurance = (totalCost / 100) * deductions.initial_insurance
  const otherTax = (totalCost / 100) * deductions.other_tax
  const previousPayment = deductions.previous_payments
  const advancePayment = deductions.advance_payment
  const netTotal = VatValue + totalWithoutVat - profitTax - socialInsurance - initialInsurance - otherTax - previousPayment - advancePayment
  const extractionTypes = {
    partial: 'جاري ',
    final: ' ختامي',
  };
console.log(deductions , )
  return (
    <div className=" mx-auto bg-white p-6 rounded-2xl  text-gray-800">
    
    <ApplicationLogo className="float-left w-[8rem]" />

      <div className="mb-4">
        <p><strong>اسم المشروع:</strong> {project.name}</p>
        <p><strong>اسم العميل:</strong> {customer}</p>
        <p><strong>كود المشروع:</strong> {projectCode}</p>
        <p><strong> مستخلص:</strong>  {extractionTypes[type]} {type ==='partial' &&  <i>{num}</i>} </p>
        <p><strong>تاريخ الطلب:</strong> {date}</p>
      </div>
      <div className="mb-[100px]">
        <h2 className="text-xl font-semibold border-b pb-2 mb-2">البنود</h2>
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">

            <tr>
              <th className="p-2 border" rowSpan="2">م</th>
              <th className="p-2 border" rowSpan="2">بيان الأعمال</th>
              <th className="p-2 border" rowSpan="2">الوحدة</th>
              <th className="p-2 border" rowSpan="2">كمية العقد</th>
              <th className="p-2 border" colSpan="3">الكمية</th>
              <th className="p-2 border" rowSpan="2">الفئة</th>
              <th className="p-2 border" rowSpan="2">نسبة الصرف</th>
              <th className="p-2 border" rowSpan="2">إجمالي المبلغ</th>

            </tr>
            <tr>
              <th className="p-2 border"> السابق</th>
              <th className="p-2 border"> الحالي</th>
              <th className="p-2 border"> الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            {items?.map(
              (task, index) => (
                <tr key={index}>
                  <td className="p-2 border text-right">{index + 1}</td>
                  <td className="p-2 border text-right">{task.title}</td>
                  <td className="p-2 border text-center">{task.unit}</td>
                  <td className="p-2 border text-center">{task.quantity}</td>
                  <td className="p-2 border text-center"> {task.previous_done}</td>
                  <td className="p-2 border text-center">{task.current_done}</td>
                  <td className="p-2 border text-center">{task.total_done}</td>
                  <td className="p-2 border text-center">{task.unit_price}</td>
                  <td className="p-2 border text-center"> {task.progress_percentage} %</td>
                  <td className="p-2 border text-center">{task.total}</td>

                </tr>
              )
            )}
            <tr>
              <td colSpan={9} className="p-2 border text-center">اجمالى المشروع</td>
              <td className="p-2 border text-center">{totalCost}</td>
            </tr>
            <tr>
              <td colSpan={9} className="p-2 border text-center"> الاجمالي بدون الضريبة المضافة {deductions.vat}% </td>
              <td className="p-2 border text-center">{totalWithoutVat.toLocaleString()}</td>
            </tr>

            {deductions.profit_tax > 0 &&
            <tr>
              <td colSpan={9} className="p-2 border text-center">  خصم {deductions.profit_tax} % ضريبة   </td>
              <td className="p-2 border text-center">{profitTax.toLocaleString()}</td>
            </tr>
             }
            {deductions.social_insurance > 0 &&
            <tr>
              <td colSpan={9} className="p-2 border text-center"> تعليه التأمينات الاجتماعيه </td>
              <td className="p-2 border text-center">{socialInsurance.toLocaleString()}</td>
            </tr>
          }
            {deductions.advance_payment > 0 &&

              <tr>
                <td colSpan={9} className="p-2 border text-center">خصم دفعة مقدمة    </td>
                <td className="p-2 border text-center">{deductions.advance_payment.toLocaleString()}</td>
              </tr>
            }
            {initialInsurance > 0 &&
              <tr>
                <td colSpan={9} className="p-2 border text-center">خصم {deductions.initial_insurance} % تامين اعمال </td>
                <td className="p-2 border text-center">{initialInsurance.toLocaleString()}</td>
              </tr>
            }
            {previousPayment > 0 &&
              <tr>
                <td colSpan={9} className="p-2 border text-center">خصم ما سبق صرفه</td>
                <td className="p-2 border text-center">{previousPayment.toLocaleString()}</td>
              </tr>
            }
             {otherTax > 0 &&
              <tr>
                <td colSpan={9} className="p-2 border text-center"> ضريبه أخرى {deductions.other_tax} %  </td>
                <td className="p-2 border text-center">{otherTax.toLocaleString()}</td>
              </tr>
            }
            <tr>
              <td colSpan={9} className="p-2 border text-center"> صافي المستخلص  </td>
              <td className="p-2 border text-center">{netTotal.toLocaleString()}</td>
            </tr>



          </tbody>
        </table>
      </div>



      <button  onClick={() => window.print()} className="print:hidden fixed bottom-0 left-0 right-0 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
            طباعة
          </button>
    </div>
  );
}
