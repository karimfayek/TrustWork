import AdvancesList from './AdvancesList';
import ExpensesList from './ExpensesList';
import DeductionsList from './DeductionsList';
import AdvanceForm from './AdvanceForm';
import ExpenseForm from './ExpenseForm';
import DeductionForm from './DeductionForm';
import { useForm } from '@inertiajs/react';

export default function FinancialCustodySection({
    totalAdvance,
    totalExpense,
    remaining,
    pendingAdvances,
    acceptedAdvances,
    expenses,
    deductions,
    userId
}) {
    const {
        data: advanceData,
        setData: setAdvanceData,
        post: postAdvance,
        processing: processingAdvance,
        reset: resetAdvance,
        errors: advanceErrors,
    } = useForm({
        amount: "",
        note: "",
        user_id: userId,
    });

    const {
        data: expenseData,
        setData: setExpenseData,
        post: postExpense,
        processing: processingExpense,
        reset: resetExpense,
        errors: expenseErrors,
    } = useForm({
        amount: "",
        description: "",
        user_id: userId,
    });

    const {
        data: deductionData,
        setData: setDeductionData,
        post: postDeduction,
        processing: processingDeduction,
        reset: resetDeduction,
        errors: deductionErrors,
    } = useForm({
        amount: "",
        note: "",
        type: "",
        user_id: userId,
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">العهدة المالية</h1>

            <FinancialSummary 
                totalAdvance={totalAdvance}
                totalExpense={totalExpense}
                remaining={remaining}
            />

            <div className="md:grid grid-cols-3 gap-6" id="advances">
                <AdvancesList 
                    advances={pendingAdvances}
                    type="pending"
                    onDelete={handleDeleteAdvance}
                    onApprove={handleApproveClick}
                    onReject={handleStatusAdvance}
                    onUpdate={updatePendingAdvance}
                />
                
                <AdvancesList 
                    advances={acceptedAdvances}
                    type="accepted"
                    onDelete={handleDeleteAdvance}
                />
                
                <ExpensesList expenses={expenses} />
                
                <DeductionsList deductions={deductions} />
            </div>

            <div className="mt-10 md:grid grid-cols-3 gap-6">
                <AdvanceForm
                    data={advanceData}
                    setData={setAdvanceData}
                    errors={advanceErrors}
                    processing={processingAdvance}
                    onSubmit={(e) => {
                        e.preventDefault();
                        postAdvance(route("employee.advance.store"), {
                            preserveScroll: true,
                            onSuccess: () => resetAdvance(),
                        });
                    }}
                />
                
                <ExpenseForm
                    data={expenseData}
                    setData={setExpenseData}
                    errors={expenseErrors}
                    processing={processingExpense}
                    onSubmit={(e) => {
                        e.preventDefault();
                        postExpense(route("employee.expense.store"), {
                            preserveScroll: true,
                            onSuccess: () => resetExpense(),
                        });
                    }}
                />
                
                <DeductionForm
                    data={deductionData}
                    setData={setDeductionData}
                    errors={deductionErrors}
                    processing={processingDeduction}
                    onSubmit={(e) => {
                        e.preventDefault();
                        postDeduction(route("admin.deduction.store"), {
                            preserveScroll: true,
                            onSuccess: () => resetDeduction(),
                        });
                    }}
                />
            </div>
        </div>
    );
}

const FinancialSummary = ({ totalAdvance, totalExpense, remaining }) => (
    <div className="mb-6">
        <p><strong>إجمالي العهدة:</strong> {totalAdvance} ج</p>
        <p><strong>إجمالي المصروفات:</strong> {totalExpense} ج</p>
        <p><strong>المتبقي:</strong> {remaining} ج</p>
    </div>
);