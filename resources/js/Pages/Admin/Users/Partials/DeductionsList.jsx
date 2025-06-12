export default function DeductionsList({ deductions }) {
    if (deductions.length === 0) return null;

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2 mt-3">الاستقطاعات</h2>
            <ul className="bg-white p-4 rounded shadow">
                {deductions.map((deduction, index) => (
                    <li key={index} className="border-b py-2">
                        <div>📅 {deduction.deducted_at}</div>
                        <div>💸 {deduction.amount} ج</div>
                        <div>📝 {deduction.note}</div>
                        <div>📝 {deduction.type}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}