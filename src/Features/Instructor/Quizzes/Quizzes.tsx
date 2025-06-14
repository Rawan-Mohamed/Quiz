``

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizzesData } from '../../../Redux/Features/Instructor/Quizzes/getQuizzesSlice';
import { fetchIncommingQuizzes } from '../../../Redux/Features/Instructor/Quizzes/incommingQuizSlice';
import { fetchcompletedQuizzes } from '../../../Redux/Features/Instructor/Quizzes/completedQuizzesSlice';
import { fetchGroups } from '../../../Redux/Features/Instructor/Groups/GroupsSlice';
import { Link, useNavigate } from 'react-router-dom';
import newQuiz from '../../../assets/images/new quiz icon.png';
import questionBank from '../../../assets/images/Vault icon.png';
import { TrashIcon, ClipboardListIcon } from '@heroicons/react/solid';
import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import Table from '../../../Shared/CustomComponents/Table/Table';
import SharedModal from '../../../Shared/SharedModal/SharedModal';
import { useForm } from 'react-hook-form';
import { fetchCreateQuizz } from '../../../Redux/Features/Instructor/Quizzes/createQuizzesSlice';
import { fetchDeleteQuiz } from '../../../Redux/Features/Instructor/Quizzes/deleteQuizzesSlice';
import deleteImg from '../../../assets/images/QuestionDeleteIcon.svg';
import codeImg from '../../../assets/images/codeImg.png';
import { ClipboardCopyIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';

const Quizzes = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selector
  const { data: quiz, loading, error } = useSelector((state) => state.quizzesData) || {};
  const { data: incommingquiz } = useSelector((state) => state.incommingQuizData) || {};
  const { data: completequiz } = useSelector((state) => state.completedQuizData) || {};
  const groups = useSelector((state) => state.groupsSlice.data);
  const durationOptions = [10, 15, 30, 45, 60, 90, 120]; // Add more values as needed
  const [quizDuration, setQuizDuration] = useState(0); // Initialize duration state with an initial value

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'delete'
  const [quizId, setQuizId] = useState(0);
  const [createdQuizCode, setCreatedQuizCode] = useState('');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Function to open add modal
  const openAddModal = () => {
    setModalType('add');
    setIsModalOpen(true);
  };

  // Function to open delete modal
  const openDeleteModal = (quiz) => {
    setModalType('delete');
    if (quiz._id !== undefined) {
      setQuizId(quiz._id);
      setIsModalOpen(true);
    } else {
      console.error('Question ID is undefined:', quiz);
    }
  };

  // Function to handle creating a quiz
  const handleCreateQuiz = (formData) => {
    const newQuizzData = {
      title: formData.title,
      description: formData.description,
      group: formData.group,
      questions_number: formData.questions_number,
      difficulty: formData.difficulty,
      type: formData.type,
      schadule: formData.schadule,
      duration: formData.duration,
      score_per_question: formData.score_per_question,
    };

    dispatch(fetchCreateQuizz(newQuizzData))
      .then((response) => {
        const createdQuiz = response.payload.data;
        setCreatedQuizCode(createdQuiz.code);
        closeModal();
        setIsCodeModalOpen(true);
      })
      .catch((error) => {
        console.error("Error creating quiz:", error);
      });
  };

  // Function to handle deleting a quiz
  const handleDeleteQuestion = async () => {
    try {
      await dispatch(fetchDeleteQuiz(quizId));
      dispatch(fetchQuizzesData());
      closeModal();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  // Function to copy quiz code
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(createdQuizCode);
      setCopySuccess(true);
      toast.success("Code copied success");
    } catch (error) {
      console.error('Error copying code to clipboard:', error);
    }
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('add');
  };

  // Function to navigate to quiz details
  const navigateToDetails = (quizId) => {
    navigate(`/dashboard/quizzes/quiz-details/${quizId}`);
  };

  useEffect(() => {
    dispatch(fetchQuizzesData());
    dispatch(fetchIncommingQuizzes());
    dispatch(fetchcompletedQuizzes());
    dispatch(fetchGroups());
  }, [dispatch]);

  useEffect(() => {
    // Fetch duration data or calculate it here
    const fetchedDuration = /* fetch or calculate duration */;
    // Set the duration state
    setQuizDuration(fetchedDuration);
    // Dispatch action to fetch questions without answers
    dispatch(fetchQuestionsWithoutAnswers(quizId));
  }, [dispatch, quizId]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="flex flex-wrap">
            <div className="w-full flex justify-center mb-3">
              <div
                className="w-1/2 md:w-1/4 border-2 py-5 mb-3 ml-2 flex flex-col items-center"
                style={{ border: "1px solid #ccc", borderRadius: "5px" }}
              >
                <button onClick={openAddModal}>
                  <img src={newQuiz} alt="setup new quizz" />
                </button>
                <span className="text-black  mt-2">setup new quizz</span>
              </div>
              <div
                className="w-1/2 md:w-1/4 border-2 py-5 mb-3 ml-2 flex flex-col items-center"
                style={{ border: "1px solid #ccc", borderRadius: "5px" }}
              >
                <Link to="/dashboard/quizzes/questions">
                  <button>
                    <img src={questionBank} alt="Question" />
                  </button>
                </Link>
                <span className="text-black  mt-2">Question Bank</span>
              </div>
            </div>
          </div>
          <div>
            {quiz.map((quiz) => (
              <div key={quiz._id} className="mb-4">
                <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <ClipboardListIcon className="h-8 w-8 text-black" style={{ backgroundColor: "#FFEDDF", borderRadius: "10px" }} />
                      <div className="flex space-x-4">
                        <p className="text-lg font-semibold">{`${quiz.title}`}</p>
                        <p className="text-sm font-medium text-gray-400">{`${quiz.type}`}</p>
                        <p className="text-sm font-medium text-gray-400">{`${quiz.difficulty}`}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-3">
                      <p className="text-sm font-medium">{`${quiz.group}`}</p>
                    </div>
                    <div className="flex items-center mt-3">
                      <p className="text-sm font-medium">{`${quiz.description}`}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <button className="focus:outline-none" onClick={() => navigateToDetails(quiz._id)}>
                          <ArrowCircleRightIcon className="h-6 w-6 text-primary-500 hover:text-primary-700" />
                        </button>
                      </div>
                      <div className="flex items-center">
                        <TrashIcon
                          className="h-5 w-5 text-red-500 cursor-pointer"
                          onClick={() => openDeleteModal(quiz)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col mb-4">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden p-4">
              <h1 className="text-lg font-semibold text-gray-800 mb-4">Incomming Quizzes</h1>
              <Table data={incommingquiz} loading={loading} error={error} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden p-4">
              <h1 className="text-lg font-semibold text-gray-800 mb-4">Completed Quizzes</h1>
              <Table data={completequiz} loading={loading} error={error} />
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Add/Edit */}
      <SharedModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        title={modalType === 'add' ? 'Add New Quiz' : 'Delete Quiz'}
        className="w-full md:max-w-lg"
      >
        {modalType === 'add' ? (
          <form onSubmit={handleSubmit(handleCreateQuiz)}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                {...register('title', { required: true })}
                type="text"
                id="title"
                name="title"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {errors.title && <span className="text-red-500">Title is required</span>}
            </div>
            {/* Other form inputs */}
            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration (minutes)
              </label>
              <select
                {...register('duration', { required: true })}
                id="duration"
                name="duration"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              >
                {durationOptions.map((duration) => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
              {errors.duration && <span className="text-red-500">Duration is required</span>}
            </div>
            {/* Add more form inputs as needed */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 focus:outline-none"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-500 text-white px-4 py-2 rounded-md focus:outline-none"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p>Are you sure you want to delete this quiz?</p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 focus:outline-none"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-primary-500 text-white px-4 py-2 rounded-md focus:outline-none"
                onClick={handleDeleteQuestion}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </SharedModal>
      {/* Modal for Quiz Code */}
      <SharedModal
        isOpen={isCodeModalOpen}
        onRequestClose={() => setIsCodeModalOpen(false)}
        title="Quiz Code"
        className="w-full md:max-w-md"
      >
        <div className="p-4 flex flex-col items-center">
          <img src={codeImg} alt="Quiz code" className="w-32 h-32 mb-4" />
          <p className="text-lg font-semibold mb-4">Your Quiz Code:</p>
          <div className="flex items-center justify-center bg-gray-100 rounded-md p-2">
            <input
              type="text"
              value={createdQuizCode}
              readOnly
              className="w-full bg-transparent outline-none"
            />
            <button
              type="button"
              className="ml-2 bg-primary-500 text-white px-4 py-2 rounded-md focus:outline-none"
              onClick={handleCopyCode}
            >
              {copySuccess ? "Copied!" : <ClipboardCopyIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </SharedModal>
    </>
  );
};

export default Quizzes;
