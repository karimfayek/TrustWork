import { CalcItemsExtraction } from '@/Functions/Utils/CalcItemsExtraction';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import ExtractionPreview from './ExtractionPreview';
import Items from './Items';

export default function ExtractionForm({ project, deductionsList, extractionsCount, prevPay, previousQuantities }) {
    console.log('previousQuantities',previousQuantities )
    const [items, setItems] = useState([]);


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
    
    
  const [form, setForm] = useState({
    type: 'partial',
    num: extractionsCount +1,
    supply: false,
    customer_name: project.customer_name || '',
    project_code: project.project_code || '',
    date: '',
    deductions: {
        "vat":  "5",
        "profit_tax": "1",
        "initial_insurance": "5",
        "taxes": "5",
        "advance_payment": "0",
        "social_insurance": "3.6",
        "previous_payments": prevPay,
        "progress_percentage" : "100",
        "other_tax" :"0"
    },
    previous_payments: 0,
    notes: '',
  });
  
  const progressPercentage = form.deductions?.progress_percentage;

  
  useEffect(() => {
      
    const initialItems = project.tasks.map(task => {
      console.log(previousQuantities[task.id] , 'prev')
      const quantity = Number(task.quantity);
      const  previous_done =  Number(previousQuantities[task.id]) > 0  ? Number(previousQuantities[task.id]) :  0;
      const current_done =  previous_done < quantity  ? quantity- previous_done : 0 ;
      const total_done = current_done + previous_done;
      const progress_percentage = form.deductions?.progress_percentage || 0;
      const Total = Number(((total_done * task.unit_price ) /100) * progress_percentage).toFixed(2)
  
      return {
        task_id: task.id,
        title: task.title,
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
  
    setItems(initialItems);
  }, [project.tasks, progressPercentage]);

  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
   
  };
  const handleSupplyChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
   
   
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
          deductions: {
            "vat":  "5",
            "profit_tax": "1",
            "initial_insurance": "5",
            "taxes": "5",
            "advance_payment": "0",
            "social_insurance": "3.6",
            "previous_payments": prevPay,
            "progress_percentage" : "100",
            "other_tax" :"0"
        },
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
  
  const result = CalcItemsExtraction(items, form.deductions);
  const handleSave = (e) => {
    if(form.date === ''){
      return
    }
    e.preventDefault()
    const payload = {
      type: form.type,
      supply: form.supply,
      date: form.date,
      customer_name: form.customer_name,
      project_code: form.project_code,
      deductions: form.deductions,
      notes: form.notes,
      netTotal: result.netTotal,
      items: items, // جدول البنود بكل القيم
    };
  
    router.post(route('project.extractions.store' , project.id), payload);
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
<button className='bg-green-100 border border-green-700 px-3 text-2xl' onClick={(e)=>handleSave(e)}>  
  حفظ
</button>
      </div>

          <div>
              <label className="block text-sm font-medium">نوع المستخلص</label>
              <div className='grid grid-cols-2'>
              <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
                  <option value="partial">جاري  </option>
                  <option value="final"> ختامي</option>
              </select>
              <input type="number" name="num" value={form.num} readOnly className="w-full p-2 border rounded" />
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
      <Items items={items} handleItemChange={handleItemChange}  handleDeleteItem = {handleDeleteItem}/>
      
      <ExtractionPreview deductions = {form.deductions}  project={project} 
      items= {items} type={(form.supply && form.type === 'partial') ? 'supply' : form.type} date={form.date} customer = {form.customer_name}
      projectCode={form.project_code} num={form.num} supply = {form.supply}
      />
      
      </AuthenticatedLayout>
  );
}
