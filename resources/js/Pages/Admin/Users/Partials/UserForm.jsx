import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import { useForm, usePage } from '@inertiajs/react';
import React, { useState } from "react";

export default function UserForm({ user, allRoles }) {
    const basicSalary = user?.salary?.final_salary * .65 || ''
    const { data, setData, post, processing, errors } = useForm({
        name: user?.name || "",
        role: user?.role || "",
        final_salary: user?.salary?.final_salary || "",
        base_salary: user?.salary?.base_salary || "",
        email: user?.email || "",
        password: "",
        phone: user?.phone || '',
        status: user?.status ,
        hire_date: user?.hire_date || '',
        offdayestype: user?.offdayestype || '',
        must_change_password: user.must_change_password,
        roles: user?.roles || [],
    });

    const logedinUser = usePage().props.auth.user
    console.log(logedinUser, 'logeninuser')
    const handleRolesChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
        setData((prevData) => ({
            ...prevData,
            roles: selected
        }));
    };
    const handleSalaryChange = (final) => {
        if (!isNaN(final)) {
            setData((prevData) => ({
                ...prevData,
                final_salary: final,
                base_salary: final * 0.65,
            }));
        } else {
            // لو أدخل نص غير صالح (مثلاً حروف)، ثبت القيمة فقط بدون حساب
            setData("final_salary", final);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.user.update", user.id));
    };
const [showSalary , setShowSalray] = useState(false)
const handleShowSalary = (e) => {
    e.preventDefault()
    setShowSalray(!showSalary)
}
    return (
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div>
                <InputLabel htmlFor="name" value="اسم الموظف" />
                <TextInput
                    id="name"
                    type="text"
                    value={data.name}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="email" value="الايميل" />
                <TextInput
                    id="email"
                    type="text"
                    value={data.email}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="phone" value="رقم التليفون " />
                <TextInput
                    id="phone"
                    type="text"
                    value={data.phone}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('phone', e.target.value)}
                />
                <InputError message={errors.phone} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="hire_date" value="تاريخ التعيين  " />
                <TextInput
                    id="hire_date"
                    type="date"
                    value={data.hire_date}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('hire_date', e.target.value)}
                />
                <InputError message={errors.hire_date} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="role" value="الدور" />
                <select multiple value={data.roles} onChange={handleRolesChange}
                    className="w-1/2 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 block "
                >
                    {allRoles && allRoles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.name}
                        </option>
                    ))}
                </select>

                <InputError message={errors.roles} className="mt-2" />
            </div>
                    <div>
                        <p>{user.role} </p>
                    </div>
            <div>
                <InputLabel htmlFor="password" value="الباسورد" />
                <TextInput
                    id="password"
                    type="text"
                    value={data.password}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
            </div>
            <button onClick={(e )=> (handleShowSalary(e))} className="underline cursor-pointer">المرتب</button>
            {['acc', 'admin'].some(role => logedinUser?.rolesnames?.includes(role))
                &&
                <React.Fragment>
                    {showSalary && 
                    <>
                    <div>
                            <InputLabel htmlFor="final_salary" value="الراتب النهائى" />
                            <TextInput
                                id="final_salary"
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                value={data.final_salary}
                                className="mt-1 block w-full"
                                onChange={(e) => handleSalaryChange(e.target.value)} />
                            <InputError message={errors.final_salary} className="mt-2" />
                        </div><div>
                                <InputLabel htmlFor="base_salary" value="الراتب الاساسى" />
                                <TextInput
                                    id="base_salary"
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    value={data.base_salary}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("base_salary", e.target.value)}
                                    readOnly />
                                <InputError message={errors.base_salary} className="mt-2" />
                            </div><div>
                                <InputLabel htmlFor="base_salary" value=" المتغير" />
                                <TextInput
                                    id="base_salary"
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    value={Number(data.final_salary) - Number(data.base_salary)}
                                    className="mt-1 block w-full"
                                    readOnly />
                                <InputError message={errors.base_salary} className="mt-2" />
                            </div></>
                    }
                </React.Fragment>
            }

            <div className="mt-4">
                <label className="flex items-center">
                    <select value={data.offdayestype}
                    required
                        onChange={(e) => setData("offdayestype", e.target.value)}
                        className="w-full"
                    >
                        <option value="" disabled selected>ايام الاجازات</option>
                        <option value="1" > جمعه</option>
                        <option value="2" > جمعه + سبت</option>
                    </select>
                </label>
            </div>
            <div className="mt-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={data.must_change_password}
                        onChange={(e) => setData("must_change_password", e.target.checked)}
                    />
                    <span className="mr-2 text-sm text-gray-600">تغيير كلمة السر عند أول دخول</span>
                </label>
            </div>

              <div className="mt-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={data.status}
                        onChange={(e) => setData("status", e.target.checked)}
                    />
                    <span className="mr-2 text-sm text-gray-600">   نشط ؟  </span>
                </label>
            </div>

            <div>
                <PrimaryButton
                    className="w-full justify-center bg-green-600 hover:bg-green-500"
                    disabled={processing}
                >
                    حفظ
                </PrimaryButton>
            </div>
        </form>
    );
}