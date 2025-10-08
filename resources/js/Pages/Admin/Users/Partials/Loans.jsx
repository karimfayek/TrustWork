import DeleteButton from "@/Components/DeleteButton";
import { router, usePage } from "@inertiajs/react";

export default function Loans({totalExpense , loans , children , role}) {
     const user = usePage().props.auth.user;
            const userRoles = user?.rolesnames ?? [];
    const handleStatusLoan = (id, status) => {

        router.post(
            route("admin.loan.status"),
            {
                loan_id: id,
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
        <div className="mb-6">
        </div>
        <div className="md:grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-10">
        
        <div>
            <h2 className="text-lg font-semibold mb-2">السلف</h2>
            <ul className="bg-white p-4 rounded shadow">
            {Array.isArray(loans) && loans.length > 0 && loans.map((loan, index) => (
                    <li key={index} className="border-b py-2">
                        <div>📅 {loan.loan_date}</div>
                        <div>💸 {loan.amount} ج</div>
                        <div>📝 {loan.reason}</div>
                        <div>
                            📌 الحالة: {
                                loan.admin_status === 'pending' ? 'قيد الانتظار' :
                                loan.admin_status === 'approved' ? 'موافقة' :
                                loan.admin_status === 'rejected' ? 'مرفوضة' :
                                loan.admin_status
                            }
                            </div>
                            {['admin' , 'acc' , 'hr'].some(role => userRoles?.includes(role)) &&
                                <>
                                
                               <DeleteButton id={loan.id} routeName={'loan.delete'} />
                                { loan.status === 'pending' && (
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => handleStatusLoan(loan.id , 'approved')}
                                            className="bg-green-100 p-1.5"
                                        >
                                            موافقة
                                        </button>
                                        <button
                                            onClick={() => handleStatusLoan(loan.id, "declined")}
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