import { PlusCircleIcon } from "@heroicons/react/solid";
import GroupTabs from "../../../Shared/Tabs/GroupTabs";
import CustomModal from "../../../Shared/CustomModal/CustomModal";
import { useState } from "react";


const Students: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleButtonClick = () => {
    console.log("Button clicked!");
    // Handle the button click logic here
  };

  return (
    <div style={{ width: "100%", padding: "1rem" }}>
      <div className="container w-full mx-auto p-4 border rounded">
        <div className="col-span-full mt-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-5">Students List</h2>
          <button
            onClick={handleOpenModal}
            className="bg-white text-black border border-gray-900 px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircleIcon className="h-5 w-5 mr-1" />
            Add Student
          </button>
        </div>
        <br />
        <GroupTabs />
        {/* add custom modal */}
        <div>
          <CustomModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onButtonClick={handleButtonClick} 
            buttonLabel="Add Student"
            width="100%"
            height="350px"
          >
            
            <div
              style={{ width: "410px" }}
              className=" bg-orange-200 bg-opacity-100 p-4"
            >
              <h1 className="text-2xl font-bold">Add Student</h1>
            </div>

            {/* Text name Field */}
            <div className="mb-4">
              <input
                style={{ width: "410px" }}
                className="border rounded w-full py-2 px-3"
                id="studentName"
                type="text"
                placeholder="name"
              />
            </div>
            {/* phone Field */}
            <div className="mb-2">
            <input
                style={{ width: "410px" }}
                className="border rounded w-full py-2 px-3"
                id="studentPhone"
                type="number"
                placeholder="phone"
              />
            
            </div>
          </CustomModal>
        </div>
        {/* //custom modal */}
      </div>
    </div>
  );
};

export default Students;
