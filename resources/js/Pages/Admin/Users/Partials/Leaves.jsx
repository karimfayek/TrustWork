import DeleteButton from "@/Components/DeleteButton";
import { router, usePage } from "@inertiajs/react";

export default function Leaves({ totalExpense, leaves, children , role }) {
      const user = usePage().props.auth.user;
        const userRoles = user?.rolesnames ?? [];
    const handleStatusLeave = (id, status) => {

        router.post(
            route("admin.leave.status"),
            {
                leave_id: id,
                status: status,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    
                }
            }
        );
    };
    return (

        <>
            <div className="md:grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-10">

                <div>
                    <h2 className="text-lg font-semibold mb-2">الاجازات</h2>
                    <ul className="bg-white p-4 rounded shadow">
                        {leaves?.map((l, index) => (
                            <li key={index} className="border-b py-2">
                                <div>📅 التاريخ: {l.leave_date}</div>

                                <div>
                                    🏷️ النوع: {l.type === 'regular' ? 'اعتيادية' : l.type === 'casual' ? 'عارضة' : l.type}
                                </div>

                                <div>📝 السبب: {l.reason}</div>

                                <div>
                                    📌 الحالة: {
                                    l.status === 'pending' ? 'قيد الانتظار' :
                                    l.status === 'approved' ? 'موافقة' :
                                    l.status === 'rejected' ? 'مرفوضة' :
                                    l.status
                                    }
                                </div>
                                {['admin' , 'acc' , 'hr'].some(role => userRoles?.includes(role)) &&
                                <>
                                
                               <DeleteButton id={l.id} routeName={'leave.delete'} />
                                { l.status === 'pending' && (
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => handleStatusLeave(l.id , 'approved')}
                                            className="bg-green-100 p-1.5"
                                        >
                                            موافقة
                                        </button>
                                        <button
                                            onClick={() => handleStatusLeave(l.id, "rejected")}
                                            className="bg-red-100 p-1.5"
                                        >
                                            رفض
                                        </button>
                                    </div>
                        )}
                                </>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
                {children}
            </div>
        </>
    )
}