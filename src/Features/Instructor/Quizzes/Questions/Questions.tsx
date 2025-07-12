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
import { FormContainer, FormSection, InputField, TextareaField, SelectField, FormIcons } from '../../../../Shared/CustomComponents/FormComponents/FormComponents';

const Questions = () => {
    const dispatch = useDispatch();
    // Add types for useSelector state
    const { data, loading, error } = useSelector((state: any) => state.questionsData) || {};
    const detailsState = useSelector((state: any) => state.questionsDetails);
    const { details } = detailsState;
    // Dispatch the async action when your component mounts
    // console.log(data);

    useEffect(() => {
        dispatch(QuestionsData());
    }, [dispatch]);

    const { creating } = useSelector((state: any) => state.createQuestionData);
    const { updating, error: updateError } = useSelector((state: any) => state.updateQuestionData);

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();


    // Add Question
    const handleCreateQuestion = async (newQuestionData: any) => {
        try {
            //note --- get options and type from the form data
            const { options, type, ...rest } = newQuestionData;

            //note --- payload with the correct structure of Question
            const payload = {
                ...rest,
                options: type === 'MCQ' ? {
                    A: options.A,
                    B: options.B,
                    C: options.C,
                    D: options.D,
                } : type === 'TRUE_FALSE' ? { True: 'True', False: 'False' } : {},
                type,
                tags: newQuestionData.tags ? newQuestionData.tags.split(',').map((tag: string) => tag.trim()) : [],
            };
            await dispatch<any>(createQuestion(payload));
            closeModal();
            dispatch<any>(QuestionsData());
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
                await dispatch<any>(updateQuestionAnswer({ questionId, newAnswer: updatedAnswer }));
                // Optionally, you can handle success here
                dispatch<any>(QuestionsData());
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
    const handleDeleteQuestion = async (question: any) => {
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
    const handleDetailsQuestion = async (question: any) => {
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
    // Add a state to track selected type
    const [selectedType, setSelectedType] = useState('MCQ');
    // Add state for search
    const [searchTerm, setSearchTerm] = useState('');


    //Modal --- Add Questions
    const openAddModal = () => {
        setModalType('add');
        setIsModalOpen(true);
    };

    //Modal --- Upadte the Answer
    const openUpdateModal = (question: any) => {
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
    const openDeleteModal = (question: any) => {
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
    const openDetailsModal = (question: any) => {
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

    // Filter questions based on search term
    const filteredQuestions = data ? data.filter((q: any) => {
        const term = searchTerm.toLowerCase();
        return (
            q.title?.toLowerCase().includes(term) ||
            (q.tags && q.tags.some((tag: string) => tag.toLowerCase().includes(term))) ||
            (q.type && q.type.toLowerCase().includes(term))
        );
    }) : [];

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
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search questions by title, tag, or type..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <table className="border-separate border-spacing-1 table-fixed w-10/12">
                    <thead>
                        <tr>
                            <th className="border border-slate-400 rounded-l-md bg-black text-white">Question Title</th>
                            <th className="border border-slate-400 px-2 bg-black text-white">Description</th>
                            <th className="border border-slate-400 px-2 bg-black text-white">Right Answer</th>
                            <th className="border border-slate-400 px-2 bg-black text-white">Difficulty Level</th>
                            <th className="border border-slate-400 px-2 bg-black text-white">Type</th>
                            <th className="border border-slate-400 px-2 bg-black text-white">Tags</th>
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
                        {filteredQuestions && filteredQuestions.map((question) => (
                            <tr key={question._id}>
                                <td className="border border-slate-300 px-2 rounded-l-md">{question?.title}</td>
                                <td className="border border-slate-400 px-2">{question?.description}</td>
                                <td className="border border-slate-400 px-2">{question?.answer}</td>
                                <td className="border border-slate-400 px-2">{question?.difficulty}</td>

                                <td className="border border-slate-400 px-2 rounded-r-md">{question.type}</td>
                                <td className="border border-slate-400 px-2">{question.tags && question.tags.join(', ')}</td>
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
                    <div className="bg-white dark:bg-neutral-800 rounded-xl p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                                Create New Question
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Add a new question to your quiz bank with detailed options and settings
                            </p>
                        </div>

                        <FormContainer>
                            <FormSection>
                                <InputField
                                    label="Question Title"
                                    name="title"
                                    placeholder="Enter the question title"
                                    icon={FormIcons.tag}
                                    required
                                    {...register("title", { required: "Title is required" })}
                                    error={errors.title?.message}
                                />

                                <TextareaField
                                    label="Question Description"
                                    name="description"
                                    placeholder="Provide a detailed description of the question"
                                    rows={4}
                                    required
                                    {...register("description", { required: "Description is required" })}
                                    error={errors.description?.message}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SelectField
                                        label="Question Type"
                                        name="type"
                                        options={[
                                            { value: "MCQ", label: "Multiple Choice" },
                                            { value: "TRUE_FALSE", label: "True/False" },
                                            { value: "BE", label: "Backend" },
                                            { value: "FE", label: "Frontend" },
                                            { value: "DO", label: "DevOps" }
                                        ]}
                                        placeholder="Select question type"
                                        icon={FormIcons.tag}
                                        required
                                        {...register("type", { required: "Type is required" })}
                                        error={errors.type?.message}
                                        onChange={(e) => {
                                            setSelectedType(e.target.value);
                                            register("type").onChange(e);
                                        }}
                                    />

                                    <SelectField
                                        label="Difficulty Level"
                                        name="difficulty"
                                        options={[
                                            { value: "easy", label: "Easy" },
                                            { value: "medium", label: "Medium" },
                                            { value: "hard", label: "Hard" }
                                        ]}
                                        placeholder="Select difficulty"
                                        icon={FormIcons.tag}
                                        required
                                        {...register("difficulty", { required: "Difficulty is required" })}
                                        error={errors.difficulty?.message}
                                    />
                                </div>

                                {selectedType === 'MCQ' && (
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                            Multiple Choice Options
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <InputField
                                                label="Option A"
                                                name="options.A"
                                                placeholder="Enter option A"
                                                required
                                                {...register("options.A", { required: "Option A is required" })}
                                                error={errors.options?.A?.message}
                                            />
                                            <InputField
                                                label="Option B"
                                                name="options.B"
                                                placeholder="Enter option B"
                                                required
                                                {...register("options.B", { required: "Option B is required" })}
                                                error={errors.options?.B?.message}
                                            />
                                            <InputField
                                                label="Option C"
                                                name="options.C"
                                                placeholder="Enter option C"
                                                required
                                                {...register("options.C", { required: "Option C is required" })}
                                                error={errors.options?.C?.message}
                                            />
                                            <InputField
                                                label="Option D"
                                                name="options.D"
                                                placeholder="Enter option D"
                                                required
                                                {...register("options.D", { required: "Option D is required" })}
                                                error={errors.options?.D?.message}
                                            />
                                        </div>
                                    </div>
                                )}

                                {selectedType === 'TRUE_FALSE' && (
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                            True/False Answer
                                        </h4>
                                        <SelectField
                                            label="Correct Answer"
                                            name="answer"
                                            options={[
                                                { value: "true", label: "True" },
                                                { value: "false", label: "False" }
                                            ]}
                                            placeholder="Select correct answer"
                                            required
                                            {...register("answer", { required: "Answer is required" })}
                                            error={errors.answer?.message}
                                        />
                                    </div>
                                )}

                                <InputField
                                    label="Tags/Categories"
                                    name="tags"
                                    placeholder="e.g., math, algebra, geometry (comma separated)"
                                    icon={FormIcons.tag}
                                    {...register("tags")}
                                    error={errors.tags?.message}
                                />
                            </FormSection>
                        </FormContainer>
                    </div>
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

