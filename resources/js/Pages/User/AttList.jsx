import React, { useEffect, useState } from "react";
import {   usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AttFrom from "../Employee/Att/AttForm";
import DeleteButton from "@/Components/DeleteButton";

export default function AttList({ atts, users, projects ,showManual = true , customers}) {
    const user = usePage().props.auth.user;
    const role = user?.role;
    const [filters, setFilters] = useState({
        from:  new Date().toISOString().split('T')[0],
        to:  new Date().toISOString().split('T')[0],
    });
  const [selectedUser , setSelectedUser]= useState('')
  const [attendances, setAttendnces] = useState(atts)

  
  const filterAttendances = () => {
    const fromStr = filters.from;
    const toStr = filters.to;

    const filtered = atts.filter((att) => {
        const userMatch = selectedUser ? att.user_id == selectedUser : true;

        const attDateStr = new Date(att.check_in_time).toISOString().split('T')[0];

        const dateMatch = attDateStr >= fromStr && attDateStr <= toStr;

        return userMatch && dateMatch;
    });

    setAttendnces(filtered);
};





useEffect(() => {
    filterAttendances();
}, [filters, selectedUser, atts]);
    return (
       
        <AuthenticatedLayout>

        <AttFrom projects= {projects} users={users} showManual={showManual} customers={customers} />
        {role !== 'proj' &&
        
            <div className="max-w-7xl mx-auto p-6">

              

                <div className="flex items-center justify-between mb-6 mt-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {" "}
                     ..   الحضور والانصراف لكل الموظفين 
                    </h1>
                    <div className="flex items-center gap-2">
        <label>من:</label>
        <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters((prev) => ({ ...prev, from: e.target.value }))}
        />

        <label>إلى:</label>
        <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters((prev) => ({ ...prev, to: e.target.value }))}
        />
    </div>

                    <select name="user" id="user" value={selectedUser}  onChange={(e) => setSelectedUser(e.target.value)}  >
                    <option value="">اختر الموظف</option>
                    {users.map((user)=>(
                        <option value={user.id} key={user.id}>{user.name}</option>
                    ))}
                        
                    </select>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3 "> الموظف</th>
                                <th className="px-6 py-3 "> التاريخ</th>
                                <th className="px-6 py-3 ">المكان</th>
                                <th className="px-6 py-3 "> الوقت</th>
                                <th className="px-6 py-3 ">الانصراف</th>
                                <th className="px-6 py-3 ">- </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {attendances &&
                                attendances.map((att) => (
                                    <tr
                                        key={att.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            {att.user?.name}
                                        </td>
                                        <td className="px-6 py-4">
                                        { new Date(att.check_in_time).toLocaleDateString("ar-EG")} 
                                        </td>
                                        <td className="px-6 py-4">
                                            {att.project && 
                                            att.project?.name
                                            }
                                             {att.visit && 
                                            att.visit?.customer?.name
                                            }
                                             {att.type === 'internal' && 
                                            'داخل الشركة'
                                            }
                                             {att.type === 'external' && 
                                           att.customer
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                       { att.in_location !== null && new Date(att.check_in_time).toLocaleTimeString("en-US")} 
                                            {att.in_location !== 'غير محدد' && att.in_location !== null &&
                                            <a href={'https://www.google.com/maps?q='+  att?.in_location } target="_blank" className="text-blue-600 underline"> - لوكيشن
                                            </a>
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                        { att.out_location !== null &&  new Date(att.check_out_time).toLocaleTimeString("en-US")}  
                                            {att.out_location !== 'غير محدد' && att.out_location !== null &&
                                           
                                            <a href={'https://www.google.com/maps?q='+  att?.out_location } target="_blank" className="text-blue-600 underline" > - لوكيشن
                                            </a>
                                            }
                                        </td>
                                        
                                        <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                          
                                            <DeleteButton id={att.id} routeName = 'admin.att.delete' />
                                            
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        }
       
            </AuthenticatedLayout>
    );
}
