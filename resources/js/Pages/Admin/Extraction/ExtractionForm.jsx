import { CalcItemsExtraction } from '@/Functions/Utils/CalcItemsExtraction';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import ExtractionPreview from './ExtractionPreview';
import Items from './Items';

export default function ExtractionForm({type="delevery", project, deductionsList, extractionsCount, prevPay, previousQuantities , 
  edit=false, extractionId=null , defaultDeductions=null , date=null , supply=false ,extraction=null , DefaultProgressPercentage=null, isNotInclusive=false }) {
const logedinUser = usePage().props.auth.user
    const [items, setItems] = useState([]);
    const [lang, setLang] = useState('en');

    const handleItemChange = (index, field, value) => {
      const updatedItems = [...items];
      updatedItems[index][field] = Number(value) || 0;
    
      const item = updatedItems[index];
      item.total_done = item.previous_done + item.current_done;
    
      
    
      // إعادة حساب الإجمالي بناءً على النسبة
      item.total = ((item.total_done * item.unit_price) / 100) * item.progress_percentage;
      item.total = Number(item.total.toFixed(2));
    
      setItems(updatedItems);
    };
    
    if(defaultDeductions !== null){

    }
    const progPercent = DefaultProgressPercentage !== null ? DefaultProgressPercentage : 100
    const deductions = defaultDeductions !== null ? defaultDeductions :  {
      "vat":  "5",
      "profit_tax": "1",
      "initial_insurance": "5",
      "taxes": "5",
      "advance_payment": project.advance_payment || 0 ,
      "social_insurance": "3.6",
      "previous_payments": prevPay,
      "progress_percentage" : progPercent,
      "other_tax" :"0"
  }
  const [form, setForm] = useState({
    type: type,
    num: extractionsCount +1,
    supply: supply,
    subject: '',
    isnotinclusive : isNotInclusive ,
    customer_name: project.customer_name || '',
    project_code: project.project_code || '',
    date: date ? date : '',
    deductions: deductions,
    previous_payments: 0,
    notes: '',
  });
  
  const progressPercentage =  form.deductions?.progress_percentage;

  console.log(progressPercentage , 'progress pres')
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      console.log('first render')
      // أول ريندر فقط
      isFirstRender.current = false;
    if(extraction !== null){
      console.log('extraction not null')
      const initialItemss =   extraction.items.map(item => {
        const quantity = Number(item.quantity);
        const  previous_done =  item.previous_done;
        const current_done = item.current_done ;
        const total_done = item.total_done;
        const Total = Number( item.total).toFixed(2)
    
        return {
          task_id: item.task_id,
          title: lang === 'en' ? item.task?.title :  item.task?.description,
          unit: item.task?.unit,
          quantity: quantity,
          unit_price: Number(item.task?.unit_price),
          tp: Number(item.task?.tp),
          previous_done,
          current_done: Number(current_done.toFixed(2)),
          total_done: Number(total_done.toFixed(2)),
          progress_percentage: Number(item.progress_percentage || 0),
          total:Total,
        };
      })
      setItems(initialItemss);
      return; 
    }// إيقاف هنا لأننا لا نحتاج نحدث العناصر في التعديل
    }else{
      
      console.log('not first render')
      if(extraction !== null){
        
      console.log('extraction not null in not first render')
        const initialItemss =   extraction.items.map(item => {
          const quantity = Number(item.quantity);
          const  previous_done =  item.previous_done;
          const current_done = item.current_done ;
          const total_done = item.total_done;
          const progress_percentage = form.deductions?.progress_percentage || 0;
          //const Total = Number( item.total).toFixed(2)
            const Total = Number(((total_done * item.unit_price ) /100) * progress_percentage).toFixed(2)
      
          return {
            task_id: item.task_id,
            title: lang === 'en' ? item.task?.title :  item.task?.description,
            unit: item.task?.unit,
            quantity: quantity,
            unit_price: Number(item.task?.unit_price),
            tp: Number(item.task?.tp),
            previous_done,
            current_done: Number(current_done.toFixed(2)),
            total_done: Number(total_done.toFixed(2)),
            progress_percentage: Number(progressPercentage || 0),
            total:Total,
          };
        })
        setItems(initialItemss);
        return; 
      }

    }
    if(extraction === null){
      
      console.log('extraction is null')
    const initialItemss = project.tasks.map(task => {
      const quantity = Number(task.quantity);
      const  previous_done =  Number(previousQuantities[task.id]) > 0  ? Number(previousQuantities[task.id]) :  0;
      const current_done =  previous_done < quantity  ? quantity- previous_done : 0 ;
      const total_done = current_done + previous_done;
      const progress_percentage = form.deductions?.progress_percentage || 0;
      const Total = Number(((total_done * task.unit_price ) /100) * progress_percentage).toFixed(2)
  
      return {
        task_id: task.id,
        title: lang === 'en' ? task?.title :  task?.description,
        unit: task.unit,
        quantity: quantity,
        unit_price: Number(task.unit_price),
        tp: Number(task.tp),
        previous_done,
        current_done: Number(current_done.toFixed(2)),
        total_done: Number(total_done.toFixed(2)),
        progress_percentage: Number(progressPercentage || 0),
        total:Total,
      };
    });
  
    setItems(initialItemss);
    console.log(initialItemss ,'inita')
  }
  }, [ project.tasks,
    form.deductions?.progress_percentage,
    previousQuantities,
    extraction,lang
  ]);

  


  const handleChange = (e) => {

    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
   
  };
  const handleSupplyChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
   
   
  };
  
  
  const handleInclusiveChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
   
   
  };
  const handleToggleLang = (e) => {
    e.preventDefault()
   if(lang === 'en'){
    setLang('ar')
   }else{
    setLang('en')
   }
   
   
  };
  useEffect (
    () => {
      if(form.supply){
        setForm((prev) => ({
          ...prev,
          deductions: {
            "vat":  "0",
            "profit_tax": "0",
            "initial_insurance": "0",
            "taxes": "0",
            "advance_payment": "0",
            "social_insurance": "0",
            "previous_payments": prevPay,
            "progress_percentage" : "100",
            "other_tax" :"0"
        },
        }));
      }else{
        setForm((prev) => ({
          ...prev,
          deductions: deductions,
        }));

      }
    },[form.supply]
  )

  const handleDeductionChange = (e, key) => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      deductions: {
        ...prev.deductions,
        [key]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPrint(true)
  };
  
  const result = CalcItemsExtraction(items, form.deductions , form.isnotinclusive , form.supply);

  const handleSave = (e) => {
    if(form.date === ''){
      return
    }
    e.preventDefault()
    const payload = {
      type: form.type,
      supply: form.supply,
      num:form.num,
      isnotinclusive: form.isnotinclusive,
      date: form.date,
      customer_name: form.customer_name,
      project_code: form.project_code,
      deductions: form.deductions,
      notes: form.notes,
      total:result.totalCost,
      netTotal: result.netTotal,
      netotherTotal: result.netTotalOther,
      items: items, // جدول البنود بكل القيم
    };
  if(edit){
    router.post(route('project.extractions.update' , extractionId), payload);
  }else{
    router.post(route('project.extractions.store' , project.id), payload);
  }
    
  };
  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1); // حذف البند من المصفوفة
    setItems(updatedItems); // تحديث الحالة
  };
  return (
    <AuthenticatedLayout>
    <form onSubmit={handleSubmit} className="print:hidden space-y-4  mx-auto bg-white p-6 rounded-2xl shadow">
      <div className='bg-blue-50 flex items-center justify-between p-4 sticky top-0'>
          <h2 className="font-bold text-2xl text-center">طلب صرف مستخلص</h2>
          <button onClick={(e)=> handleToggleLang(e)}>
            {lang === 'en' &&
            'عربى'
            }
             {lang === 'ar' &&
            'انجليزى'
            }
          </button>
<button className='bg-green-100 border border-green-700 px-3 text-2xl' onClick={(e)=>handleSave(e)}>  
  حفظ
</button>
      </div>

          <div>
              <label className="block text-sm font-medium">نوع المستخلص</label>
              <div className='grid grid-cols-2'>
              <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
                  
                  <option value="delevery"> أذن تسليم</option>
                  <option value="report"> محضر تسليم</option>
                  
                <option value="mir"> MIR</option>
                <option value="ir"> IR</option>
                <option value="qs"> QS</option>
                   {logedinUser.email !== 'sherok@trustits.net'
                &&
                <>
                
                <option value="partial">جاري  </option>
                <option value="final"> ختامي</option>
                </>
                   }
              </select>
 {(form.type === 'partial' ||  form.type === 'final' ||  form.type === 'mir' ) &&
              <input type="number" name="num" value={form.num} onChange={handleChange}  className="w-full p-2 border rounded" />
 }

              {form.type === 'ir' &&
                <div>
                <label className="block text-sm font-medium">subject </label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
              }
              {form.type === 'partial' &&
              
              <>
            
              <div className="mt-4">
                <label className="flex items-center">
                    <input
                     name="supply"
                        type="checkbox"
                        checked={form.supply}
                        onChange={handleSupplyChange}
                    />
                    <span className="mr-2 text-sm text-gray-600">   تشوينات  </span>
                </label>
            </div>
             
             
              </>
              }
             
              </div>
              
          </div>
          <div>
              <label className="block text-sm font-medium">اسم العميل </label>
              <input name="customer_name" value={form.customer_name} onChange={handleChange} className="w-full p-2 border rounded" type="text">
                  
              </input>
          </div>
          <div>
              <label className="block text-sm font-medium"> كود المشروع </label>
              <input name="project_code" value={form.project_code} onChange={handleChange} className="w-full p-2 border rounded" type="text">
                  
              </input>
          </div>
          <div>
              <label className="block text-sm font-medium">تاريخ الطلب</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required/>
          </div>


          <div>
              <label className="block text-sm font-medium mb-2">الاستقطاعات</label>
              <label className="flex items-center my-4 print:hidden">
                    <input
                     name="isnotinclusive"
                        type="checkbox"
                        checked={form.isnotinclusive}
                        onChange={handleInclusiveChange}
                    />
                    <span className="mr-2 text-sm text-gray-600">   السعر غير شامل الضريبه ؟  </span>
                </label>
              <div className="grid grid-cols-4 gap-4">
                  {deductionsList.map((deduction) => (
                      <div key={deduction.key}>
                          <label className="block text-xs text-gray-600 mb-1">{deduction.label}</label>
                          <input
                              type="number"
                              step="0.01"
                              className="w-full p-2 border rounded"
                              value={ form.deductions[deduction.key] || '' }
                              onChange={(e) => handleDeductionChange(e, deduction.key)} />
                      </div>
                  ))}
                  <div>
                          <label className="block text-xs text-gray-600 mb-1">نسبه الانجاز</label>
                          <input
                              type="number"
                              className="w-full p-2 border rounded"
                              value={form.deductions['progress_percentage'] || ''}
                              onChange={(e) => handleDeductionChange(e, 'progress_percentage')}  />
                    </div>
                    
              </div>
          </div>

          <div>
              <label className="block text-sm font-medium">ملاحظات</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
          </div>

          <button  onClick={() => window.print()} className="print:hidden fixed bottom-0 left-0 right-0 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
            طباعة
          </button>
      </form>
      { form.type !== 'ir' && 

      <Items items={items} handleItemChange={handleItemChange}  handleDeleteItem = {handleDeleteItem} logedinUser={logedinUser}/>
      }
      
      <ExtractionPreview delevery={form.type}subject={form.subject} deductions = {form.deductions}  project={project}  
      items= {items} type={(form.supply && form.type === 'partial') ? 'supply' : form.type} 
      date={form.date} customer = {form.customer_name}
      projectCode={form.project_code} 
      num={form.num} supply = {form.supply}
      notes ={form.notes} isNotInclusive = {form.isnotinclusive}
      />
      
      </AuthenticatedLayout>
  );
}
