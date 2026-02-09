export default function StatsBar({
    employees,
    totalExpenses,
    openCustodiesCount,
    totalAdvances,
}) {
    const stats = [
        { label: "الموظفين", value: employees.length },
        { label: "العهد المفتوحة", value: openCustodiesCount },
        { label: "أجمالى المصاريف", value: totalExpenses },
        { label: "أجمالى العهد", value: totalAdvances },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-xl shadow p-4">
                    <p className="text-gray-500 text-sm">{s.label}</p>
                    <p className="text-xl font-bold">{s.value}</p>
                </div>
            ))}
        </div>
    );
}
