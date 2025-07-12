import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizzesData, Quiz } from '../../../Redux/Features/Instructor/Quizzes/getQuizzesSlice';
import { fetchIncommingQuizzes, IncommingQuiz } from '../../../Redux/Features/Instructor/Quizzes/incommingQuizSlice';
import { fetchcompletedQuizzes, CompletedQuiz } from '../../../Redux/Features/Instructor/Quizzes/completedQuizzesSlice';
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
import codeImg from '../../../assets/images/codeImg.png';
import { ClipboardCopyIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import ErrorBoundary from '../../../Shared/ErrorBoundary';
import { AppDispatch } from '../../../Redux/Store';
import Leaderboard from './Leaderboard';
import { connectSocket, disconnectSocket, getSocket } from '../../../Services/socket';
import { setConnected, setParticipants, setLeaderboard, setQuizStarted, setQuizEnded, setCurrentQuestion } from '../../../Redux/Features/Instructor/Quizzes/realTimeQuizSlice';
import { 
  InputField, 
  SelectField, 
  TextareaField, 
  FormContainer, 
  FormSection, 
  FormIcons 
} from '../../../Shared/CustomComponents/FormComponents/FormComponents';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Quizzes = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Selector
  const { data: quiz = [] } = useSelector((state: { quizzesData: { data: Quiz[] } }) => state.quizzesData) || {};
  const { data: incommingquiz = [] } = useSelector((state: { incommingQuizData: { data: IncommingQuiz[] } }) => state.incommingQuizData) || {};
  const { data: completequiz = [] } = useSelector((state: { completedQuizData: { data: CompletedQuiz[] } }) => state.completedQuizData) || {};

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'delete'
  const [quizId, setQuizId] = useState<string>('');
  const [createdQuizCode, setCreatedQuizCode] = useState('');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Add state for search
  const [searchTerm, setSearchTerm] = useState('');
  const [schedule, setSchedule] = useState<Date | null>(null);

  // Function to open add modal
  const openAddModal = () => {
    setModalType('add');
    setIsModalOpen(true);
  };

  // Function to open delete modal
  const openDeleteModal = (quiz: Quiz) => {
    setModalType('delete');
    if (quiz._id !== undefined) {
      setQuizId(quiz._id);
      setIsModalOpen(true);
    } else {
      console.error('Question ID is undefined:', quiz);
    }
  };

  // Function to handle creating a quiz
  const handleCreateQuiz = (formData: Record<string, any>) => {
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
      tags: formData.tags ? formData.tags.split(',').map((tag: string) => tag.trim()) : [],
    };

    dispatch(fetchCreateQuizz(newQuizzData) as unknown as any)
      .then((response: any) => {
        const createdQuiz = response.payload.data;
        setCreatedQuizCode(createdQuiz.code);
        closeModal();
        setIsCodeModalOpen(true);
      })
      .catch((error: unknown) => {
        console.error("Error creating quiz:", error);
      });
  };

  // Function to handle deleting a quiz
  const handleDeleteQuestion = async (_event?: React.MouseEvent) => {
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
  const navigateToDetails = (quizId: string) => {
    navigate(`/dashboard/quizzes/quiz-details/${quizId}`);
  };

  useEffect(() => {
    dispatch(fetchQuizzesData());
    dispatch(fetchIncommingQuizzes());
    dispatch(fetchcompletedQuizzes());
    dispatch(fetchGroups());
  }, [dispatch]);

  // Socket.IO connection and event listeners
  useEffect(() => {
    const socket = connectSocket();
    dispatch(setConnected(true));

    socket.on('participants', (participants: { id: string; name: string; score: number }[]) => {
      dispatch(setParticipants(participants));
    });
    socket.on('leaderboard', (leaderboard: { id: string; name: string; score: number }[]) => {
      dispatch(setLeaderboard(leaderboard));
    });
    socket.on('quizStarted', () => {
      dispatch(setQuizStarted(true));
    });
    socket.on('quizEnded', () => {
      dispatch(setQuizEnded(true));
    });
    socket.on('currentQuestion', (questionIdx: number) => {
      dispatch(setCurrentQuestion(questionIdx));
    });

    return () => {
      disconnectSocket();
      dispatch(setConnected(false));
    };
  }, [dispatch]);

  // Filter quizzes based on search term
  const filteredQuizzes = quiz.filter((q: Quiz) => {
    const term = searchTerm.toLowerCase();
    return (
      q.title?.toLowerCase().includes(term) ||
      (q.tags && q.tags.some((tag: string) => tag.toLowerCase().includes(term))) ||
      (q.group && q.group.toLowerCase().includes(term))
    );
  });

  return (
    <ErrorBoundary>
      <div className="min-h-screen overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 md:px-8">
          <div className="col-span-1">
            <div className="flex flex-wrap">
              <div className="w-full flex flex-col md:flex-row justify-center mb-3 gap-2">
                <div
                  className="w-full md:w-1/2 lg:w-1/4 border-2 py-5 mb-3 md:mb-0 flex flex-col items-center"
                  style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                >
                  <button onClick={openAddModal} className="w-full">
                    <img src={newQuiz} alt="setup new quizz" className="mx-auto" />
                  </button>
                  <span className="text-black mt-2 text-center text-sm md:text-base">setup new quizz</span>
                </div>
                <div
                  className="w-full md:w-1/2 lg:w-1/4 border-2 py-5 flex flex-col items-center"
                  style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                >
                  <Link to="/dashboard/quizzes/questions" className="w-full">
                    <button className="w-full">
                      <img src={questionBank} alt="Question" className="mx-auto" />
                    </button>
                  </Link>
                  <span className="text-black mt-2 text-center text-sm md:text-base">Question Bank</span>
                </div>
              </div>
            </div>
            <div>
              {/* Add search input above quiz list */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search quizzes by title, tag, or group..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {filteredQuizzes.map((quiz: Quiz) => (
                <div key={quiz._id} className="mb-4">
                  <div className="max-w-full md:max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        <ClipboardListIcon className="h-8 w-8 text-black" style={{ backgroundColor: "#FFEDDF", borderRadius: "10px" }} />
                        <div className="flex flex-col md:flex-row md:space-x-4">
                          <p className="text-lg font-semibold break-words">{`${quiz.title}`}</p>
                          <p className="text-sm font-medium text-gray-400">{`${quiz.type}`}</p>
                          <p className="text-sm font-medium text-gray-400">{`${quiz.difficulty}`}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center mt-3 gap-2">
                        <p className="text-sm font-medium break-words">{`${quiz.group}`}</p>
                        <p className="text-sm font-medium break-words">{`${quiz.description}`}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {quiz.tags && quiz.tags.map((tag: string, idx: number) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">{tag}</span>
                        ))}
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
              <div className="w-full max-w-full md:max-w-md mx-auto bg-white shadow-md rounded-md overflow-x-auto p-4">
                <h1 className="text-lg font-semibold text-gray-800 mb-4">Incomming Quizzes</h1>
                <Table data={incommingquiz} />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-full max-w-full md:max-w-md mx-auto bg-white shadow-md rounded-md overflow-x-auto p-4">
                <h1 className="text-lg font-semibold text-gray-800 mb-4">Completed Quizzes</h1>
                <Table data={completequiz} />
              </div>
            </div>
          </div>
        </div>
        {/* Modal for Add/Edit */}
        <SharedModal
          closeModal={closeModal}
          onSave={modalType === 'add' ? () => handleSubmit(handleCreateQuiz)() : () => handleDeleteQuestion()}
          onHide={closeModal}
          width="full md:max-w-lg"
        >
          {modalType === 'add' ? (
            <FormContainer onSubmit={handleSubmit(handleCreateQuiz)}>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center">
                <span className="mr-2">📝</span> Create New Quiz
              </h2>
              <FormSection title="Quiz Details">
                <InputField
                  label="Title"
                  placeholder="Enter quiz title"
                  icon={FormIcons.tag}
                  required
                  {...register('title', { required: 'Title is required' })}
                  error={errors.title && 'Title is required'}
                />
                <TextareaField
                  label="Description"
                  placeholder="Describe your quiz (optional)"
                  rows={3}
                  {...register('description')}
                  error={errors.description && 'Description is required'}
                />
                <InputField
                  label="Categories/Tags"
                  placeholder="e.g. math, algebra, geometry"
                  icon={FormIcons.tag}
                  {...register('tags')}
                  error={errors.tags && 'Invalid tags'}
                />
              </FormSection>
              <FormSection title="Settings">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SelectField
                    label="Duration (in min)"
                    options={[
                      { value: '10', label: '10 minutes' },
                      { value: '15', label: '15 minutes' },
                      { value: '30', label: '30 minutes' },
                      { value: '45', label: '45 minutes' },
                      { value: '60', label: '60 minutes' },
                      { value: '90', label: '90 minutes' },
                      { value: '120', label: '120 minutes' },
                    ]}
                    required
                    {...register('duration', { required: 'Duration is required' })}
                    error={errors.duration && 'Duration is required'}
                  />
                  <SelectField
                    label="Question Number"
                    options={Array.from({ length: 50 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))}
                    required
                    {...register('questions_number', { required: 'Question number is required' })}
                    error={errors.questions_number && 'Question number is required'}
                  />
                  <SelectField
                    label="Score Per Question"
                    options={Array.from({ length: 20 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))}
                    required
                    {...register('score_per_question', { required: 'Score per question is required' })}
                    error={errors.score_per_question && 'Score per question is required'}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <span className="mr-1">Schedule</span>
                      <span className="text-primary-500">{FormIcons.calendar}</span>
                    </label>
                    <DatePicker
                      selected={schedule}
                      onChange={(date) => {
                        setSchedule(date);
                        // Update react-hook-form value
                        if (date) {
                          const iso = date.toISOString().slice(0, 16);
                          setValue('schadule', iso);
                        } else {
                          setValue('schadule', '');
                        }
                      }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm"
                      placeholderText="Select date and time"
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.schadule ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-600'}`}
                    />
                    <small className="text-xs text-neutral-500 ml-1">Format: yyyy-mm-dd HH:mm</small>
                    {errors.schadule && (
                      <span className="mt-1 text-sm text-error-600 dark:text-error-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Schedule is required
                      </span>
                    )}
                  </div>
                  <SelectField
                    label="Difficulty"
                    options={[
                      { value: 'easy', label: 'Easy' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'hard', label: 'Hard' },
                    ]}
                    required
                    {...register('difficulty', { required: 'Difficulty is required' })}
                    error={errors.difficulty && 'Difficulty is required'}
                  />
                  <SelectField
                    label="Type"
                    options={[
                      { value: 'MCQ', label: 'Multiple Choice' },
                      { value: 'TRUE_FALSE', label: 'True/False' },
                      { value: 'BE', label: 'Backend' },
                      { value: 'FE', label: 'Frontend' },
                      { value: 'DO', label: 'DevOps' },
                    ]}
                    required
                    {...register('type', { required: 'Type is required' })}
                    error={errors.type && 'Type is required'}
                  />
                </div>
                <div className="mt-4">
                  <SelectField
                    label="Groups"
                    options={((useSelector((state: any) => state.groupsSlice.data) || []).map((g: any) => ({ value: g.name, label: g.name })))}
                    required
                    {...register('group', { required: 'Group is required' })}
                    error={errors.group && 'Group is required'}
                  />
                </div>
              </FormSection>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  className="btn-secondary bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 px-6 py-2 rounded-lg font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  <span>Create Quiz</span>
                </button>
              </div>
            </FormContainer>
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
        {isCodeModalOpen && (
          <SharedModal
            closeModal={() => setIsCodeModalOpen(false)}
            onSave={() => setIsCodeModalOpen(false)}
            onHide={() => setIsCodeModalOpen(false)}
            width="full md:max-w-md"
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
        )}
        <Leaderboard />
      </div>
    </ErrorBoundary>
  );
};

export default Quizzes;
