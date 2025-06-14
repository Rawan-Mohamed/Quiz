import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SharedModal from "../SharedModal/SharedModal";
import { useForm } from "react-hook-form";
import { ClipboardCopyIcon } from '@heroicons/react/outline';
import codeImg from '../../assets/images/codeImg.png'
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../../Redux/Features/Instructor/Groups/GroupsSlice";
import { fetchCreateQuizz } from "../../Redux/Features/Instructor/Quizzes/createQuizzesSlice";

// import styles from './NavBar.module.css'
const NavBar = () => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const questionNumbers = Array.from({ length: 10 }, (_, index) => index + 1); // Create an array from 1 to 10
  const scorePerQuestion = Array.from({ length: 10 }, (_, index) => index + 1); // Create an array from 1 to 10
  const durationOptions = [10, 15, 30, 45, 60, 90, 120]; // Add more values as needed
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groupsSlice.data); // Assuming your slice is named GroupsData
  const userRole = useSelector((state) => state.users.role); // Assuming 'users' is the slice name where the user role is stored

  useEffect(() => {
    // dispatch(fetchQuizzesData());
    // dispatch(fetchIncommingQuizzes());
    // dispatch(fetchcompletedQuizzes());
    dispatch(fetchGroups());
  }, [dispatch]);

  // ******* Modals***********
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  //Modal --- Add Questions
  const openAddModal = () => {
    setModalType('add');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('add'); // Reset modal type to 'add' when closing
  };
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [createdQuizCode, setCreatedQuizCode] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  //Function  Add Quizz
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

    // Dispatch the fetchCreateQuizz action
    dispatch(fetchCreateQuizz(newQuizzData))
      .then((response) => {
        // Successfully created quiz
        const createdQuiz = response.payload.data;
        console.log(createdQuiz);
        setCreatedQuizCode(createdQuiz.code);
        closeModal();
        setIsCodeModalOpen(true);
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating quiz:", error);
      });
  };

  // Function to handle copy action
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(createdQuizCode);
      setCopySuccess(true);
      toast.success("Code copied success")
    } catch (error) {
      console.error('Error copying code to clipboard:', error);
    }
  };
  return (
    <>
      <nav className="bg-white text-black p-4 border-b border-gray-500">
        {/* <nav className={`"p-4${styles["bg-navbar"]}"`}> */}
        <div className="flex items-center justify-between">
          <div className="font-semibold pl-4 hover:bg-orange-200
           hover:rounded-xl
          px-3 py-1 ">Dashboard</div>

          <div className="flex items-center space-x-4">
            {userRole === "Instructor" &&
              <button className="flex items-center hover:bg-orange-200 rounded-lg px-3 py-1 border-2 mr-4"
                onClick={openAddModal}>
                <i className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                  </svg>
                </i>
                New quiz
              </button>
            }

            <div className="relative group">
              <a href="#" className="hover:bg-orange-200 px-3 py-1
           hover:rounded-xl  flex items-center ">
                {userRole} <i className="">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                  </svg> */}

                </i>
              </a>
              {/* Dropdown menu */}
              {/* <div className="absolute hidden bg-gray-200 py-2 px-4 space-y-2 group-hover:block">
                <a href="#" className="block">
                  Profile
                </a>
                <a href="#" className="block">
                  Logout
                </a>
              </div> */}
            </div>
          </div>

        </div>
      </nav>
      {/* Add Modal */}

      {isModalOpen && modalType === 'add' && (
        <SharedModal closeModal={closeModal} onSave={handleSubmit(handleCreateQuiz)}
          width="1/2"
          onHide={closeModal}>
          {/* First Row: Input Title */}
          <div className="mb-4 ">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
            <div className="mb-1 relative">
              <input
                type="text"
                id="title"
                className="p-2  w-full relative  border rounded-md"
                {...register('title', { required: "Title is required" })}
              />
              {/* <div className="absolute left-1 top-1 bottom-1 bg-orange-200 rounded-md" style={{ width: '130px' }}></div> */}

              {errors.title && <p className="text-red-500">{errors.title.message}</p>}

            </div>
          </div>
          {/* Second Row: 3 Dropdowns */}
          <div className="flex mb-4">
            <div className="w-1/3 mr-2">
              <label htmlFor="dropdown1" className="block text-sm font-medium text-gray-600">Duration
                <span className='text-orange-200'>(in min)</span></label>
              <select
                id="duration"
                {...register('duration', { required: "duration is required" })}
                className="mt-1 p-2 w-full border rounded-md"
              // className="block w-full py-2.5 px-4 text-sm font-medium  dark:text-black bg-white dark:bg-orange-100
              // border border-gray-300  rounded-lg
              //   focus:outline-none"
              >
                {durationOptions.map((value) => (
                  <option key={value} value={value}>
                    {value} minutes
                  </option>
                ))}
              </select>
              {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}

            </div>
            <div className="w-1/3 mx-2">
              <label htmlFor="dropdown2" className="block text-sm font-medium text-gray-600">Question Number</label>
              <select
                id="questions_number"
                {...register('questions_number', { required: "Question No required" })}
                className="mt-1 p-2 w-full border rounded-md"
              >
                {questionNumbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              {errors.questions_number && <p className="text-red-500">{errors.questions_number.message}</p>}
            </div>
            <div className="w-1/3 ml-2">
              <label htmlFor="dropdown3" className="block text-sm font-medium text-gray-600">Score Per Question</label>
              <select
                id="score_per_question"
                {...register('score_per_question', { required: "Secore per question required" })}
                className="mt-1 p-2 w-full border rounded-md"
              >
                {scorePerQuestion.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              {errors.score_per_question && <p className="text-red-500">{errors.score_per_question.message}</p>}
            </div>
          </div>

          {/* Third Row: Textarea */}
          <div className="mb-4">
            <label htmlFor="textarea" className="block text-sm font-medium text-gray-600">Description</label>
            <textarea
              id="textarea"
              className="mt-1 p-2 w-full border rounded-md"
              {...register('description')}
            ></textarea>
          </div>

          {/* ... Fourth and Fifth Rows and other rows as needed ... */}
          {/* Combined Schedule and Time Row */}
          <div className="mb-4">
            <label htmlFor="dateTime" className="block text-sm font-medium text-gray-600">Schedule</label>
            <div className="flex items-center">
              <input
                type="datetime-local"
                id="schedule"
                className="mt-1 p-2 border rounded-md mr-2"
                {...register('schadule', { required: "Schedule is required" })}
              />
              {errors.schadule && <p className="text-red-500">{errors.schadule.message}</p>}
            </div>
          </div>

          {/* Second Row: 3 Dropdowns */}
          <div className="flex mb-4">
            <div className="w-1/3 mr-2">
              <label htmlFor="dropdown1" className="block text-sm font-medium text-gray-600">Difficulty 1</label>
              <select
                {...register("difficulty", { required: "type is required" })} id="dropdown" className="w-full border p-2 rounded focus:outline-none focus:border-blue-500">
                <option value="" disabled defaultValue>Select Difficulty Level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              {errors.difficulty && <p className="text-red-500">{errors.difficulty.message}</p>}
            </div>
            <div className="w-1/3 mx-2">
              <label className="block text-sm font-medium text-gray-600">Type:</label>
              <select
                {...register("type", { required: "type is required" })} id="dropdown" className="w-full border p-2 rounded focus:outline-none focus:border-blue-500">
                <option value="" disabled selected>Select Type</option>
                <option value="BE">BE</option>
                <option value="FE">FE</option>
                <option value="DO">DO</option>
              </select>
              {errors.type && <p className="text-red-500">{errors.type.message}</p>}
            </div>
            <div className="w-1/3 ml-2">
              <label htmlFor="dropdown3" className="block text-sm font-medium text-gray-600">Groups</label>
              <select
                id="group"

                {...register('group')}
                className="mt-1 p-2 w-full border rounded-md"
              >
                {groups.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))}
              </select>
              {errors.group && <p className="text-red-500">{errors.group.message}</p>}

            </div>
          </div>


        </SharedModal>
      )}

      {isCodeModalOpen && (
        <SharedModal closeModal={() => setIsCodeModalOpen(false)} onHide={() => setIsCodeModalOpen(false)}>
          <div className="mb-4 text-center">
            <img src={codeImg} width={100} alt="Update Image" className="mx-auto" />
            <p>Quiz was successfully created</p>
            <div className="mb-4">
              <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">

                      <p className="text-lg font-semibold">{createdQuizCode}</p>
                      <button
                        onClick={handleCopyCode}
                        className="cursor-pointer"
                      >
                        <ClipboardCopyIcon className="h-6 w-6 text-yellow-500 ml-56" />
                      </button>
                    </div>
                    {copySuccess && <p className="text-green-500">Copied!</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SharedModal>
      )}

    </>
  );
};

export default NavBar;
