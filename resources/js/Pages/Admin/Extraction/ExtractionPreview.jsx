import ApplicationLogo from '@/Components/ApplicationLogo';
import { CalcItemsExtraction } from '@/Functions/Utils/CalcItemsExtraction';
import React from 'react';
import Items from './Items';

export default function ExtractionPreview({ deductions, project, items, type,num, date, customer ,projectCode , supply , notes}) {
console.log(deductions , 'dedevv')
  const totalCost = items.reduce((acc, task) => {
    return acc + parseFloat(task.total);
  }, 0);
  const totalWithoutVats = totalCost - (totalCost / 100) * deductions.vat
  const totalWithoutVat =
  deductions.vat < 1
    ? totalCost
    : !supply
    ? totalCost / 1.05
    : totalCost;
  const VatValue = (totalWithoutVat / 100) * deductions.vat
  const profitTax = (totalWithoutVat / 100) * deductions.profit_tax
  const socialInsurance = (totalCost / 100) * deductions.social_insurance
  const initialInsurance = (totalCost / 100) * deductions.initial_insurance
  const otherTax = (totalCost / 100) * deductions.other_tax
  const previousPayment = Number(deductions.previous_payments)
  const advancePayment = Number(deductions.advance_payment)
 

  const netTotal = VatValue + totalWithoutVat - profitTax - socialInsurance - initialInsurance - otherTax - previousPayment - advancePayment
const netTotalOther = totalCost + otherTax

  console.log(VatValue + totalWithoutVat , profitTax ,socialInsurance , initialInsurance ,otherTax , previousPayment , advancePayment, 'totalWithoutVat')
  const extractionTypes = {
    partial: 'جاري ',
    final: ' ختامي',
    supply: ' جارى تشوينات',
  };
  
  const result = CalcItemsExtraction(items, deductions);

  const isError = () => {
    const parse = (val) => Number(String(val).replace(/,/g, ''));

    const diff =
      parse(totalCost) -
      parse(profitTax) -
      parse(socialInsurance) -
      parse(project.advance_payment) -
      parse(initialInsurance) -
      parse(previousPayment) -
      parse(otherTax) -
      parse(netTotal);
      
  console.log(diff  , 'dif')
    return type === 'final' && Math.abs(diff) > 0.1; // هامش خطأ صغير
  };
    return (
    <div className=" mx-auto bg-white p-6 rounded-2xl  text-gray-800">
    
    <ApplicationLogo className="float-left w-[8rem]" />

      <div className="mb-4">
        <p><strong>اسم المشروع:</strong> {project.name}</p>
        <p><strong>اسم العميل:</strong> {customer}</p>
        <p><strong>كود المشروع:</strong> {projectCode}</p>
        <p><strong> مستخلص:</strong>  {extractionTypes[type]} <i>{num}</i> </p>
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
                  <td className="p-2 border text-center">{
                    task.unit === "meter"
                      ? "MTR"
                      : task.unit === "number"
                      ? "NUM"
                      :task.unit === "ls"
                      ? "LS"
                      : task.unit
                  }</td>
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
              <td colSpan={9} className="p-2 border text-center">الإجمالى </td>
              <td className="p-2 border text-center">{totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
 
            {!supply && deductions.vat > 1 &&
            
            <tr>
              <td colSpan={9} className="p-2 border text-center"> الاجمالي بدون الضريبة المضافة {deductions.vat}% </td>
              <td className="p-2 border text-center">{totalWithoutVat.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
            }

            {deductions.profit_tax > 0 &&
            <tr>
              <td colSpan={9} className="p-2 border text-center">  خصم {deductions.profit_tax} % ضريبة   </td>
              <td className="p-2 border text-center">{profitTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
             }
   
            {deductions.social_insurance > 0 &&
            <tr>
              <td colSpan={9} className="p-2 border text-center"> تعليه التأمينات الاجتماعيه </td>
              <td className="p-2 border text-center">{socialInsurance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          }
            {deductions.advance_payment > 0 &&

              <tr>
                <td colSpan={9} className="p-2 border text-center">خصم دفعة مقدمة    </td>
                <td className="p-2 border text-center">{deductions.advance_payment.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            }
            {initialInsurance > 0 &&
              <tr>
                <td colSpan={9} className="p-2 border text-center">خصم {deductions.initial_insurance} % تامين اعمال </td>
                <td className="p-2 border text-center">{initialInsurance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            }
            {previousPayment > 0 &&
              <tr>
                <td colSpan={9} className="p-2 border text-center">خصم ما سبق صرفه</td>
                <td className="p-2 border text-center">{previousPayment.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            }
             {otherTax > 0 &&
              <tr>
                <td colSpan={9} className="p-2 border text-center">  ضرائب {deductions.other_tax} %  </td>
                <td className="p-2 border text-center">{otherTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            }
            <tr>
              <td colSpan={9} className="p-2 border text-center"> صافي المستخلص  </td>
              {deductions.other_tax > 0 ?
              <td className="p-2 border text-center">{netTotalOther.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              
              </td>
            :
            <td className="p-2 border text-center">{netTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              {isError() &&
              <p className='text-red-600 print:hidden'>
                صافى المستخلص غير دقيق
              </p>
              }
              </td>
            }
              
             
             
            </tr>
            {notes &&
                          
              <tr>
              <td colSpan={1} className="p-2 border text-center"> ملاحظات </td>
              <td colSpan={9} className="p-2 border text-center">   {notes}  </td>
              </tr>
            }


          </tbody>
        </table>
      </div>


{/* <div className="print-footer hidden print:block text-center text-sm text-gray-500 mt-8">
  <p>Trust Technology Solutions</p>
  <p>Tel : (+2) 02 377 244 01
(+2) 01011 22 33 19</p>
  
</div> */}

    </div>
  );
}
