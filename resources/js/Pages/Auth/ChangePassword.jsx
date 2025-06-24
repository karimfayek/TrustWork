import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ChangePassword() {
    const { data, setData, post, processing, errors } = useForm({
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("password.update.first"));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl p-16">
            <h2 className="text-xl font-bold mb-4">تغيير كلمة السر</h2>
            
            <div>
                <InputLabel value="كلمة السر الجديدة" />
                <TextInput
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="mt-1 block w-full"
                />
                <InputError message={errors.password} />
            </div>

            <div className="mt-4">
                <InputLabel value="تأكيد كلمة السر" />
                <TextInput
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData("password_confirmation", e.target.value)}
                    className="mt-1 block w-full"
                />
                <InputError message={errors.password_confirmation} />
            </div>

            <div className="mt-6">
                <PrimaryButton disabled={processing}>تحديث</PrimaryButton>
            </div>
        </form>
    );
}
