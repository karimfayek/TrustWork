export const CalcItemsExtraction = (items, deductions , isNotInclusives , supply) => {
    // تأكد من أن الخصومات أرقام
   console.log(isNotInclusives , 'isnot inc calc')
  const totalCost = items.reduce((acc, task) => {
    return acc + parseFloat(task.total);
  }, 0);
  const totalWithoutVat =
  isNotInclusives
    ? totalCost
    :  !supply &&  deductions.vat > 0
    ? totalCost / 1.05
    : totalCost;
    const VatValue = !isNotInclusives ? (totalWithoutVat / 100) * deductions.vat : 0
  const profitTax = (totalWithoutVat / 100) * deductions.profit_tax
  const socialInsurance = (totalCost / 100) * deductions.social_insurance
  const initialInsurance = (totalCost / 100) * deductions.initial_insurance
  const otherTax = (totalCost / 100) * deductions.other_tax
  const previousPayment = parseFloat(deductions?.previous_payments || 0);
  const advancePayment = parseFloat(deductions?.advance_payment || 0);
  const netTotal = !isNotInclusives ?
  VatValue + totalWithoutVat - profitTax - socialInsurance - initialInsurance - otherTax - previousPayment - advancePayment :

  totalCost - profitTax - socialInsurance - initialInsurance - previousPayment - advancePayment + VatValue  + otherTax
console.log(isNotInclusives , 'isnotinc')
const netTotalOther = totalCost + otherTax
    return {
      totalCost: totalCost.toFixed(2),
      totalWithoutVat: totalWithoutVat.toFixed(2),
      vatValue: VatValue.toFixed(2),
      socialInsuranceValue: socialInsurance.toFixed(2),
      initialInsuranceValue: initialInsurance.toFixed(2),
      otherTaxValue: otherTax.toFixed(2),
      previousPayment: previousPayment.toFixed(2),
      advancePayment: advancePayment.toFixed(2),
      netTotal: netTotal.toFixed(2),
      netTotalOther: netTotalOther.toFixed(2),
    };
  };