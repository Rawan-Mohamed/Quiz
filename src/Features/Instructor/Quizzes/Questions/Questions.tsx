import React, { useState, useEffect } from 'react';
import { PlusCircleIcon, TrashIcon, PencilIcon, EyeIcon } from '@heroicons/react/solid';
import SharedModal from '../../../../Shared/SharedModal/SharedModal';
import { useDispatch, useSelector } from 'react-redux';
import { QuestionsData } from '../../../../Redux/Features/Instructor/Questions/GetQuestionsSlice';
import { createQuestion } from '../../../../Redux/Features/Instructor/Questions/CreateQuestionsSlice';
import { useForm } from 'react-hook-form';
import { updateQuestionAnswer } from '../../../../Redux/Features/Instructor/Questions/UpdateQuestionsSlice';
import { deleteQuestion } from '../../../../Redux/Features/Instructor/Questions/DeleteQuestionsSlice';
import { getQuestionDetails } from '../../../../Redux/Features/Instructor/Questions/DetailsQuestionsSlice'
import updateImg from '../../../../assets/images/QuestionUpdateIcon.svg'
import deleteImg from '../../../../assets/images/QuestionDeleteIcon.svg'
import detailsImg from '../../../../assets/images/illust58-6486-01-removebg-preview.png'
import style from './Questions.module.css'
import { Link } from 'react-router-dom';
const Questions = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.questionsData) || {};
    const detailsState = useSelector((state) => state.questionsDetails);
    const { details } = detailsState;
    // Dispatch the async action when your component mounts
    // console.log(data);

    useEffect(() => {
        dispatch(QuestionsData());
    }, [dispatch]);

    const { creating } = useSelector((state) => state.createQuestionData);
    const { updating, error: updateError } = useSelector((state) => state.updateQuestionData);

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();


    // Add Question
    const handleCreateQuestion = async (newQuestionData) => {
        try {
            //note --- get options and type from the form data
            const { options, type, ...rest } = newQuestionData;

            //note --- payload with the correct structure of Question
            const payload = {
                ...rest,
                options: {
                    A: options.A,
                    B: options.B,
                    C: options.C,
                    D: options.D,
                },
                type,
            };

            await dispatch(createQuestion(payload));
            closeModal();
            dispatch(QuestionsData());
            // Optionally, you can handle success here
        } catch (error) {
            // Handle error
            console.error("Error creating question:", error);
        }
    };
    // Update the Answer
    const handleUpdateAnswer = async () => {
        try {
            const updatedAnswer = getValues("answer");

            // Ensure questionId is defined before dispatching
            if (questionId !== undefined) {
                await dispatch(updateQuestionAnswer({ questionId, newAnswer: updatedAnswer }));
                // Optionally, you can handle success here
                dispatch(QuestionsData());
                closeModal();
            } else {
                throw new Error("questionId is undefined");
            }
        } catch (error) {
            // Handle error
            console.error("Error updating question answer:", error);
        }
    };
    // Delete Question
    const handleDeleteQuestion = async (question) => {
        console.log("Question object:", question);
        try {
            await dispatch(deleteQuestion(questionId));
            // Optionally, you can handle success here
            dispatch(QuestionsData());
            closeModal();
        } catch (error) {
            // Handle error
            console.error("Error deleting question:", error);
        }
    };
    // Get the Details of Question
    const handleDetailsQuestion = async (question) => {
        console.log("Question object:", question);
        try {
            // Dispatch the action to get question details
            dispatch(getQuestionDetails(question._id)); // Assuming question._id is the identifier

            // Open the details modal
            openDetailsModal(question);
        } catch (error) {
            // Handle error
            console.error("Error fetching question details:", error);
        }
    };

    // ******* Modals***********
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add'); // 'add' or 'update'
    const [questionId, setQuestionId] = useState(0);


    //Modal --- Add Questions
    const openAddModal = () => {
        setModalType('add');
        setIsModalOpen(true);
    };

    //Modal --- Upadte the Answer
    const openUpdateModal = (question) => {
        setModalType('update');

        // Check if question._id exists before setting the value
        if (question._id !== undefined) {
            setQuestionId(question._id);
            setValue("answer", question.answer || ''); // Set the answer if available
            setIsModalOpen(true);
        } else {
            console.error('Question ID is undefined:', question);
        }
    };
    //Modal --- Delete Question
    const openDeleteModal = (question) => {
        setModalType('delete');
        // setQuestionId(question._id);
        // setIsModalOpen(true);

        if (question._id !== undefined) {
            setQuestionId(question._id);
            setIsModalOpen(true);
        } else {
            console.error('Question ID is undefined:', question);
        }
    };
    //Modal --- Detials
    const openDetailsModal = (question) => {
        setModalType('details');

        if (question._id !== undefined) {
            setQuestionId(question._id);
            setIsModalOpen(true);

            // Dispatch the action to fetch details
            dispatch(getQuestionDetails(question._id));
        } else {
            console.error('Question ID is undefined:', question);
        }
    };
    // Close
    const closeModal = () => {
        setIsModalOpen(false);
        setModalType('add'); // Reset modal type to 'add' when closing
    };

    return (
        <>

            <div className="header flex justify-between px-4 py-2">
                <div className="flex items-center mb-10 ">
                    <p className="mr-2 text-base">
                        <Link to="/dashboard/quizzes" className="text-black no-underline">
                            Quizes
                        </Link>
                    </p>
                    <p className="mr-2 text-base">/</p>
                    <p className="text-base text-blue-800">Bank Of Questions</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-white text-black border border-gray-900 px-4 py-2 rounded-md flex items-center"
                >
                    <PlusCircleIcon className="h-5 w-5 mr-1" />
                    Add Question
                </button>
            </div>
            <div className="flex justify-center">
                <table className="border-separate border-spacing-1 table-fixed w-10/12">
                    <thead>
                        <tr>
                            <th className="border border-slate-400 rounded-l-md bg-black text-white">Question Title</th>
                            <th className="border border-slate-400 px-2 bg-black text-white">Description</th>
                            <th className="border border-slate-400 px-2 bg-black text-white">Right Answer</th>
                            <th className="border border-slate-400 px-2 bg-black text-white">Difficulty Level</th>
                            <th className="border border-slate-400 px-2 bg-black text-white">Type</th>
                            {/* Add more header columns as needed */}
                            <th className="border border-slate-400 px-2 rounded-r-md bg-black text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="3">Loading...</td>
                            </tr>
                        )}
                        {error && (
                            <tr>
                                <td colSpan="3">Error: {error}</td>
                            </tr>
                        )}
                        {data && data.map((question) => (
                            <tr key={question._id}>
                                <td className="border border-slate-300 px-2 rounded-l-md">{question?.title}</td>
                                <td className="border border-slate-400 px-2">{question?.description}</td>
                                <td className="border border-slate-400 px-2">{question?.answer}</td>
                                <td className="border border-slate-400 px-2">{question?.difficulty}</td>

                                <td className="border border-slate-400 px-2 rounded-r-md">{question.type}</td>
                                {/* <td className="border border-slate-400 px-2 rounded-r-md " >

                                    <EyeIcon className="h-6 w-6 text-yellow-500" />
                                    <PencilIcon className="h-6 w-6 text-yellow-500"
                                        onClick={() => openUpdateModal(question)}
                                    // onClick={openUpdateModal}
                                    />
                                    <TrashIcon className="h-6 w-6 text-yellow-500"
                                        //  onClick={() => openDeleteModal(question._id)}

                                        onClick={() => openDeleteModal(question)}
                                    />


                                </td> */}
                                <td className={`border border-slate-400 px-2 rounded-r-md ${style.actionsCell}`} >
                                    <div className={`${style.actionsButtons}`}>
                                        <button>
                                            <EyeIcon className="h-6 w-6 text-yellow-500" onClick={() => openDetailsModal(question)} />

                                        </button>
                                        <button>
                                            <PencilIcon className="h-6 w-6 text-yellow-500 ml-2" onClick={() => openUpdateModal(question)} />

                                        </button>
                                        <button>
                                            <TrashIcon className="h-6 w-6 text-yellow-500 ml-2" onClick={() => openDeleteModal(question)} />

                                        </button>
                                    </div>

                                </td>

                            </tr>
                        ))}
                        {/* ---------- */}

                    </tbody>
                </table>
            </div>
            {/* Add Modal */}
            {isModalOpen && modalType === 'add' && (
                <SharedModal closeModal={closeModal} onSave={handleSubmit(handleCreateQuestion)} width="1/2" onHide={closeModal}>


                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Title:</label>
                        <input {...register("title", { required: "Title is required" })} type="text" id="title" className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Question Descruption:</label>
                        <textarea {...register("description", { required: "description is required" })} id="question" className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"></textarea>
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                    </div>
                    {/*
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Answers A and B:</label>
                        <div className="flex">
                            <input {...register("A", { required: "First option is required" })} type="text" placeholder="A" className="w-1/2 mr-2 border p-2
                                  rounded focus:outline-none focus:border-blue-500"/>
                            {errors.A && <p className="text-red-500">{errors.A.message}</p>}

                            <input {...register("B", { required: "Second option is required" })} type="text" placeholder="B" className="w-1/2 border p-2 rounded
                                     focus:outline-none focus:border-blue-500"/>
                            {errors.B && <p className="text-red-500">{errors.B.message}</p>}

                        </div>
                    </div>

                    <div className="mb-4">

                        <label className="block text-gray-700 font-bold mb-2">Answers C and D:</label>
                        <div className="flex">
                            <input {...register("C", { required: "Second option is required" })} type="text" placeholder="C" className="w-1/2 mr-2 border p-2 rounded
                                     focus:outline-none focus:border-blue-500"/>
                            {errors.C && <p className="text-red-500">{errors.C.message}</p>}

                            <input {...register("D", { required: "thired option is required" })} type="text" placeholder="D" className="w-1/2 border p-2 rounded
                                         focus:outline-none focus:border-blue-500"/>
                            {errors.D && <p className="text-red-500">{errors.D.message}</p>}

                        </div>
                    </div> */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Answers A, B, C, and D:</label>
                        <div className="flex">
                            <input {...register("options.A", { required: "First option is required" })} type="text" placeholder="A" className="w-1/4 mr-2 border p-2 rounded focus:outline-none focus:border-blue-500" />
                            {errors.options?.A && <p className="text-red-500">{errors.options.A.message}</p>}

                            <input {...register("options.B", { required: "Second option is required" })} type="text" placeholder="B" className="w-1/4 mr-2 border p-2 rounded focus:outline-none focus:border-blue-500" />
                            {errors.options?.B && <p className="text-red-500">{errors.options.B.message}</p>}

                            <input {...register("options.C", { required: "Third option is required" })} type="text" placeholder="C" className="w-1/4 mr-2 border p-2 rounded focus:outline-none focus:border-blue-500" />
                            {errors.options?.C && <p className="text-red-500">{errors.options.C.message}</p>}

                            <input {...register("options.D", { required: "Fourth option is required" })} type="text" placeholder="D" className="w-1/4 border p-2 rounded focus:outline-none focus:border-blue-500" />
                            {errors.options?.D && <p className="text-red-500">{errors.options.D.message}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Correct Answer:</label>
                        <input {...register("answer", { required: true })} type="text" id="correctAnswer" className="w-full border p-2 rounded
                                     focus:outline-none focus:border-blue-500"/>
                        {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}

                    </div>

                    <div className="mb-4">
                        <div className='flex'>
                            <label className="block text-gray-700 font-bold mb-2">Type:</label>
                            <select
                                {...register("type", { required: "type is required" })} id="dropdown" className="w-full border p-2 rounded focus:outline-none focus:border-blue-500">
                                <option value="" disabled selected>Select Type</option>
                                <option value="BE">BE</option>
                                <option value="FE">FE</option>
                                <option value="DO">DO</option>
                            </select>
                            {errors.type && <p className="text-red-500">{errors.type.message}</p>}

                            {/*  */}
                            <label className="block text-gray-700 font-bold mb-2">Difficulty:</label>
                            <select

                                {...register("difficulty", { required: "type is required" })} id="dropdown" className="w-full border p-2 rounded focus:outline-none focus:border-blue-500">
                                <option value="" disabled selected>Select Difficulty Level</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            {errors.difficulty && <p className="text-red-500">{errors.difficulty.message}</p>}

                        </div>

                    </div>

                    {/* Add more content as needed */}
                </SharedModal>
            )}

            {/* Update Modal */}

            {isModalOpen && modalType === 'update' && (
                <SharedModal closeModal={closeModal} onSave={handleSubmit(handleUpdateAnswer)} onHide={closeModal}>

                    <div className="mb-4 text-center">
                        <img src={updateImg} width={100} alt="Update Image" className="mx-auto" />
                        <label className="block text-gray-700 font-bold mb-2">Correct Answer:</label>
                        <input {...register("answer", { required: "Answer is required" })} type="text" id="correctAnswer" className="w-full border p-2 rounded
                             focus:outline-none focus:border-blue-500"/>
                        {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}
                    </div>
                </SharedModal>
            )}
            {/* Delete Modal */}
            {isModalOpen && modalType === 'delete' && (
                <SharedModal closeModal={closeModal} onSave={handleSubmit(handleDeleteQuestion)} onHide={closeModal}>
                    <div className="mb-4 text-center">
                        <img src={deleteImg} width={100} alt="Update Image" className="mx-auto" />
                        <p>Are you sure to delete this ?</p>
                    </div>
                </SharedModal>
            )}
            {/* Details Modal */}
            {isModalOpen && modalType === 'details' && (
                <SharedModal closeModal={closeModal} onSave={handleSubmit(handleDetailsQuestion)} width={''} onHide={closeModal}>

                    <div className="mb-4 text-center">
                        <img src={detailsImg} width={100} alt="Update Image" className="mx-auto" />
                        <p>Details content goes here</p>
                        {/* You can use the data from the details slice */}
                        {details && (
                            <div>
                                <p>Title: {details.title}</p>
                                <p>Description: {details.description}</p>
                                {/* Add more details as needed */}
                            </div>
                        )}
                    </div>
                </SharedModal>
            )}
        </>
    );
};

export default Questions;

