import { useDispatch, useSelector } from "react-redux";
import CustomLeftCard from "../../../Shared/CustomComponents/CustomLeftCard/CustomLeftCard";
import imagCard from "../../../assets/images/Quiz img.png";
import imagCard1 from "../../../assets/images/Quiz img1.png";
import CustomRightCard from "./../../../Shared/CustomComponents/CustomRightCard/CustomRightCard";
import styles from './Dashboard.module.css';
import { useEffect } from "react";
import { fetchIncommingQuizzes } from "../../../Redux/Features/Instructor/Quizzes/incommingQuizSlice";
import { fetchIncommingStudent } from "../../../Redux/Features/Instructor/Students/incommingStudentSlice";


const Dashboard = () => {
  const data1 = {
    title: "Cours 1",
    date: "12 / 03 / 2023",
    time: "09:00 AM",
    enrolledStudents: 32,
    image: imagCard,
  };

  // second card
  const data2 = {
    name: "william jos abou",
    classRank: "CM2",
    score: 49,
    image: imagCard1,
  };
  const dispatch = useDispatch();

  const userRole = useSelector((state) => state.users.role); // Assuming 'users' is the slice name where the user role is stored
  const { data: incommingquiz } = useSelector((state) => state.incommingQuizData) || {};
  const { data: incommingstudent } = useSelector((state) => state.incommingStudentData) || {};
  useEffect(() => {

    dispatch(fetchIncommingQuizzes());
    dispatch(fetchIncommingStudent())

  }, [dispatch]);
  return (
    <>
      {userRole && (
        <div className="container flex flex-col sm:flex-row md:flex-row lg:flex-row gap-x-5 sm:gap-y-5 justify-center">
          <div className={styles["left"]}>
            <div className={styles["details"]}>
              <h2 className="font-medium">Upcoming 5 quizzes</h2>
              <p className="text-xs  flex items-center">Quiz directory
                <i className={` pr-2 ${styles["icon-toright"]}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>

                </i>

              </p>
            </div>

            {/* <CustomLeftCard
            title={data1.title}
            date={data1.date}
            time={data1.time}
            enrolledStudents={data1.enrolledStudents}
            image={data1.image}
          />
          <CustomLeftCard
            title={data1.title}
            date={data1.date}
            time={data1.time}
            enrolledStudents={data1.enrolledStudents}
            image={data1.image}
          /> */}
            {incommingquiz.map((quiz) => (
              <CustomLeftCard
                key={quiz._id}
                title={quiz.title}
                date={quiz.schadule}
                time={quiz.duration}
                enrolledStudents={quiz.participants}
                // image={quiz.image}
                image={data1.image}
                customWidth="500px"


              />
            ))}
          </div>

          {userRole === "Instructor" ? (
            <div className={styles["right"]}>
              <div className={styles["details"]}>
                <h2 className="font-medium">Top 5 Students </h2>
                <p className="text-xs flex items-center ">All Students
                  <i className={` pr-2 ${styles["icon-toright"]}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>

                  </i>

                </p>
              </div>
              {incommingstudent.map((student) => (
                <CustomRightCard
                  key={student._id}
                  name={student.first_name}
                  email={student.email}
                  status={student.status}
                  // image={quiz.image}
                  image={data2.image}
                  customWidth="500px"


                />
              ))}
              {/* <CustomRightCard
            name={data2.name}
            classRank={data2.classRank}
            score={data2.score}
            image={data2.image}
          />
          <CustomRightCard
            name={data2.name}
            classRank={data2.classRank}
            score={data2.score}
            image={data2.image}
          /> */}
            </div>


          ) : ''}
        </div>
      )}
    </>
  );
};

export default Dashboard;
