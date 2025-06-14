import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { quizDetails } from '../../../../Redux/Features/Instructor/Quizes/QuizesDetaiksSlice';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SharedModal from '../../../../Shared/SharedModal/SharedModal';
import { updateQuizesTitle } from '../../../../Redux/Features/Instructor/Quizes/QuizesUpdateSlice';
import updateImg from '../../../../assets/images/QuestionUpdateIcon.svg'


export default function QuizzesDetails() {
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

    const [isChecked, setIsChecked] = useState(false);
    const { quizzId } = useParams();
    console.log('quizId:', quizzId);

    const dispatch = useDispatch();
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    //   const dispatch = useDispatch();
    //   const { data } = useSelector((state) => state.quizDetailsData) || {};
    // console.log(data);

    //   useEffect(() => {
    //       dispatch(quizDetails());
    //   }, [dispatch]);
    // Get the Details of Question
    // const { data, loading, error } = useSelector(state => state.quizDetailsData) || {};
    // console.log(data);
    const { details, loading, error } = useSelector(state => state.quizDetailsData) || {};
    console.log(details);

    // useEffect(() => {
    //     if (quizzId) {
    //         dispatch(quizDetails(quizzId));
    //     }
    // }, [dispatch, quizzId]);
    // useEffect(() => {
    //     console.log("Fetching quiz details for quizzId:", quizzId);

    //     if (quizzId) {
    //         dispatch(quizDetails(quizzId))
    //             .then((data) => {
    //                 console.log("Quiz details data:", data);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching quiz details:", error);
    //             });
    //     }
    // }, [dispatch, quizzId]);
    useEffect(() => {
        console.log("Fetching quiz details for quizzId:", quizzId);

        const fetchQuizDetails = async () => {
            try {
                const response = await dispatch(quizDetails(quizzId));
                console.log("Quiz details data:", response.payload);
            } catch (error) {
                console.error("Error fetching quiz details:", error);
            }
        };

        if (quizzId) {
            fetchQuizDetails();
        }
    }, [dispatch, quizzId]);
    // ******* Modals***********
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add'); // 'add' or 'update'
    const [quizId, setQuizId] = useState(0);

    //Modal --- Upadte the Answer
    const openUpdateModal = (quiz) => {
        setModalType('update');

        // Check if question._id exists before setting the value
        if (quiz._id !== undefined) {
            setQuizId(quiz._id);
            setValue("title", quiz.title || ''); // Set the answer if available
            setIsModalOpen(true);
        } else {
            console.error('Quiz ID is undefined:', quiz);
        }
    };
    // Close
    const closeModal = () => {
        setIsModalOpen(false);
        setModalType('add'); // Reset modal type to 'add' when closing
    };


    // Update the Answer
    const handleUpdateTitle = async () => {
        try {
            const updatedTitle = getValues("title");

            // Ensure quizId is defined before dispatching
            if (quizId !== undefined) {
                await dispatch(updateQuizesTitle({ quizesId: quizId, newTitle: updatedTitle }));
                // Optionally, you can handle success here
                // dispatch(quizDetails());
                closeModal();
            } else {
                throw new Error("quizId is undefined");
            }
        } catch (error) {
            // Handle error
            console.error("Error updating quiz title:", error);
        }
    };

    return (
        <>
            <div className="flex items-center mb-10 ">
                <p className="mr-2 text-base pl-6">
                    <Link to="/dashboard/quizzes" className="text-black no-underline">
                        Quizes
                    </Link>
                </p>
                <p className="mr-2 text-base">/</p>
                <p className="text-base text-blue-800">Quizzes Details</p>
            </div>
            {details && (
                <div key={details._id} className="flex items-center justify-center  bg-white">
                    <div className="w-full md:w-1/2 p-12 bg-white border rounded-xl border-stone-400 text-slate-950">
                        <p className="text-slate-950 pb-5 font-semibold " style={{ fontWeight: 700 }}>{details?.title}</p>
                        {/* <input type="time" style={{ marginRight: '10px' }} />
                        <input type="date" /> */}
                        <div className="bg-white border-white rounded-md pr-2 ">{new Date(details.schadule).toLocaleString()}</div>

                        <div className="flex justify-between rounded-md border border-gray-300 w-80 m-2">
                            <div className="bg-orange-100 w-60  rounded-md border pl-5 border-orange-100 ">Duration</div>
                            <div className="bg-white  border-white rounded-md pr-2 ">{details?.duration}</div>
                        </div>
                        <div className="flex justify-between rounded-md border border-gray-300 w-80 m-2 ">
                            <div className="bg-orange-100 w-60 rounded-md border pl-5 border-orange-100 ">Num of questions</div>
                            <div className="bg-white  border-white rounded-md pr-2 ">{details?.questions_number}</div>
                        </div>
                        <div className="flex justify-between rounded-md border border-gray-300 w-80 m-2 ">
                            <div className="bg-orange-100 w-60 rounded-md border pl-5 border-orange-100 ">Score per question</div>
                            <div className="bg-white  border-white rounded-md pr-2 ">{details?.score_per_question}</div>
                        </div>
                        <div className=" rounded-md border border-gray-300 w-80 m-2 ">
                            <div className="bg-orange-100 w-80  rounded-md border pl-5 border-orange-100 ">Description</div>
                            <div className="bg-white  border-white rounded-md pr-2 pl-2">{details?.description}</div>
                        </div>
                        <div className="flex justify-between rounded-md border border-gray-300 w-80 m-2">
                            <div className="bg-orange-100 w-60  rounded-md border pl-5 border-orange-100 ">Question bank used</div>
                            <div className="bg-white  border-white rounded-md pr-2 ">Bank one</div>
                        </div>
                        <div className="flex justify-between rounded-md border border-gray-300 w-80 m-2">
                            <div className="bg-orange-100 w-60  rounded-md border pl-5 border-orange-100 ">Status</div>
                            <div className="bg-white  border-white rounded-md pr-2 ">{details?.status}</div>
                        </div>


                        <div className="flex justify-between w-80 m-2">
                            <input
                                type="checkbox"
                                id="myCheckbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                style={{ transform: 'scale(1.5)' }}
                            />
                            <p>Randomize questions</p>
                        </div>
                        <div className="relative flex ">
                            <button
                                onClick={() => openUpdateModal(details)}
                                type="submit"
                                className="flex items-center justify-center w-20 bg-slate-950 text-white hover:bg-slate-950 p-2 mt-6 font-semibold rounded-md"
                            >
                                Edit
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 pl-1 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>

                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Update Modal */}

            {isModalOpen && modalType === 'update' && (
                <SharedModal closeModal={closeModal} onSave={handleSubmit(handleUpdateTitle)} onHide={closeModal}>

                    <div className="mb-4 text-center">
                        <img src={updateImg} width={100} alt="Update Image" className="mx-auto" />
                        <label className="block text-gray-700 font-bold mb-2">New Title:</label>
                        <input {...register("title", { required: "Title is required" })} type="text" id="correctTitle" className="w-full border p-2 rounded
                             focus:outline-none focus:border-blue-500"/>
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>
                </SharedModal>
            )}
        </>
    )
}


