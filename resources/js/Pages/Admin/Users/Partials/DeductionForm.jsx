import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function DeductionForm({ data, setData, errors, processing, onSubmit }) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">إضافة مصروف </h3>
            <form onSubmit={onSubmit}>
                <div className="mb-2">
                    <InputLabel htmlFor="amount" value="المبلغ" />
                    <TextInput
                        id="amount"
                        type="number"
                        value={data.amount}
                        onChange={(e) => setData("amount", e.target.value)}
                        className="w-full"
                    />
                    <InputError message={errors.amount} className="mt-1" />
                </div>
                
                <div className="mb-2">
                    <InputLabel htmlFor="note" value="ملاحظة" />
                    <TextInput
                        id="note"
                        type="text"
                        value={data.note}
                        onChange={(e) => setData("note", e.target.value)}
                        className="w-full"
                    />
                    <InputError message={errors.note} className="mt-1" />
                </div>
                
                <PrimaryButton disabled={processing} className="w-full justify-center">
                    حفظ المصروف
                </PrimaryButton>
            </form>
        </div>
    );
}