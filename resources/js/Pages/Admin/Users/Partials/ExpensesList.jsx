export default function ExpensesList({ expenses }) {
    if (expenses.length === 0) return null;

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2 mt-3">المصروفات</h2>
            <ul className="bg-white p-4 rounded shadow">
                {expenses.map((expense, index) => (
                    <li key={index} className="border-b py-2">
                        <div>📅 {expense.spent_at}</div>
                        <div>💸 {expense.amount} ج</div>
                        <div>📝 {expense.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}