import DeleteButton from '@/Components/DeleteButton';
import { usePage } from '@inertiajs/react';
export default function ProjectProgress ({task}) {
   const logedinUser = usePage().props.auth.user
    return (
<>

{task.progress.length > 0 && (
    <div className="mt-6">
        <h3 className="text-md font-semibold mb-2 border-b pb-1">سجل الإنجازات</h3>
        
        <ul className="space-y-2 text-sm">
            {task.progress.map((entry) => (
                <li key={entry.id} className="bg-gray-100 p-2 rounded border">
                    <div className="flex justify-between">
                        <span>
                        <strong>{entry.quantity_done}</strong>
                           

                           {task.unit === "number" && "عدد"}
                            {task.unit === "meter" && "متر"}
                            {task.unit === "collaborative" && "تعاونى"}

                        </span>
                        <span>
                        {'بواسطة'} <strong>{entry.user?.name}</strong> 
                        </span>
                        <span className="text-gray-500 text-xs">
                            {new Date(entry.created_at).toLocaleDateString('ar-EG', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </span>
                          {['admin'].some(role => logedinUser?.rolesnames?.includes(role)) &&
                        <span>
                            <DeleteButton id={entry.id} routeName={'admin.task.progress.delete'}  title="حذف هذا الإنجاز"  />
                        </span>
}
                    </div>
                </li>
            ))}
        </ul>
    </div>
)}

</>
    )
}