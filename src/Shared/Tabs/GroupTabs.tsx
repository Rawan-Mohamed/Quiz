import React, { useEffect, useState } from "react";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import CustomModal from "./../CustomModal/CustomModal";
import studentImg from "../../assets/images/delete-student-hi.png";
import studentcardImg from "../../assets/images/card.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./../../Redux/Features/Instructor/Students/GetAllStudentsSlice";
import { deleteStudent } from "./../../Redux/Features/Instructor/Students/DeleteStudentsSlice";
interface GroupTabsProps {}

const GroupTabs: React.FC<GroupTabsProps> = () => {
  // get all students from api
  const dispatch = useDispatch();

  const {
    data: students,
    loading,
    error,
  } = useSelector((state) => state.studentsData) || {};

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Initializing state for delete modal visibility
  const [studentIdToDelete, setStudentIdToDelete] = useState(""); // Initializing state for student ID to delete

  const handleOpenDeleteModal = (studentId: string) => {
    setIsDeleteModalOpen(true);
    setStudentIdToDelete(studentId);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setStudentIdToDelete("");
  };

  const handleDeleteStudent = () => {
    dispatch(deleteStudent({ id: studentIdToDelete })); // Dispatching action to delete student
    setIsDeleteModalOpen(false);
    setStudentIdToDelete(""); // Resetting student ID to delete
    dispatch(fetchStudents());
  };
  const [buttonActive, setButtonActive] = useState<string>("tab0");

  const handleButtonClick = (value: string) => {
    if (value === buttonActive) {
      return;
    }
    setButtonActive(value);
  };

  return (
    <div className="mb-3">
      <TETabs>
        <TETabsItem
          onClick={() => handleButtonClick("tab0")}
          active={buttonActive === "tab0"}
          tag="button"
          className={`${
            buttonActive === "tab0"
              ? "bg-black text-white"
              : "bg-white text-black"
          } border border-gray-300 px-4 py-2 m-2 rounded-md flex items-center`}
        >
          All Students Groups
        </TETabsItem>
      </TETabs>

      <TETabsContent>
        <div className="grid grid-cols-12 gap-4">
          {buttonActive === "tab0" &&
            students.map((student) => (
              <div
                key={student._id}
                className="col-span-12 sm:col-span-6 lg:col-span-4"
              >
                <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <img
                        src={studentcardImg}
                        alt="Student Image"
                        className="w-10 h-10"
                        style={{
                          backgroundColor: "#FFEDDF",
                          borderRadius: "10px",
                        }}
                      />
                      <p className="text-lg font-semibold">{`${student.first_name} ${student.last_name}`}</p>
                      
                      <div className="flex space-x-2">
                        <button
                          className="cursor-pointer"
                          onClick={() => handleOpenDeleteModal(student._id)} 
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="orange"
                            className="w-6 h-6"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* Additional student details as needed */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </TETabsContent>

      {/* delete custom modal */}
      <div>
        <CustomModal
          isOpen={isDeleteModalOpen} // Prop to control modal visibility
          onClose={handleCloseDeleteModal} // Prop for close modal action
          onButtonClick={handleDeleteStudent}
          buttonLabel="delete Student"
          width="100%"
          height="350px"
        >
          <div
            style={{ width: "410px" }}
            className=" bg-orange-200 bg-opacity-100 p-4"
          >
            <h1 className="text-2xl font-bold">Are you sure delete Student?</h1>
          </div>

          {/* Text Field */}
          <div className="m-auto">
            <img src={studentImg} style={{ height: "100px" }} />
          </div>
        </CustomModal>
      </div>
      {/* //delete custom modal */}
    </div>
  );
};

export default GroupTabs;
