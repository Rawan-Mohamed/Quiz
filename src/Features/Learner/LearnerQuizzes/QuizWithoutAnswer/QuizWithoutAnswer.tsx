import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionsWithoutAnswers } from "../../../../Redux/Features/Learner/QuestionsWithoutAnswerSlice";
import { useNavigate, useParams } from "react-router-dom";
import { submitQuiz } from "../../../../Redux/Features/Learner/SubmitQuizSlice";
import { toast } from "react-toastify";
import { ChevronLeftIcon, ChevronRightIcon, FlagIcon } from "@heroicons/react/outline";

const QuizWithoutAnswer = ({ duration }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [timer, setTimer] = useState(duration * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizId } = useParams();

  const {
    questions: quiz,
    loading,
    error,
  } = useSelector((state) => state.questionWithoutAnswers);

  // Timer logic with auto-submission
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        
        // Show warning at 5 minutes and 1 minute remaining
        if (prevTimer === 300 || prevTimer === 60) {
          toast.warning(`Time remaining: ${Math.floor(prevTimer / 60)} minutes!`);
        }
        
        return prevTimer - 1;
      });
    }, 1000);

    // Save timer state to localStorage
    const saveTimerState = () => {
      localStorage.setItem(`quiz_timer_${quizId}`, timer.toString());
    };

    window.addEventListener('beforeunload', saveTimerState);

    // Restore timer state if exists
    const savedTimer = localStorage.getItem(`quiz_timer_${quizId}`);
    if (savedTimer) {
      setTimer(parseInt(savedTimer));
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', saveTimerState);
    };
  }, [quizId]);

  // Calculate progress
  const totalQuestions = quiz?.questions?.length || 0;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  // Navigation functions
  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, totalQuestions]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const toggleMarkQuestion = useCallback((questionId) => {
    setMarkedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  }, []);

  const handleAutoSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    toast.info("Time's up! Submitting your quiz...");
    await handleSubmitQuizAnswers();
  };

  const handleSubmitQuizAnswers = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const payload = {
        quizId: quizId,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          question: questionId,
          answer: answer,
        })),
      };

      await dispatch(submitQuiz(payload));
      localStorage.removeItem(`quiz_timer_${quizId}`); // Clear saved timer
      toast.success("Quiz submitted successfully!");
      navigate(`/dashboard`);
    } catch (error) {
      toast.error("Error submitting quiz. Please try again.");
      console.error("Error submitting quiz answers:", error);
      setIsSubmitting(false);
    }
  };

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setAnswers((prevState) => ({
      ...prevState,
      [questionId]: selectedAnswer,
    }));
  };

  useEffect(() => {
    dispatch(fetchQuestionsWithoutAnswers(quizId));
  }, [dispatch, quizId]);

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
    <div className="p-5 max-w-4xl mx-auto">
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
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="flex justify-between mb-6">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
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
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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
              {Object.entries(quiz.questions[currentQuestionIndex].options).map(
                ([optionKey, optionValue]) => (
                  <label
                    key={optionKey}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      answers[quiz.questions[currentQuestionIndex]._id] === optionKey
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question_${currentQuestionIndex}`}
                      value={optionKey}
                      checked={answers[quiz.questions[currentQuestionIndex]._id] === optionKey}
                      onChange={() => handleAnswerSelect(quiz.questions[currentQuestionIndex]._id, optionKey)}
                      className="mr-3"
                    />
                    <span>{optionValue}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Question Navigation Grid */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {quiz?.questions?.map((question, index) => (
          <button
            key={question._id}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`p-2 rounded-lg text-center ${
              currentQuestionIndex === index
                ? "bg-blue-500 text-white"
                : answers[question._id]
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
          onClick={handleSubmitQuizAnswers}
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
    </div>
  );
};

export default QuizWithoutAnswer;
