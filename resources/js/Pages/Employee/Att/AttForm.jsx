import React, { useState } from "react";
import { router } from "@inertiajs/react";
export default function AttFrom({ users, projects, showManual, customers }) {
    const [filters, setFilters] = useState({
        user_id: "",
        from: "",
        to: "",
    });
    const [manuals, SetManulas] = useState({
        user_id: "",
        project: "",
        inOut: "",
        type: "internal",
        customer: '',
        customer_id: '',
        check_in_time :'',
        check_out_time: ''
    });

    const handleFilter = (e) => {
        e.preventDefault();

        router.get(route("attendance.filter"), filters, {
            preserveState: true,
            replace: false,
        });
    };
    const handleManual = (e, inOut) => {
        e.preventDefault();

        // عمل نسخة معدلة محليًا من البيانات
        const payload = {
            ...manuals,
            customer: manuals.type !== 'external' ? '' : manuals.customer
        };

        router.post(route("check.manual"), payload, {
            preserveState: true,
            replace: true,
        });
        console.log("Sending payload: ", payload);
    };
    return (
            <div className="max-w-7xl mx-auto p-6">
                <form
                    onSubmit={handleFilter}
                    className="bg-white shadow rounded p-4 mb-8 space-y-4"
                >
                    <h2 className="text-lg font-semibold text-gray-600">
                        {" "}
                        عرض مخصص
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="from" className="mb-2">
                                {" "}
                                اختر الموظف
                            </label>
                            <select
                                required
                                className="border rounded p-2"
                                value={filters.user_id}
                                onChange={(e) => setFilters({
                                    ...filters,
                                    user_id: e.target.value
                                })}
                            >
                                <option value="">اختر الموظف</option>
                                {users.map((users) => (
                                    <option key={users.id} value={users.id}>
                                        {users.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="from" className="mb-2">
                                من تاريخ
                            </label>
                            <input
                                required
                                className="border rounded p-2"
                                type="date"
                                value={filters.from}
                                onChange={(e) => setFilters({
                                    ...filters,
                                    from: e.target.value
                                })} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="from" className="mb-2">
                                الى تاريخ
                            </label>
                            <input
                                required
                                className="border rounded p-2"
                                type="date"
                                value={filters.to}
                                onChange={(e) => setFilters({
                                    ...filters,
                                    to: e.target.value
                                })} />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        فلتر
                    </button>
                </form>
                {showManual &&
                    <form
                        onSubmit={handleManual}
                        className="bg-white shadow rounded p-4 mb-8 space-y-4"
                    >
                        <h2 className="text-lg font-semibold text-gray-600">

                            تسجيل الحضور والانصراف يدويا
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         
                            <div className="flex flex-col">
                                <label htmlFor="from" className="mb-2">

                                    اختر الموظف
                                </label>
                                <select
                                    required
                                    className="border rounded p-2"
                                    value={manuals.user_id}
                                    onChange={(e) => SetManulas({
                                        ...manuals,
                                        user_id: e.target.value
                                    })}
                                >
                                    <option value="">اختر الموظف</option>
                                    {users.map((users) => (
                                        <option key={users.id} value={users.id}>
                                            {users.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="from" className="mb-2">

                                    اختر المكان
                                </label>
                                <select value={manuals.type}
                                    required
                                    onChange={(e) => SetManulas({
                                        ...manuals,
                                        type: e.target.value
                                    })}
                                    className="border rounded p-2">
                                    <option value="internal">داخل الشركة</option>
                                    <option value="external">خارج الشركة</option>
                                    <option value="project">مشروع</option>
                                    <option value="visit">زيارة</option>
                                </select>
                            </div>

                            {manuals.type === 'project' &&

                                <div className="flex flex-col">
                                    <label htmlFor="from" className="mb-2">

                                        اختر المشروع
                                    </label>
                                    <select
                                        required
                                        className="border rounded p-2"
                                        value={manuals.project}
                                        onChange={(e) => SetManulas({
                                            ...manuals,
                                            project: e.target.value
                                        })}
                                    >
                                        <option value="">اختر المشروع</option>
                                        {projects.map((project) => (
                                            <option key={project.id} value={project.id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            }
                            {manuals.type === 'visit' &&

                                <div className="flex flex-col">
                                    <label htmlFor="from" className="mb-2">

                                        اختر العميل
                                    </label>
                                    <select
                                        required
                                        className="border rounded p-2"
                                        value={manuals.customer_id}
                                        onChange={(e) => SetManulas({
                                            ...manuals,
                                            customer_id: e.target.value
                                        })}
                                    >
                                        <option value="">اختر العميل</option>
                                        {customers?.map((customer) => (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            }
                            {manuals.type === 'external' &&
                                <div className="flex flex-col">
                                    <label htmlFor="from" className="mb-2">

                                        اسم العميل
                                    </label>
                                    <input type={'text'} value={manuals.customer}
                                        required
                                        className="border rounded p-2"
                                        onChange={(e) => SetManulas({
                                            ...manuals,
                                            customer: e.target.value
                                        })}
                                    />
                                </div>
                            }
                            <div className="flex flex-col">
                                <label htmlFor="from" className="mb-2">

                                    النوع
                                </label>
                                <select
                                    required
                                    className="border rounded p-2"
                                    value={manuals.inOut}
                                    onChange={(e) => SetManulas({
                                        ...manuals,
                                        inOut: e.target.value
                                    })}
                                >

                                    <option value="">اختر </option>
                                    <option value='in'>
                                        حضور
                                    </option>
                                    <option value='out'>
                                        انصراف
                                    </option>

                                </select>
                            </div>
                            {manuals.inOut === 'in' &&
                            
                            <div className="flex flex-col">
                                    <label htmlFor="from" className="mb-2">
    
                                    تاريخ ووقت الحضور:
                                    </label>
                                    <input
                                    required
                                    type="datetime-local"
                                    value={manuals.check_in_time}
                                    onChange={(e) => SetManulas({
                                        ...manuals,
                                        check_in_time: e.target.value
                                    })}
                                    className="border rounded p-2"
                                />
                                   
                                </div>
                                }
                                {manuals.inOut === 'out' &&
                            
                            <div className="flex flex-col">
                                    <label htmlFor="from" className="mb-2">
    
                                    تاريخ ووقت الانصراف:
                                    </label>
                                    <input
                                    required
                                    type="datetime-local"
                                    value={manuals.check_out_time}
                                    onChange={(e) => SetManulas({
                                        ...manuals,
                                        check_out_time: e.target.value
                                    })}
                                    className="border rounded p-2"
                                />
                                   
                                </div>
                                }
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            تسجيل
                        </button>
                    </form>
                }
            </div>
    )
}