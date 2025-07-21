export default function Items({ items, handleItemChange, handleDeleteItem }) {
    return (

        <>


            <div className="mb-[100px] print:hidden mt-10">
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
                        <th className="p-2 border text-center"></th>
                    </thead>
                    <tbody>
                        {items?.map(
                            (task, index) => (
                                <tr key={index}>
                                    <td className="p-2 border text-right">{index + 1}</td>
                                    <td className="p-2 border text-right">{task.title}</td>
                                    <td className="p-2 border text-center">{task.unit}</td>
                                    <td className="p-2 border text-center">{task.quantity}</td>
                                    <td className="p-2 border text-center">
                                        <input
                                            onWheel={(e) => e.target.blur()}
                                            type="number" value={task.previous_done} className="w-full border p-1"
                                            onChange={(e) => handleItemChange(index, 'previous_done', e.target.value)}
                                        />
                                    </td>
                                    <td className="p-2 border text-center">
                                        <input
                                            onWheel={(e) => e.target.blur()}
                                            type="number" value={task.current_done} className="w-full border p-1"
                                            onChange={(e) => handleItemChange(index, 'current_done', e.target.value)}
                                        /></td>
                                    <td className="p-2 border text-center">{task.total_done}</td>
                                    <td className="p-2 border text-center">{task.unit_price}</td>
                                    <td className="p-2 border text-center">
                                        <input
                                            onWheel={(e) => e.target.blur()}
                                            type="number"
                                            value={task.progress_percentage}
                                            className="w-full border p-1"
                                            onChange={(e) => handleItemChange(index, 'progress_percentage', e.target.value)}
                                        />

                                    </td>
                                    <td className="p-2 border text-center">{task.total}</td>
                                    <td className="p-2 border text-center">
                                        <button
                                            onClick={() => handleDeleteItem(index)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            )
                        )}





                    </tbody>
                </table>
            </div></>

    )
}