// resources/js/Pages/Employee/ProjectShow.jsx
import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Label,
    Textarea,
} from "flowbite-react";
import { useForm, usePage, router } from "@inertiajs/react";
import ProjectProgress from "./Projects/ProjectProgress";
import UserLayout from "@/Layouts/UserLayout";
export default function ProjectShow({ project, tasks, attendances }) {
    console.log(tasks, 'tasks')

    const attendance = attendances[project.id];
    const isCheckedIn = attendance && attendance.check_in_time;
    const isCheckedOut = attendance && attendance.check_out_time;
    const [openModal, setOpenModal] = useState(false);
    const [qtyDoneMap, setQtyDoneMap] = useState({});

    const { post, processing } = useForm();
    const [loading, setLoading] = useState(false);
    const { props } = usePage();
    const successMessage = props.flash.message;
    const {
        post: postProgress,
        processing: processingProgress,
        errors: Progresserrors,
    } = useForm();

    const handleSubmitProgress = (e, id) => {
        e.preventDefault();
        const qty = qtyDoneMap[id];
        if (!qty || qty <= 0) {
            alert("من فضلك أدخل كمية صحيحة");
            return;
          }
        router.post(
            route("employee.task.progress.store"),
            {
                task_id: id,
                quantity_done: qty,
            },
            {
                preserveScroll: true,
            }
        );
    };

    const handleComplete = (taskId) => {
        post(route("employee.tasks.complete", taskId));
    };

    const handleReportIssue = (taskId) => {
        setData("task_id", taskId);
        setData("project_id", project.id);
        setOpenModal(true);
    };
    const {
        data,
        setData,
        post: postIssue,
        processing: processingIssues,
        errors,
    } = useForm({
        task_id: "",
        description: "",
        project_id: "",
    });
    const handleSubmit = () => {
        postIssue(route("issues.store"), {
            onSuccess: (page) => {
                setOpenModal(false);
            },
        });
    };

    const handleCheckIn = (isCheckIn) => {
        setLoading(true);
        const routeName = isCheckIn
            ? "attendance.checkin"
            : "attendance.checkout";
        if (!navigator.geolocation) {
            alert("المتصفح لا يدعم تحديد الموقع");
            setLoading(false);
            router.post(
                route(routeName, project.id),

                { onFinish: () => setLoading(false) }
            );
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(position.coords);
                    router.post(
                        route(routeName, project.id),
                        { location: `${latitude},${longitude}` },
                        { onFinish: () => setLoading(false) }
                    );
                },
                (error) => {
                    alert("حدث خطأ أثناء تحديد الموقع");
                    router.post(
                        route(routeName, project.id),

                        { onFinish: () => setLoading(false) }
                    );
                    console.error(error);
                    setLoading(false);
                }
            );
        }
        setLoading(false);
    };

    return (
        <UserLayout>
        <div className="p-6">
            {successMessage && (
                <div className="bg-green-100 text-green-800 border border-green-300 p-2 rounded mt-4">
                    {successMessage}
                </div>
            )}

            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="mb-4">{project.description}</p>
            {!isCheckedOut && (
                <button
                    onClick={() => handleCheckIn(!isCheckedIn)}
                    disabled={processing}
                    className={`mt-2 px-4 py-2 rounded text-white ${
                        isCheckedIn ? "bg-red-600" : "bg-green-600"
                    }`}
                >
                    {isCheckedIn ? "تسجيل الانصراف" : "تسجيل الحضور"}
                </button>
            )}
            <hr className="m-3" />
            {isCheckedIn && (
                <p>
                    <b className="bg-[#dede] ml-2">تم الحضور :</b>

                    {attendance.check_in_time}
                    <a
                        href={
                            "https://www.google.com/maps?q=" +
                            attendance.in_location
                        }
                        target="_blank"
                        class="text-blue-600 underline"
                    >
                        عرض الموقع
                    </a>
                </p>
            )}
            {isCheckedOut && (
                <p>
                    <b className="bg-[#FF2D20]/10 ml-2">تم الانصراف :</b>

                    {attendance.check_out_time}
                    <a
                        href={
                            "https://www.google.com/maps?q=" +
                            attendance.out_location
                        }
                        target="_blank"
                        class="text-blue-600 underline"
                    >
                        عرض الموقع
                    </a>
                </p>
            )}
            <hr className="my-4" />
            <div>
                <h2 className="text-xl font-semibold mb-3"> فريق العمل</h2>
                <ul className="bg-white rounded shadow divide-y">
                    {project.users?.map((user) => (
                        <li key={user.id} className="p-3">
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>
            <hr className="my-4" />
            <h2 className="text-xl font-semibold mb-2">مهامي</h2>
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task.id} className="border p-4 rounded shadow">
                        <p className="font-bold">بند رقم {task.task.task_number}</p>
                        <h3 className="font-semibold">{task.task.title}</h3>
                        <p className="mb-2">{task.task.description}</p>
                        <h4 className="mb-2">
                           <b>  {task.task.quantity} -{" "}</b>
                            {task.task.unit === "number" && "عدد"}
                            {task.task.unit === "meter" && "متر"}
                            {task.task.unit === "collaborative" && "تعاونى"}

                            {task.task.users.map((usr) => (
                            <span className="border m-2" key={usr.id}>{usr.name} </span>
                        ))}
                        </h4>
                        <p>
                            الكمية اليومية المطلوبة:{" "}
                            <strong>
                                {task.task.DailyQuantity} {task.unit}
                            </strong>
                        </p>
                        <p>
                            تاريخ البدء :
                            <strong className="mr-2">
                                {task.task.start_date}
                            </strong>
                        </p>
                        <p>
                            تاريخ الانتهاء :
                            <strong className="mr-2">
                                {task.task.end_date}
                            </strong>
                        </p>
                        <p>
                            مدة البند:
                            <strong className="mr-2">
                                {task.task.duration_days} -{" "}
                            </strong>
                            <strong>يوم</strong>
                        </p>
                        {task.task.isBehindSchedule && (
                            <div className="my-4 bg-red-100 text-red-800 px-4 py-2 rounded">
                                ⚠️ أنت متأخر عن الخطة اليومية! حاول إنجاز
                                المزيد.
                            </div>
                        )}
                        <p>
                            اجمالى ما تم :
                            <strong className="mr-2">
                            {task.task.unit === "collaborative" ? 
                            task.task.total_done / task.task.users_count
                            :
                            task.task.total_done
                        }
                                -
                            </strong>
                            <strong>
                                {task.task.unit === "number" && "عدد"}
                                {task.task.unit === "meter" && "متر"}
                                {task.task.unit === "collaborative" && "تعاونى"}
                            </strong>
                        </p>

                        <p>
                            المتبقى:
                            <strong className="mr-2">
                                {task.task.remaining}-
                            </strong>
                            <strong>
                                {task.task.unit === "number" && "عدد"}
                                {task.task.unit === "meter" && "متر"}
                                {task.task.unit === "collaborative" && "تعاونى"}
                            </strong>
                        </p>
                        <div className="mt-2 space-x-2">
                            {task.task.remaining < 1 ? (
                                <button
                                    disabled
                                    className=" bg-green-500  px-3 py-1 rounded text-white"
                                >
                                    مكتمله
                                </button>
                            ) : (
                                <>
                                    <hr className="my-3" />
                                    <h2 className="text-lg font-bold mb-4">
                                        تسجيل تقدم في المهمة: {task.task.title}
                                    </h2>
                                    <form
                                        onSubmit={(e) =>
                                            handleSubmitProgress(
                                                e,
                                                task.task.id
                                            )
                                        }
                                        className="space-y-4"
                                    >
                                        <div>
                                            <input
                                                type="hidden"
                                                name="task_id"
                                                value={task.task.id}
                                            />
                                            <label className="block mb-1">
                                                الكمية المنجزة اليوم
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full border rounded px-3 py-2"
                                                value={qtyDoneMap[task.task.id] || ""}
                                                onChange={(e) =>
                                                    setQtyDoneMap({
                                                      ...qtyDoneMap,
                                                      [task.task.id]: e.target.value,
                                                    })
                                                  }
                                                min={1}
                                                required
                                            />
                                            {Progresserrors.quantity_done && (
                                                <div className="text-red-600">
                                                    {
                                                        Progresserrors.quantity_done
                                                    }
                                                </div>
                                            )}
                                            {Progresserrors.task_id && (
                                                <div className="text-red-600">
                                                    {Progresserrors.task_id}
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
                                            disabled={processing}
                                        >
                                            حفظ
                                        </button>
                                    </form>
                                </>
                            )}

                            {!task.task.remaining < 1 && (
                                <button
                                    onClick={() =>
                                        handleReportIssue(task.task.id)
                                    }
                                    className="mt-1 bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    الإبلاغ عن مشكلة
                                </button>
                            )}
                            <hr className="my-3" />
                            <Modal
                                show={openModal}
                                onClose={() => setOpenModal(false)}
                            >
                                <ModalHeader> الإبلاغ عن مشكلة </ModalHeader>
                                <ModalBody>
                                    <div className="space-y-6">
                                        <form method="POST">
                                            <Textarea
                                                name="description"
                                                className="w-full border p-2"
                                                placeholder="اشرح المشكلة هنا..."
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                            ></Textarea>
                                            {errors.task_id && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.task_id}
                                                </div>
                                            )}
                                            {errors.description && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.description}
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={handleSubmit}>
                                        الإبلاغ
                                    </Button>
                                    <Button
                                        color="gray"
                                        onClick={() => setOpenModal(false)}
                                    >
                                        إغلق
                                    </Button>
                                </ModalFooter>
                            </Modal>

                            <ProjectProgress task={task.task} />
                        
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </UserLayout>
    );
}
