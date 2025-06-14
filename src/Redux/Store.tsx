import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/Auth/LoginSlice";
import registerReducer from "./Features/Auth/RegisterSlice";
import groupsReducer from "./Features/Instructor/Groups/GroupsSlice";
import deleteGroupReducer from "./Features/Instructor/Groups/DeleteGroupSlice";
import logoutReducer from "./Features/Auth/LogoutSlice";
import questionsReducer from "./Features/Instructor/Questions/GetQuestionsSlice";
import createQuestionReducer from "./Features/Instructor/Questions/CreateQuestionsSlice";
import updateQuestionReducer from "./Features/Instructor/Questions/UpdateQuestionsSlice";
import deleteQuestionReducer from "./Features/Instructor/Questions/DeleteQuestionsSlice";
import detailsQuestionReducer from "./Features/Instructor/Questions/DetailsQuestionsSlice";
import changePasswordReducer from "./Features/Auth/ChangePasswordSlice";
import studentsReducer from "./Features/Instructor/Students/GetAllStudentsSlice";
import questionWithoutAnswersReducer from "./Features/Learner/QuestionsWithoutAnswerSlice";
import joinMyQuizReducer from "./Features/Learner/joinQuiz";
import submitQuizReducer from "./Features/Learner/SubmitQuizSlice";
import quizzessReducer from "./Features/Instructor/Quizzes/getQuizzesSlice";
import deleteQuizReducer from "./Features/Instructor/Quizzes/deleteQuizzesSlice";
import incommingQuizdeleteQuiz from "./Features/Instructor/Quizzes/incommingQuizSlice";
import completedQuizdeleteQuiz from "./Features/Instructor/Quizzes/completedQuizzesSlice";

import resultsDataReducer from "./Features/Instructor/Results/GetAllResultsSlice";

import quizDetailsReducer from "./Features/Instructor/Quizes/QuizesDetaiksSlice";
import updateQuizesReducer from "./Features/Instructor/Quizes/QuizesUpdateSlice";

import incommingStdentQuiz from "./Features/Instructor/Students/incommingStudentSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    register: registerReducer,

    groupsSlice: groupsReducer,
    deleteGroup: deleteGroupReducer,
    auth: logoutReducer,
    questionsData: questionsReducer,
    createQuestionData: createQuestionReducer,
    updateQuestionData: updateQuestionReducer,
    updateQuizesData: updateQuizesReducer,
    deleteQuestion: deleteQuestionReducer,
    questionsDetails: detailsQuestionReducer,
    changePassword: changePasswordReducer,
    studentsData: studentsReducer,
    questionWithoutAnswers: questionWithoutAnswersReducer,
    joinQuizData: joinMyQuizReducer,
    // deleteItem: deleteItemReducer,
    quizDetailsData: quizDetailsReducer,
    quizzesData: quizzessReducer,
    deleteQuiz: deleteQuizReducer,
    incommingQuizData: incommingQuizdeleteQuiz,
    completedQuizData: completedQuizdeleteQuiz,
    incommingStudentData: incommingStdentQuiz,
    resultsData: resultsDataReducer,
    sumbitedQuiz: submitQuizReducer,
  },
});

export default store;
