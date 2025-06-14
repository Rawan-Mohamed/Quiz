// ******** Base Url **********
export const baseUrl = "https://upskilling-egypt.com:3005/api";

// export const requestHeaders = `${localStorage.getItem("accessToken")}`;
export const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,

  };
  


// ******** Login ********
export const loginUrl = `${baseUrl}/auth/login`;
// ******** Register ********
export const registerUrl = `${baseUrl}/auth/register`;
// ******** Reset-Password ********
export const resetPassUrl = `${baseUrl}/auth/reset-password`;
// ******** forget-Password ********
export const forgetPassUrl = `${baseUrl}/auth/forgot-password`;
// ******** Change-Password ********
export const changePassUrl = `${baseUrl}/auth/change-password`;
// ******** Logout ********
export const logoutUrl = `${baseUrl}/auth/logout`;
//***authToken */
// ******** Students APIs ********
export const  getAllStudentsUrl = `${baseUrl}/student`;
export const  deleteStudentUrl = `${baseUrl}/student`;



export const  getResultsUrl = `${baseUrl}/quiz/result`;


export const  quizDetailsUrl = `${baseUrl}/quiz`;
export const UpdateQuizessUrl =`${baseUrl}/quiz`; //with id
// **********join quiz*********************
export const joinQuizUrl =`${baseUrl}/quiz/join`
// ********questionsWithoutAnswers********
export const questionsWithoutAnswers =`${baseUrl}/quiz/without-answers`
// export const questionsWithoutAnswers =`${baseUrl}/quiz/without-answers/65cf3f748f25f1b30030c90b`

// ******** Quizzes APIs ********
export const  quizzesUrl = `${baseUrl}/quiz`;
// ******** Questions API ********
export const  getAllQuestionsUrl = `${baseUrl}/question`;
// ******** Update Questions API ********
export const updateQuestionUrl =`${baseUrl}/question`; //with id
export const QuestionUrl =`${baseUrl}/question`; //with id

// ******** Group Url ********
export const allGroupUrl = `${baseUrl}/group`;
// ******** deleteGroupUrl  ********
export const deleteGroupUrl = `${baseUrl}/group`; //with Id

// ******** first incoming  & completed quiz ***********
export const incommingQuiz = `${baseUrl}/quiz/incomming`
export const completedQuiz = `${baseUrl}/quiz/completed`

export const incommingStudent = `${baseUrl}/student/top-five`
// *************submit quiz************
export const submitQuizUrl = `${baseUrl}/quiz/submit`



