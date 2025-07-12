import { useDispatch, useSelector } from "react-redux";
import CustomLeftCard from "../../../Shared/CustomComponents/CustomLeftCard/CustomLeftCard";
import imagCard from "../../../assets/images/Quiz img.png";
import imagCard1 from "../../../assets/images/Quiz img1.png";
import CustomRightCard from "./../../../Shared/CustomComponents/CustomRightCard/CustomRightCard";
import styles from './Dashboard.module.css';
import { useEffect } from "react";
import { fetchIncommingQuizzes } from "../../../Redux/Features/Instructor/Quizzes/incommingQuizSlice";
import { fetchIncommingStudent } from "../../../Redux/Features/Instructor/Students/incommingStudentSlice";
import { AppDispatch, RootState } from "../../../Redux/Store";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userRole = useSelector((state: RootState) => state.users.role);
  const { data: incommingquiz } = useSelector((state: RootState) => state.incommingQuizData) || {};
  const { data: incommingstudent } = useSelector((state: RootState) => state.incommingStudentData) || {};

  useEffect(() => {
    dispatch(fetchIncommingQuizzes());
    dispatch(fetchIncommingStudent());
  }, [dispatch]);

  // Mock data for demonstration
  const data1 = {
    title: "Cours 1",
    date: "12 / 03 / 2023",
    time: "09:00 AM",
    enrolledStudents: 32,
    image: imagCard,
  };

  const data2 = {
    name: "william jos abou",
    classRank: "CM2",
    score: 49,
    image: imagCard1,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Welcome back, {userRole}!
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Here's what's happening with your quizzes and students today.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {incommingquiz?.length || 0}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Upcoming Quizzes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600 dark:text-success-400">
                  {incommingstudent?.length || 0}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Active Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Quizzes Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Upcoming Quizzes
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Your next 5 scheduled quizzes
                </p>
              </div>
              <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
                <span className="text-sm font-medium">View All</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              {incommingquiz && incommingquiz.length > 0 ? (
                incommingquiz.map((quiz: any) => (
                  <div
                    key={quiz._id}
                    className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                          {quiz.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                          <span>{new Date(quiz.schadule).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{quiz.duration || 'N/A'} min</span>
                          <span>•</span>
                          <span>{quiz.participants || 0} students</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">No upcoming quizzes</h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Get started by creating your first quiz.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Students Section */}
        {userRole === "Instructor" && (
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    Top Students
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Your best performing students
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
                  <span className="text-sm font-medium">View All</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                {incommingstudent && incommingstudent.length > 0 ? (
                  incommingstudent.map((student: any, index: number) => (
                    <div
                      key={student._id}
                      className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-neutral-300 dark:bg-neutral-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            {student.first_name?.charAt(0)?.toUpperCase() || 'S'}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                          {student.first_name}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                          {student.email}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                            #{index + 1}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            student.status === 'active' 
                              ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200'
                              : 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200'
                          }`}>
                            {student.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">No students yet</h3>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      Students will appear here once they join your quizzes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors">
            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Create Quiz</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-success-50 dark:bg-success-900/20 rounded-lg hover:bg-success-100 dark:hover:bg-success-900/40 transition-colors">
            <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Add Students</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg hover:bg-warning-100 dark:hover:bg-warning-900/40 transition-colors">
            <svg className="w-6 h-6 text-warning-600 dark:text-warning-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">View Results</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors">
            <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
