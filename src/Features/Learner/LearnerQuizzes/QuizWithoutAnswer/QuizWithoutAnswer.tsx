import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionsWithoutAnswers } from "../../../../Redux/Features/Learner/QuestionsWithoutAnswerSlice";
import { useNavigate, useParams } from "react-router-dom";
import { submitQuiz } from "../../../../Redux/Features/Learner/SubmitQuizSlice";
import { toast } from "react-toastify";
import { ChevronLeftIcon, ChevronRightIcon, FlagIcon } from "@heroicons/react/outline";
import { Dialog } from '@headlessui/react';

const QuizWithoutAnswer = ({ duration }: { duration: number }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [markedQuestions, setMarkedQuestions] = useState<Set<string>>(new Set());
  const [timer, setTimer] = useState(duration * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const questionRef = useRef<HTMLDivElement>(null);

  const {
    questions: quiz,
    loading,
    error,
  } = useSelector((state) => state.questionWithoutAnswers);

  // Calculate progress and question stats
  const totalQuestions = quiz?.questions?.length || 0;
  const answeredQuestions = Object.keys(answers).length;

  // Enhanced submit handler with summary and confirmation
  const handleSubmitQuizAnswers = useCallback(async () => {
    if (isSubmitting) return;
    setShowSummary(false);
    setShowConfirm(false);
    setIsSubmitting(true);
    try {
      const payload = {
        quizId: quizId,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          question: questionId,
          answer: answer,
        })),
      };
      await dispatch(submitQuiz as any, payload);
      localStorage.removeItem(`quiz_timer_${quizId}`); // Clear saved timer
      toast.success("Quiz submitted successfully!");
      navigate(`/dashboard`);
    } catch (error) {
      toast.error("Error submitting quiz. Please try again.");
      setIsSubmitting(false);
    }
  }, [isSubmitting, answers, quizId, dispatch, navigate]);

  // Timer logic with auto-submission
  const handleAutoSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    toast.info("Time's up! Submitting your quiz...");
    await handleSubmitQuizAnswers();
  }, [isSubmitting, handleSubmitQuizAnswers]);

  useEffect(() => {
    // Restore timer state if exists
    const savedTimer = localStorage.getItem(`quiz_timer_${quizId}`);
    if (savedTimer) {
      setTimer(parseInt(savedTimer));
    }
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        if (prevTimer === 300 || prevTimer === 60) {
          toast.warning(`Time remaining: ${Math.floor(prevTimer / 60)} minutes!`);
        }
        // Save timer state to localStorage every tick
        localStorage.setItem(`quiz_timer_${quizId}` , (prevTimer-1).toString());
        return prevTimer - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [quizId, handleAutoSubmit]);

  // Navigation functions
  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev: number) => prev + 1);
    }
  }, [currentQuestionIndex, totalQuestions]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev: number) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const toggleMarkQuestion = useCallback((questionId: string) => {
    setMarkedQuestions((prev: Set<string>) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  }, []);

  const handleAnswerSelect = (questionId: string, selectedAnswer: string) => {
    setAnswers((prevState: Record<string, string>) => ({
      ...prevState,
      [questionId]: selectedAnswer,
    }));
  };

  useEffect(() => {
    dispatch(fetchQuestionsWithoutAnswers as any, quizId);
  }, [dispatch, quizId]);

  // Focus on question when it changes (for accessibility)
  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.focus();
    }
  }, [currentQuestionIndex]);

  // Timer display
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const timerColor = timer <= 300 ? "text-red-600" : "text-gray-700";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">Error loading quiz: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-4xl mx-auto bg-white dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      {/* Progress and Timer Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-semibold">
            Progress: {answeredQuestions}/{totalQuestions} Questions Answered
          </div>
          <div className={`text-lg font-bold ${timerColor}`}>
            Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
          <div
            className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-4 rounded-full transition-all duration-300 absolute top-0 left-0"
            style={{ width: `${(timer/(duration*60))*100}%` }}
            aria-label="Timer Progress Bar"
          ></div>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="flex justify-between mb-6">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          aria-label="Previous question"
          className={`flex items-center px-4 py-2 rounded ${
            currentQuestionIndex === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Previous
        </button>
        <button
          onClick={goToNextQuestion}
          disabled={currentQuestionIndex === totalQuestions - 1}
          aria-label="Next question"
          className={`flex items-center px-4 py-2 rounded ${
            currentQuestionIndex === totalQuestions - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
          <ChevronRightIcon className="h-5 w-5 ml-1" />
        </button>
      </div>

      {/* Current Question */}
      {quiz?.questions && quiz.questions[currentQuestionIndex] && (
        <div
          ref={questionRef}
          tabIndex={-1}
          aria-live="polite"
          aria-label={`Question ${currentQuestionIndex + 1}`}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 transition-all duration-500 ease-in-out animate-fade-in"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h2>
            <button
              onClick={() => toggleMarkQuestion(quiz.questions[currentQuestionIndex]._id)}
              className={`p-2 rounded-full ${
                markedQuestions.has(quiz.questions[currentQuestionIndex]._id)
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <FlagIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="mb-6">
            <p className="text-lg mb-4">{quiz.questions[currentQuestionIndex].title}</p>
            <div className="space-y-3">
              {quiz.questions[currentQuestionIndex].type === 'TRUE_FALSE' ? (
                ['True', 'False'].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      (answers as Record<string, string>)[quiz.questions[currentQuestionIndex]._id] === option
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question_${currentQuestionIndex}`}
                      value={option}
                      checked={(answers as Record<string, string>)[quiz.questions[currentQuestionIndex]._id] === option}
                      onChange={() => handleAnswerSelect(quiz.questions[currentQuestionIndex]._id, option)}
                      className="mr-3"
                    />
                    <span>{option}</span>
                  </label>
                ))
              ) : (
                Object.entries(quiz.questions[currentQuestionIndex].options).map(
                  ([optionKey, optionValue]: [string, unknown]) => (
                    <label
                      key={optionKey}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                        (answers as Record<string, string>)[quiz.questions[currentQuestionIndex]._id] === optionKey
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question_${currentQuestionIndex}`}
                        value={optionKey}
                        checked={(answers as Record<string, string>)[quiz.questions[currentQuestionIndex]._id] === optionKey}
                        onChange={() => handleAnswerSelect(quiz.questions[currentQuestionIndex]._id, optionKey)}
                        className="mr-3"
                      />
                      <span>{String(optionValue)}</span>
                    </label>
                  )
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Question Navigation Grid */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {quiz?.questions?.map((question: { _id: string }, index: number) => (
          <button
            key={question._id}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`p-2 rounded-lg text-center ${
              currentQuestionIndex === index
                ? "bg-blue-500 text-white"
                : (answers as Record<string, string>)[question._id]
                ? "bg-green-100 text-green-800"
                : markedQuestions.has(question._id)
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowSummary(true)}
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-lg text-white font-semibold ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>

      {/* Summary Modal */}
      <Dialog open={showSummary} onClose={() => setShowSummary(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <Dialog.Title className="text-lg font-bold mb-2">Quiz Summary</Dialog.Title>
            <div className="mb-4">
              <div>Answered: {answeredQuestions}</div>
              <div>Unanswered: {totalQuestions - answeredQuestions}</div>
              <div>Marked for Review: {markedQuestions.size}</div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowSummary(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={() => { setShowSummary(false); setShowConfirm(true); }} className="px-4 py-2 bg-blue-500 text-white rounded">Continue</button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <Dialog.Title className="text-lg font-bold mb-2">Confirm Submission</Dialog.Title>
            <div className="mb-4">Are you sure you want to submit your quiz? You won't be able to change your answers after submission.</div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleSubmitQuizAnswers} className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default QuizWithoutAnswer;

// Add fade-in animation to tailwind config (if not present):
// .animate-fade-in { @apply opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]; }
// @keyframes fadeIn { to { opacity: 1; } }
