import React, { useState } from "react";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteButton from "@/Components/DeleteButton";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Label,
    Textarea,
} from "flowbite-react";
import axios from "axios";
export default function ExtractionList({ project }) {
    const logedinUser = usePage().props.auth.user;
    const extractionTypes = {
        partial: "جاري ",
        final: " ختامي",
        supply: " جارى تشوينات",
        delevery: "  اذن تسليم",
        report: " محضر تسليم",
        site_receipt: " محضر استلام موقع",
        ir: " IR",
        mir: " MIR",
        qs: " QS",
    };
    const [showPicModal, setShowPicModal] = useState(false);
    const [showMdal, setHandleShowModal] = useState(false);
    const [extraction, setExtraction] = useState("");
    const [picSrc, setPicSrc] = useState("");
    const { data, setData, post, processing } = useForm({
        file: null,
    });
    const handleShowModal = (id) => {
        setHandleShowModal(true);
        setExtraction(id);
    };
    const handleShowPicModal = (src) => {
        setPicSrc(src);
        setShowPicModal(true);
    };
    const handleSubmit = () => {
        if (!data.file) {
            alert("Please upload a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", data.file);

        post(route("extraction.file.upload", extraction), formData, {
            forceFormData: true,
            onSuccess: () => {
                console.log("رفع الملف نجح");
                setHandleShowModal(false); // إغلاق المودال بعد النجاح
            },
            onError: () => {
                alert("حدث خطأ أثناء رفع الملف");
            },
        });
        setHandleShowModal(false);
    };
    const onToggle = (newValue, id) => {
        router.post(route("extraction.collected.set", id), {
            is_collected: newValue,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />
            {showMdal && (
                <Modal
                    show={showMdal}
                    onClose={() => setHandleShowModal(false)}
                >
                    <ModalHeader> رفع مرفق </ModalHeader>
                    <ModalBody>
                        <div className="space-y-4 mt-4">
                            <input
                                type="file"
                                onChange={(e) =>
                                    setData("file", e.target.files[0])
                                }
                                className={"w-full"}
                                required
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="green" onClick={handleSubmit}>
                            حفظ
                        </Button>
                        <Button
                            color="gray"
                            onClick={() => setHandleShowModal(false)}
                        >
                            إلغاء
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
            {showPicModal && (
                <Modal
                    show={showPicModal}
                    onClose={() => setShowPicModal(false)}
                >
                    <ModalHeader> عرض مرفق </ModalHeader>
                    <ModalBody>
                        <div className="space-y-4 mt-4">
                            {picSrc && (
                                <>
                                    {picSrc.endsWith(".pdf") ? (
                                        <iframe
                                            src={`/private-storage/${picSrc}`}
                                            width="100%"
                                            height="500px"
                                            className="border rounded"
                                        ></iframe>
                                    ) : (
                                        <img
                                            src={`/private-storage/${picSrc}`}
                                            alt="preview"
                                            className="max-w-full h-auto rounded shadow"
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="gray"
                            onClick={() => setShowPicModal(false)}
                        >
                            إلغاء
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        المستخلصات
                        <br />
                        <p className="text-2xl text-gray-400">{project.name}</p>
                    </h1>

                    <Link
                        href={route("project.extractions.new", project.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow"
                    >
                        + إنشاء مستخلص جديد
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr className="text-right">
                                <th className="px-6 py-3 "> النوع</th>
                                <th className="px-6 py-3 ">رقم</th>
                                <th className="px-6 py-3 ">التاريخ</th>
                                {logedinUser.email !==
                                    "sherok@trustits.net" && (
                                    <>
                                        <th className="px-6 py-3 ">
                                            صافى المستخلص
                                        </th>
                                    </>
                                )}
                                <th className="px-6 py-3 "> تم التحصيل ؟</th>

                                <th className="px-6 py-3 "> مرفق</th>
                                <th className="px-6 py-3 ">- </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {project.extractions?.map((extraction) => (
                                <tr
                                    key={extraction.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        {extractionTypes[extraction.type]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {extraction.partial_number}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {extraction.date}
                                    </td>
                                    {logedinUser.email !==
                                        "sherok@trustits.net" && (
                                        <td className="px-6 py-4 text-gray-600">
                                            {extraction.net_total}
                                        </td>
                                    )}
                                    {extraction.is_collected ? (
                                        <td className="px-6 py-4 text-green-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="green"
                                                className="size-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m4.5 12.75 6 6 9-13.5"
                                                />
                                            </svg>
                                            <button
                                                onClick={() =>
                                                    onToggle(
                                                        false,
                                                        extraction.id,
                                                    )
                                                }
                                                className="ml-4 px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                                            >
                                                إلغاء التحصيل
                                            </button>
                                        </td>
                                    ) : (
                                        <td className="px-6 py-4 text-gray-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="red"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="red"
                                                className="size-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18 18 6M6 6l12 12"
                                                />
                                            </svg>
                                            <button
                                                onClick={() =>
                                                    onToggle(
                                                        true,
                                                        extraction.id,
                                                    )
                                                }
                                                className="ml-4 px-2 py-1 text-sm bg-green-100 hover:bg-green-200 rounded"
                                            >
                                                تم التحصيل
                                            </button>
                                        </td>
                                    )}
                                    <td className="px-6 py-4 text-gray-600">
                                        {extraction.file ? (
                                            <button
                                                onClick={() =>
                                                    handleShowPicModal(
                                                        extraction.file,
                                                    )
                                                }
                                            >
                                                عرض
                                            </button>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                        <button
                                            onClick={(e) =>
                                                handleShowModal(extraction.id)
                                            }
                                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            مرفق
                                        </button>
                                        <Link
                                            href={route("extractions.preview", [
                                                project.id,
                                                extraction.id,
                                            ])}
                                            className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            عرض
                                        </Link>
                                        <Link
                                            href={route("extractions.edit", [
                                                project.id,
                                                extraction.id,
                                            ])}
                                            className="inline-block bg-blue-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium"
                                        >
                                            تعديل
                                        </Link>
                                        {logedinUser.email !==
                                            "sherok@trustits.net" && (
                                            <DeleteButton
                                                id={extraction.id}
                                                routeName="extraction.delete"
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
