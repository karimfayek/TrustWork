// resources/js/Components/Pagination.jsx

import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <div className="flex items-center space-x-1 mt-4 flex-wrap p-5 mx-auto justify-center">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || "#"}
                    preserveState
                    preserveScroll
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`
                        px-3 py-1 border rounded text-sm
                        ${link.active ? "bg-blue-500 text-white" : "hover:bg-gray-200"}
                        ${!link.url ? "opacity-50 pointer-events-none" : ""}
                    `}
                />
            ))}
        </div>
    );
}
