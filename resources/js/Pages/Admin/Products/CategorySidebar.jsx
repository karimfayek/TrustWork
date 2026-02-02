export default function CategorySidebar({
    categories,
    selectedCategory,
    onSelect,
}) {
    return (
        <div className="bg-white rounded shadow p-4">
            <h3 className="font-bold mb-4">Categories</h3>

            <button
                onClick={() => onSelect("")}
                className={`block mb-2 text-sm ${
                    selectedCategory === "" ? "font-bold text-blue-600" : ""
                }`}
            >
                All Categories
            </button>

            {categories.map((cat) => (
                <div key={cat.id} className="mb-2">
                    <button
                        onClick={() => onSelect(cat.id)}
                        className={`text-sm font-medium ${
                            selectedCategory == cat.id ? "text-blue-600" : ""
                        }`}
                    >
                        {cat.name}
                    </button>

                    {cat.children.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1">
                            {cat.children.map((child) => (
                                <button
                                    key={child.id}
                                    onClick={() => onSelect(child.id)}
                                    className={`block text-sm ${
                                        selectedCategory == child.id
                                            ? "text-blue-600 font-semibold"
                                            : "text-gray-600"
                                    }`}
                                >
                                    - {child.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
