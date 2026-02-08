import ApplicationLogo from "@/Components/ApplicationLogo";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function ExtractionPreview({ project, extraction }) {
    const logedinUser = usePage().props.auth.user;
    const type = extraction.type;
    const supply = extraction.supply;
    const isNotInclusive = extraction.isnotinclusive;
    const num = extraction.partial_number;
    const date = extraction.date;
    const customer = project.customer_name;
    const projectCode = project.project_code;
    const items = extraction.items;
    const deductions = extraction.deductions_json;

    const totalCost = items.reduce((acc, task) => {
        return acc + parseFloat(task.total);
    }, 0);
    const totalWithoutVat = isNotInclusive
        ? totalCost
        : !supply && deductions.vat > 0
          ? totalCost / 1.05
          : totalCost;
    const VatValue = !isNotInclusive
        ? (totalWithoutVat / 100) * deductions.vat
        : 0;
    const profitTax = (totalWithoutVat / 100) * deductions.profit_tax;
    const socialInsurance = (totalCost / 100) * deductions.social_insurance;
    const initialInsurance = (totalCost / 100) * deductions.initial_insurance;
    const otherTax = (totalCost / 100) * deductions.other_tax;
    const previousPayment = deductions.previous_payments;
    const advancePayment = deductions.advance_payment;

    const addOrMinus = !isNotInclusive ? "خصم" : "";
    const netTotal = !isNotInclusive
        ? VatValue +
          totalWithoutVat -
          profitTax -
          socialInsurance -
          initialInsurance -
          otherTax -
          previousPayment -
          advancePayment
        : totalCost -
          profitTax -
          socialInsurance -
          initialInsurance -
          previousPayment -
          advancePayment +
          VatValue +
          otherTax;

    const extractionTypes = {
        partial: "جاري ",
        final: " ختامي",
        supply: " جارى تشوينات",
        delevery: "  اذن تسليم",
        ir: " IR",
        mir: " MIR",
        qs: " QS",
    };
    console.log(type !== "delevery", "type");
    const isError = () => {
        const parse = (val) => Number(String(val).replace(/,/g, ""));

        const diff =
            parse(totalCost) -
            parse(profitTax) -
            parse(socialInsurance) -
            parse(project.advance_payment) -
            parse(initialInsurance) -
            parse(previousPayment) -
            parse(otherTax) -
            parse(netTotal);

        return type === "final" && Math.abs(diff) > 0.1; // هامش خطأ صغير
    };
    return (
        <AuthenticatedLayout>
            <div className=" mx-auto bg-white p-6 rounded-2xl  text-gray-800">
                <Link href={"/"}>
                    <ApplicationLogo className="float-left w-[8rem]" />
                </Link>

                <div className="mb-4">
                    <p>
                        <strong>اسم المشروع:</strong> {project.name}
                    </p>
                    <p>
                        <strong>اسم العميل:</strong> {customer}
                    </p>
                    <p>
                        <strong>كود المشروع:</strong> {projectCode}
                    </p>
                    {type === "delevery" && (
                        <p>
                            <strong> سيريال:</strong> {extraction.id}
                        </p>
                    )}
                    {type !== "delevery" &&
                        type !== "report" &&
                        type !== "qs" &&
                        type !== "ir" &&
                        type !== "mir" && (
                            <p>
                                <strong> مستخلص:</strong>{" "}
                                {extractionTypes[type]} <i>{num}</i>{" "}
                                {extraction.supply === 1 && <i>تشوينات</i>}{" "}
                            </p>
                        )}
                    {type === "delevery" && (
                        <p className="text-center text-xl">
                            <strong> اذن تسليم</strong>{" "}
                        </p>
                    )}
                    {type === "report" && (
                        <p className="text-center text-xl">
                            <strong> محضر استلام موقع </strong>{" "}
                        </p>
                    )}
                    <p>
                        <strong>تاريخ الطلب:</strong> {date}
                    </p>
                </div>
                <div className="mb-[100px]">
                    <h2 className="text-xl font-semibold border-b pb-2 mb-2">
                        البنود
                    </h2>
                    <table className="min-w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border" rowSpan="2">
                                    م
                                </th>
                                <th className="p-2 border" rowSpan="2">
                                    بيان الأعمال
                                </th>
                                <th className="p-2 border" rowSpan="2">
                                    الوحــدة
                                </th>
                                <th className="p-2 border" rowSpan="2">
                                    كمية العقد
                                </th>
                                {(type === "delevery" ||
                                    type === "report" ||
                                    type === "mir") && (
                                    <>
                                        <th className="p-2 border" colSpan="3">
                                            {(type === "delevery" ||
                                                type === "report") && (
                                                <>كميه التسليم</>
                                            )}
                                            {type === "mir" && <>كميه الفحص</>}
                                        </th>
                                    </>
                                )}
                                {type !== "delevery" &&
                                    type !== "report" &&
                                    type !== "qs" &&
                                    type !== "ir" &&
                                    type !== "mir" && (
                                        <>
                                            <th
                                                className="p-2 border"
                                                colSpan="3"
                                            >
                                                الكمية
                                            </th>
                                            {logedinUser.email !==
                                                "sherok@trustits.net" && (
                                                <th
                                                    className="p-2 border"
                                                    rowSpan="2"
                                                >
                                                    الفئة
                                                </th>
                                            )}
                                            <th
                                                className="p-2 border"
                                                rowSpan="2"
                                            >
                                                نسبة الصرف
                                            </th>
                                            {logedinUser.email !==
                                                "sherok@trustits.net" && (
                                                <th
                                                    className="p-2 border"
                                                    rowSpan="2"
                                                >
                                                    إجمالي المبلغ
                                                </th>
                                            )}
                                        </>
                                    )}
                            </tr>
                            {type !== "delevery" &&
                                type !== "report" &&
                                type !== "qs" &&
                                type !== "ir" &&
                                type !== "mir" && (
                                    <tr>
                                        <th className="p-2 border"> السابق</th>
                                        <th className="p-2 border"> الحالي</th>
                                        <th className="p-2 border">
                                            {" "}
                                            الإجمالي
                                        </th>
                                    </tr>
                                )}
                        </thead>
                        <tbody>
                            {items?.map((task, index) => (
                                <tr key={index}>
                                    <td className="p-2 border text-right">
                                        {index + 1}
                                    </td>
                                    <td className="p-2 border text-right">
                                        {task.title}
                                    </td>
                                    <td className="p-2 border text-center">
                                        {task.unit === "meter"
                                            ? "MTR"
                                            : task.unit === "number"
                                              ? "NUM"
                                              : task.unit === "ls"
                                                ? "LS"
                                                : task.unit}
                                    </td>
                                    <td className="p-2 border text-center">
                                        {Number(task.quantity).toFixed(0)}
                                    </td>
                                    {(type === "delevery" ||
                                        type === "report" ||
                                        type === "mir") && (
                                        <td className="p-2 border text-center">
                                            {task.current_done}
                                        </td>
                                    )}
                                    {type !== "delevery" &&
                                        type !== "report" &&
                                        type !== "qs" &&
                                        type !== "ir" &&
                                        type !== "mir" && (
                                            <>
                                                <td className="p-2 border text-center">
                                                    {" "}
                                                    {task.previous_done}
                                                </td>
                                                <td className="p-2 border text-center">
                                                    {task.current_done}
                                                </td>
                                                <td className="p-2 border text-center">
                                                    {task.total_done}
                                                </td>
                                                {logedinUser.email !==
                                                    "sherok@trustits.net" && (
                                                    <td className="p-2 border text-center">
                                                        {task.unit_price}
                                                    </td>
                                                )}
                                                <td className="p-2 border text-center">
                                                    {" "}
                                                    {task.progress_percentage} %
                                                </td>
                                                {logedinUser.email !==
                                                    "sherok@trustits.net" && (
                                                    <td className="p-2 border text-center">
                                                        {task.total}
                                                    </td>
                                                )}
                                            </>
                                        )}
                                </tr>
                            ))}
                            {type !== "delevery" &&
                                type !== "report" &&
                                type !== "qs" &&
                                type !== "ir" &&
                                type !== "mir" && (
                                    <React.Fragment>
                                        {logedinUser.email !==
                                            "sherok@trustits.net" && (
                                            <tr>
                                                <td
                                                    colSpan={9}
                                                    className="p-2 border text-center"
                                                >
                                                    الإجمالى{" "}
                                                </td>
                                                <td className="p-2 border text-center">
                                                    {totalCost.toLocaleString(
                                                        "en-US",
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        },
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                        {isNotInclusive == true &&
                                            VatValue > 0 &&
                                            logedinUser.email !==
                                                "sherok@trustits.net" && (
                                                <tr>
                                                    <td
                                                        colSpan={9}
                                                        className="p-2 border text-center"
                                                    >
                                                        ضريبه القيمه
                                                        المضافة{" "}
                                                    </td>
                                                    <td className="p-2 border text-center">
                                                        {VatValue.toLocaleString(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            },
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        {!supply &&
                                            !isNotInclusive &&
                                            deductions.vat > 0 &&
                                            logedinUser.email !==
                                                "sherok@trustits.net" && (
                                                <tr>
                                                    <td
                                                        colSpan={9}
                                                        className="p-2 border text-center"
                                                    >
                                                        {" "}
                                                        الاجمالي بدون الضريبة
                                                        المضافة {deductions.vat}
                                                        %{" "}
                                                    </td>
                                                    <td className="p-2 border text-center">
                                                        {totalWithoutVat.toLocaleString(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            },
                                                        )}
                                                    </td>
                                                </tr>
                                            )}

                                        {deductions.profit_tax > 0 &&
                                            logedinUser.email !==
                                                "sherok@trustits.net" && (
                                                <tr>
                                                    <td
                                                        colSpan={9}
                                                        className="p-2 border text-center"
                                                    >
                                                        {" "}
                                                        {addOrMinus}{" "}
                                                        {deductions.profit_tax}{" "}
                                                        % ضريبة{" "}
                                                    </td>
                                                    <td className="p-2 border text-center">
                                                        {profitTax.toLocaleString(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            },
                                                        )}
                                                    </td>
                                                </tr>
                                            )}

                                        {deductions.social_insurance > 0 &&
                                            logedinUser.email !==
                                                "sherok@trustits.net" && (
                                                <tr>
                                                    <td
                                                        colSpan={9}
                                                        className="p-2 border text-center"
                                                    >
                                                        {" "}
                                                        تعليه التأمينات
                                                        الاجتماعيه{" "}
                                                    </td>
                                                    <td className="p-2 border text-center">
                                                        {socialInsurance.toLocaleString(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            },
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        {deductions.advance_payment > 0 &&
                                            logedinUser.email !==
                                                "sherok@trustits.net" && (
                                                <tr>
                                                    <td
                                                        colSpan={9}
                                                        className="p-2 border text-center"
                                                    >
                                                        خصم دفعة مقدمة{" "}
                                                    </td>
                                                    <td className="p-2 border text-center">
                                                        {deductions.advance_payment.toLocaleString(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            },
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        {initialInsurance > 0 &&
                                            logedinUser.email !==
                                                "sherok@trustits.net" && (
                                                <tr>
                                                    <td
                                                        colSpan={9}
                                                        className="p-2 border text-center"
                                                    >
                                                        {" "}
                                                        {addOrMinus}{" "}
                                                        {
                                                            deductions.initial_insurance
                                                        }{" "}
                                                        % تامين اعمال{" "}
                                                    </td>
                                                    <td className="p-2 border text-center">
                                                        {initialInsurance.toLocaleString(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            },
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        {previousPayment > 0 &&
                                            logedinUser.email !==
                                                "sherok@trustits.net" && (
                                                <tr>
                                                    <td
                                                        colSpan={9}
                                                        className="p-2 border text-center"
                                                    >
                                                        خصم ما سبق صرفه
                                                    </td>
                                                    <td className="p-2 border text-center">
                                                        {previousPayment.toLocaleString(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            },
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        {otherTax > 0 &&
                                            logedinUser.email !==
                                                "sherok@trustits.net" && (
                                                <tr>
                                                    <td
                                                        colSpan={9}
                                                        className="p-2 border text-center"
                                                    >
                                                        {" "}
                                                        ضرائب{" "}
                                                        {
                                                            deductions.other_tax
                                                        }{" "}
                                                        %{" "}
                                                    </td>
                                                    <td className="p-2 border text-center">
                                                        {otherTax.toLocaleString(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            },
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        {logedinUser.email !==
                                            "sherok@trustits.net" && (
                                            <tr>
                                                <td
                                                    colSpan={9}
                                                    className="p-2 border text-center"
                                                >
                                                    {" "}
                                                    صافي المستخلص{" "}
                                                </td>

                                                <td className="p-2 border text-center">
                                                    {netTotal.toLocaleString(
                                                        "en-US",
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        },
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                )}

                            <tr>
                                <td
                                    colSpan={4}
                                    className="p-2 border text-right min-h-7"
                                >
                                    {" "}
                                    ملاحظات :{extraction.notes}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {(type === "delevery" || type === "report") && (
                        <div className="mt-10">
                            <p className="tet-center">
                                تم استلام الموقع استلامًا ابتدائيًا مع وجود بعض
                                الملاحظات البسيطة التي لا تعوق بدء الأعمال، على
                                أن يتم تلافيها أثناء التنفيذ
                            </p>
                            <div className="flex flex-row justify-between">
                                <div className="mt-9">
                                    <p>التسليم (شركة تراست)</p>
                                    <p>الإسم : .....................</p>
                                    <p>الوظيفة : .....................</p>
                                    <p>التوقيع : .....................</p>
                                </div>
                                <div className="mt-9">
                                    <p>المستلم ({customer} )</p>
                                    <p>الإسم : .....................</p>
                                    <p>الوظيفة : .....................</p>
                                    <p>التوقيع : .....................</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => window.print()}
                    className="print:hidden fixed bottom-0 left-0 right-0 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                >
                    طباعة
                </button>
            </div>
        </AuthenticatedLayout>
    );
}
