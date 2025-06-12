import { useState } from "react"

import {  router} from "@inertiajs/react";
export default function FinancialSettlement({amountOrig, user_id }) {

    const [showModal , setShowModal]= useState(false)
    const [amount , setAmount]= useState(amountOrig)
    const [advanceId , setAdvanceID]= useState('')

    const confirmApproval = () => {    
        if(amount > amountOrig || amount < 1){
            alert ('ادخل قيمه اكبر من واحد واقل من المبلغ المتبقى من السلفه')
            return
        }
        router.post(
            route("admin.advance.settlement"),
            {
                amount: amount,
                user_id: user_id ,
                advance_id: advanceId,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                   
                    setShowModal(false);
                    setAmount(0);
                }
            }
        );
    };

    return (
        <>
        
        <button
        onClick={(e) => setShowModal(true)}
        className="text-red-500 hover:underline text-sm"
    >
        🗑 تسوية
    </button>

    {showModal &&
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">   مبلغ التسوية</h2>
            <input
            type={"text"}
            className="w-full p-2 border rounded mb-4"
            value={amount}
            min={1}
            max={amountOrig}
            onChange={(e) => setAmount(e.target.value)}
           />
           
            <div className="flex justify-end gap-2">
                <button onClick={() => setShowModal(false)} className="bg-gray-200 px-4 py-2 rounded">إلغاء</button>
                <button 
                    onClick={confirmApproval} 
                   
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    تأكيد 
                </button>
            </div>
        </div>
    </div>
    }
        </>

   
    )
}