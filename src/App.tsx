import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import MasterLayout from "./Shared/MasterLayout/MasterLayout";
import { Notfound } from "./Shared/Notfound/Notfound";
import ForgetPassword from "./authentication/ForgetPassword/ForgetPassword";
import Login from "./authentication/Login/Login";
import Register from "./authentication/Register/Register";
import { AuthLayout } from "./Shared/AuthLayout/AuthLayout";
import { ToastContainer } from "react-toastify";
import QuizzesDetails  from "./Features/Instructor/Quizzes/QuizzesDetails/QuizzesDetails.tsx";
// import Questions from './Features/Instructor/Quizzes/Questions/Questions';
import ResetPassword from "./authentication/ResetPassword/ResetPassword";
import ChangePassword from "./authentication/ChangePassword/ChangePassword";
import Groups from "./Features/Instructor/Groups/Groups";
import Quizzes from './Features/Instructor/Quizzes/Quizzes.tsx';
import Questions from './Features/Instructor/Quizzes/Questions/Questions.tsx';
// import { QuizzesDetails } from './Features/Instructor/Quizzes/QuizzesDetails/QuizzesDetails';
import Dashboard from "./Features/Instructor/Dashboard/Dashboard";
import Students from "./Features/Instructor/Students/Students";
import { Provider } from "react-redux";
import store from "./Redux/Store.tsx";
import Results from "./Features/Instructor/Results/Results";
import ViewResults from "./Features/Instructor/ViewResults/ViewResults";
import LearnerQuizzes from "./Features/Learner/LearnerQuizzes/LearnerQuizzes";
import QuizWithoutAnswer from "./Features/Learner/LearnerQuizzes/QuizWithoutAnswer/QuizWithoutAnswer.tsx";
import ProtectedRoute from "./Shared/ProtectedRoute/ProtectedRoute.tsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "notfound", element: <Notfound /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
    {
      path: "dashboard",

      element: <ProtectedRoute><MasterLayout /></ProtectedRoute>,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "students", element: <Students /> },
        { path: "groups", element: <Groups /> },
        { path: "results", element: <Results /> },
        { path: "results/viewresults", element: <ViewResults /> },

        { path: "quizzes/questions", element: <Questions /> },

        // { path: "projects/add-project", element: <AddProject /> },
        // { path: "users", element: <Users /> },
        // { path: "tasks", element: <Tasks /> },
        // { path: "tasks/add-task", element: <AddTask /> },
        { path: "quizzes", element: <Quizzes /> },
        { path: "quizzes/quiz-details/:quizzId", element: <QuizzesDetails /> },
        { path: "learnerquiz", element: <LearnerQuizzes /> },
        { path: "learnerquiz/quizwithoutans/:quizId", element: <QuizWithoutAnswer /> },
      ],
    },
  ]);

  return (
    <>
      <div>
        <Provider store={store}>
          <RouterProvider router={routes} />

        </Provider>
      </div>
    </>
  );
}

export default App;
