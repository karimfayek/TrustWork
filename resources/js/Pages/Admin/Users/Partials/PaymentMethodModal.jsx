import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function PaymentMethodModal({ 
    show, 
    onClose, 
    onConfirm, 
    paymentMethod, 
    setPaymentMethod 
}) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">اختر طريقة تسليم العهدة</h2>
                <select
                    className="w-full p-2 border rounded mb-4"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="">-- اختر طريقة --</option>
                    <option value="cash">كاش</option>
                    <option value="wallet">محفظة</option>
                    <option value="insta">انستا باي</option>
                    <option value="bank">تحويل بنكي</option>
                </select>
                <div className="flex justify-end gap-2">
                    <SecondaryButton onClick={onClose}>
                        إلغاء
                    </SecondaryButton>
                    <PrimaryButton 
                        onClick={onConfirm} 
                        disabled={!paymentMethod}
                    >
                        تأكيد الموافقة
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}