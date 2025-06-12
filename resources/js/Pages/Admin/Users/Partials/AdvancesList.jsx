export default function AdvancesList({ 
    advances, 
    type, 
    onDelete, 
    onApprove, 
    onReject,
    onUpdate 
}) {
    if (advances.length === 0) return null;

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">
                {type === 'pending' ? 'العهد بانتظار الموافقة' : 'العهد المُستلمة'}
            </h2>

            <ul className="bg-white p-4 rounded shadow">
                {advances.map((advance, index) => (
                    <li key={index} className="border-b py-2">
                        <div>📅 {advance.given_at || "بانتظار الموافقة"}</div>
                        <div>
                            💵
                            {type === 'pending' ? (
                                <input
                                    type="number"
                                    value={advance.amount || ""}
                                    onChange={(e) => onUpdate(index, 'amount', e.target.value)}
                                />
                            ) : (
                                <span>{advance.amount}</span>
                            )} ج.م
                        </div>
                        <div>
                            📝
                            {type === 'pending' ? (
                                <input
                                    type="text"
                                    value={advance.note || ""}
                                    onChange={(e) => onUpdate(index, 'note', e.target.value)}
                                />
                            ) : (
                                <span>{advance.note}</span>
                            )}
                        </div>
                        <div>📝 {advance.project?.name}</div>
                        
                        {type === 'pending' && (
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => onDelete(advance.id)}
                                    className="bg-red-100 p-1.5"
                                >
                                    مسح
                                </button>
                                <button
                                    onClick={() => onApprove(advance.id)}
                                    className="bg-green-100 p-1.5"
                                >
                                    موافقة
                                </button>
                                <button
                                    onClick={() => onReject(advance.id, "declined")}
                                    className="bg-red-100 p-1.5"
                                >
                                    رفض
                                </button>
                            </div>
                        )}
                        
                        {type === 'accepted' && (
                            <button
                                onClick={() => onDelete(advance.id)}
                                className="bg-red-100 p-1.5 mt-2"
                            >
                                مسح
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}