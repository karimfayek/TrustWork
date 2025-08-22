import { CalcItemsExtraction } from '@/Functions/Utils/CalcItemsExtraction';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import ExtractionForm from './ExtractionForm';
import ExtractionPreview from './ExtractionPreview';
import Items from './Items';

export default function ExtractionEdit({ project, extraction, previousQuantities, deductionsList }) {
  console.log(extraction.deductions_json , 'extraction.deductions_json')
  const progressPercentage = extraction.deductions_json?.progress_percentage;
  const initialItems = extraction.items.map(item => {
    const quantity = Number(item.quantity);
    const  previous_done =  item.previous_done;
    const current_done = item.current_done ;
    const total_done = item.total_done;
    const Total = Number( item.total).toFixed(2)

    return {
      task_id: item.task_id,
      title: item.task?.title,
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
  });
 return (
  <ExtractionForm 
  project={project} deductionsList={deductionsList} extractionsCount={ extraction.partial_number -1} 
  prevPay={extraction.deductions_json.previous_payments}
   previousQuantities={previousQuantities} edit={true} extractionId={extraction.id} defaultDeductions={extraction.deductions_json}
   date={extraction.date} supply={extraction.supply} extraction={extraction} DefaultProgressPercentage={progressPercentage}  isNotInclusive={extraction.isnotinclusive}
  />
 )
}
