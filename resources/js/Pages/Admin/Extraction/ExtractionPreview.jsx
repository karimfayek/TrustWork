import ApplicationLogo from '@/Components/ApplicationLogo';
import { CalcItemsExtraction } from '@/Functions/Utils/CalcItemsExtraction';
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import Items from './Items';
import CategoryCheckboxes from './CategoryCheckboxes';
import { usePage } from '@inertiajs/react';

export default function ExtractionPreview({ delevery, subject , deductions, project, items, type, num, date, customer, projectCode, supply, notes, isNotInclusive }) {
  const pdfRef = useRef();
  const logedinUser = usePage().props.auth.user
  const handleExportPDF = () => {
    const element = pdfRef.current;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;
    // 🟥 الخطوة 1: أخفي العناصر اللي فيها `print:hidden`
    const hiddenElements = element.querySelectorAll('.print\\:hidden'); // Tailwind يهرب النقطتين
    hiddenElements.forEach(el => {
      el.classList.add('hidden');
    });
    const pxToMm = (px) => px * 0.264583; // 1px = 0.264583mm
    const pdfWidth = pxToMm(elementWidth);
    const pdfHeight = pxToMm(elementHeight);
    const opt = {
      margin: 0.5,
      filename: 'page-export.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: [pdfWidth, pdfHeight], orientation: 'portrait' }
    };

    // 🟩 الخطوة 2: أنشئ الـ PDF
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        // 🟦 الخطوة 3: رجع العناصر المخفية بعد الانتهاء
        hiddenElements.forEach(el => {
          el.classList.remove('hidden');
        });
      });
  };

  const totalCost = items.reduce((acc, task) => {
    return acc + parseFloat(task.total);
  }, 0);
  
  const totalWithoutVat =
    isNotInclusive
      ? totalCost
      : !supply && deductions.vat > 0
        ? totalCost / 1.05
        : totalCost;
  const VatValue = !isNotInclusive ? (totalWithoutVat / 100) * deductions.vat : 0
  const profitTax = (totalWithoutVat / 100) * deductions.profit_tax
  const socialInsurance = (totalCost / 100) * deductions.social_insurance
  const initialInsurance = (totalCost / 100) * deductions.initial_insurance
  const otherTax = (totalCost / 100) * deductions.other_tax
  const previousPayment = Number(deductions.previous_payments)
  const advancePayment = Number(deductions.advance_payment)

  const netTotal = !isNotInclusive ?
    VatValue + totalWithoutVat - profitTax - socialInsurance - initialInsurance - otherTax - previousPayment - advancePayment :

    totalCost - profitTax - socialInsurance - initialInsurance - previousPayment - advancePayment + VatValue + otherTax
  const extractionTypes = {
    partial: 'جاري ',
    final: ' ختامي',
    supply: ' جارى تشوينات',
    delevery: '  اذن تسليم',
    report: '  محضر تسليم',
    ir: ' IR',
    mir: ' MIR',
    qs: ' QS',
  };


  const addOrMinus = !isNotInclusive ? 'خصم' : ''

  return (
    <div ref={pdfRef} className=" mx-auto bg-white p-6 rounded-2xl  text-gray-800">

      <ApplicationLogo className="float-left w-[8rem]" />

      <div className="mb-4">
        <p><strong>اسم المشروع:</strong> {project.name}</p>
        <p><strong>اسم العميل:</strong> {customer}</p>
        <p><strong>كود المشروع:</strong> {projectCode}</p>
        {delevery !== 'delevery' && delevery !== 'qs' && delevery !== 'ir' && delevery !== 'mir' && delevery !== 'report' &&

          <p><strong> مستخلص:</strong>  {extractionTypes[type]}  {num > 0 && <i>{num}</i>} </p>
        }
        {delevery === 'delevery' &&
          <p className='text-center text-xl'><strong> اذن تسليم</strong>   </p>
        }
        {delevery === 'report' &&
          <p className='text-center text-xl'><strong> محضر تسليم</strong>   </p>
        }
        {(delevery === 'mir' || delevery === 'ir') &&
          <>
            <p><strong>Contractor :</strong> {'Trust Technology Solutions'}</p>
            <p><strong>Ref :</strong> {'Trust Technology/' + projectCode + '/Elec/MIR'}</p>
            <p className='text-center text-xl'><strong> {delevery === 'mir' ? 'Material Inspection Request (MIR)' : 'Inspection Request (IR)'}  </strong>
              {delevery !== 'delevery' && delevery !== 'qs' && delevery !== 'ir' && delevery !== 'report' && 
              num > 0 && <i>{num}</i>
              } 
                </p>
                </>
        }
        <p><strong>تاريخ الطلب:</strong> {date}</p>
      </div>
      <div className="mb-[100px]">
        {delevery !== 'ir' &&
          <><h2 className="text-xl font-semibold border-b pb-2 mb-2">البنود</h2><table className={(delevery === 'mir' || delevery === 'ir') ? 'min-w-full border-4 border-black text-sm' : "min-w-full border border-gray-300 text-sm"}>
            <thead className="bg-gray-100">

              <tr>
                <th className="p-2 border" rowSpan="2">م</th>
                <th className="p-2 border" rowSpan="2">بيان الأعمال</th>
                <th className="p-2 border" rowSpan="2">الوحدة</th>
                <th className="p-2 border" rowSpan="2">كمية العقد</th>
                {(delevery === 'delevery' || delevery === 'report'|| delevery === 'mir') &&
                  <>
                  <th className="p-2 border" colSpan="3">
                    {(delevery === 'delevery' || delevery === 'report' )&& <>كميه التسليم</>}
                    {delevery === 'mir' && <>كميه الفحص</>}
                  </th>
                  </>
                }
                  
                {delevery !== 'delevery' && delevery !== 'report' && delevery !== 'qs' && delevery !== 'ir' && delevery !== 'mir' &&

                  <>
                  <th className="p-2 border" colSpan="3">الكمية</th>
                   {logedinUser.email !== 'sherok@trustits.net' &&
                    <th className="p-2 border" rowSpan="2">الفئة</th>
                   }
                    <th className="p-2 border" rowSpan="2">نسبة الصرف</th>
                     {logedinUser.email !== 'sherok@trustits.net' &&
                    <th className="p-2 border" rowSpan="2">إجمالي المبلغ</th>
                     }
                    </>
                    }

              </tr>
              {delevery !== 'delevery' && delevery !== 'report' && delevery !== 'qs' && delevery !== 'ir' && delevery !== 'mir' &&
                <tr>
                  <th className="p-2 border"> السابق</th>
                  <th className="p-2 border"> الحالي</th>
                  <th className="p-2 border"> الإجمالي</th>
                </tr>}
            </thead>
            <tbody>
              {items?.map(
                (task, index) => (
                  <tr key={index}>
                    <td className={delevery ? 'border text-right max-w-[20px]' : "p-2 border text-right"}>{index + 1}</td>
                    <td className="p-2 border text-right">{task.title}</td>
                    <td className="p-2 border text-center">{task.unit === "meter"
                      ? "MTR"
                      : task.unit === "number"
                        ? "NUM"
                        : task.unit === "ls"
                          ? "LS"
                          : task.unit}</td>
                    <td className="p-2 border text-center">{task.quantity}</td>
                     {(delevery === 'delevery'||  delevery === 'report' || delevery === 'mir') &&
                        <td className="p-2 border text-center">{task.current_done}</td>
                        }
                    {delevery !== 'delevery' && delevery !== 'report'&& delevery !== 'qs' && delevery !== 'ir' && delevery !== 'mir' &&
                      <><td className="p-2 border text-center"> {task.previous_done}</td>
                      
                     
                      <td className="p-2 border text-center">{task.current_done}</td>
                        <td className="p-2 border text-center">{task.total_done}</td>
                         {logedinUser.email !== 'sherok@trustits.net' &&
                        <td className="p-2 border text-center">{task.unit_price}</td>
                         }
                        <td className="p-2 border text-center"> {task.progress_percentage} %</td>
                         {logedinUser.email !== 'sherok@trustits.net' &&
                        <td className="p-2 border text-center">{task.total}</td>
                         }
                      </>}

                  </tr>
                )
              )}
              {delevery !== 'delevery' && delevery !== 'report' && delevery !== 'qs' && delevery !== 'ir' && delevery !== 'mir' &&
                <React.Fragment>
 {logedinUser.email !== 'sherok@trustits.net' &&
                  <tr>
                    <td colSpan={9} className="p-2 border text-center">الإجمالى </td>
                    <td className="p-2 border text-center">{totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
}
                  {(isNotInclusive == true && VatValue > 0 && logedinUser.email !== 'sherok@trustits.net' ) &&
                    <tr>
                      <td colSpan={9} className="p-2 border text-center">ضريبه القيمه المضافة </td>
                      <td className="p-2 border text-center">{VatValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>}

                  {!supply && !isNotInclusive && deductions.vat > 0 && logedinUser.email !== 'sherok@trustits.net' &&

                    <tr>
                      <td colSpan={9} className="p-2 border text-center"> الاجمالي بدون الضريبة المضافة {deductions.vat}% </td>
                      <td className="p-2 border text-center">{totalWithoutVat.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>}

                  {deductions.profit_tax > 0 && logedinUser.email !== 'sherok@trustits.net'  &&
                    <tr>
                      <td colSpan={9} className="p-2 border text-center">  {addOrMinus} {deductions.profit_tax} % ضريبة   </td>
                      <td className="p-2 border text-center">{profitTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>}

                  {deductions.social_insurance > 0 && logedinUser.email !== 'sherok@trustits.net'  &&
                    <tr>
                      <td colSpan={9} className="p-2 border text-center"> تعليه التأمينات الاجتماعيه </td>
                      <td className="p-2 border text-center">{socialInsurance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>}
                  {deductions.advance_payment > 0 && logedinUser.email !== 'sherok@trustits.net'  &&

                    <tr>
                      <td colSpan={9} className="p-2 border text-center">خصم دفعة مقدمة    </td>
                      <td className="p-2 border text-center">{deductions.advance_payment.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>}
                  {initialInsurance > 0 && logedinUser.email !== 'sherok@trustits.net'  &&
                    <tr>
                      <td colSpan={9} className="p-2 border text-center">{addOrMinus} {deductions.initial_insurance} % تامين اعمال </td>
                      <td className="p-2 border text-center">{initialInsurance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>}
                  {previousPayment > 0 && logedinUser.email !== 'sherok@trustits.net'  &&
                    <tr>
                      <td colSpan={9} className="p-2 border text-center">خصم ما سبق صرفه</td>
                      <td className="p-2 border text-center">{previousPayment.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>}
                  {otherTax > 0 && logedinUser.email !== 'sherok@trustits.net'  &&
                    <tr>
                      <td colSpan={9} className="p-2 border text-center">  ضرائب {deductions.other_tax} %  </td>
                      <td className="p-2 border text-center">{otherTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>}
                    { logedinUser.email !== 'sherok@trustits.net'  &&
                  <tr>
                    <td colSpan={9} className="p-2 border text-center"> صافي المستخلص  </td>

                    <td className="p-2 border text-center">{netTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

                    </td>
                  </tr>
                    }

                </React.Fragment>
                }


              <tr>
                <td colSpan={1} className="p-2 border text-center">  </td>
                <td colSpan={1} className="p-2 border text-center"> ملاحظات </td>
                <td colSpan={9} className="p-2 border text-center">   {notes}  </td>
              </tr>



            </tbody>
          </table></>
        }
        {(delevery === 'mir' || delevery === 'ir') &&
          <CategoryCheckboxes delevery={delevery} subject={subject} notes={notes}/>

        }
        {(delevery === 'delevery' || delevery === 'report') &&


          <div className='mt-10'>
            <p className='tet-center'>
              تم تسليم واستلام البضاعه وفقا لما هو موضح عالية بالمواصافت والكميات  المذكورة
            </p>
            <div className='flex flex-row justify-between'>
              <div className='mt-9'>
                <p>التسليم (شركة تراست)</p>
                <p>الإسم : .....................</p>
                <p>الوظيفة : .....................</p>
                <p>التوقيع : .....................</p>
              </div>
              <div className='mt-9'>
                <p>المستلم ({customer} )</p>
                <p>الإسم : .....................</p>
                <p>الوظيفة : .....................</p>
                <p>التوقيع : .....................</p>
              </div>
            </div>
          </div>
        }
      </div>


      {/* <div className="print-footer hidden print:block text-center text-sm text-gray-500 mt-8">
  <p>Trust Technology Solutions</p>
  <p>Tel : (+2) 02 377 244 01
(+2) 01011 22 33 19</p>
  
</div> */}
      <button
        onClick={handleExportPDF}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden w-full"
      >
        تصدير كـ PDF
      </button>
    </div>
  );
}
