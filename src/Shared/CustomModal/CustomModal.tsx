import React, { useState, useEffect, ReactNode } from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  // onButtonClick: () => void;
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonLabel?: string;
  width?: string;
  height?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
  onButtonClick,
  buttonLabel = "Button",
  width = "auto", // Default width
  height = "auto", // Default height
}) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div
            className="relative w-full h-full max-w-md p-4 mx-auto my-6 bg-white rounded-md shadow-lg"
            style={{ width, height }}
          >
            {/* Modal content */}
            <div className="flex flex-col items-start justify-between space-y-4 mt-4">
              {children}

              <div className="flex justify-end m-auto">
                <button
                  className="bg-black text-white border border-black px-4 py-2 rounded-md mr-5"
                  // onClick={onButtonClick}
                  onClick={(event) => onButtonClick(event)}

                >
                  {buttonLabel}
                </button>
                {/* Close button */}
                <button
                  className=" px-4 py-2 rounded-md bg-orange-200 bg-opacity-100   text-sm text-black transition duration-300 hover:text-gray-700 focus:outline-none"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
              {/* <button
                className="bg-black text-white border border-black px-4 py-2 rounded-md"
                onClick={onButtonClick}
              >
                {buttonLabel}
              </button> */}
              {/* Close button */}
              {/* <button
                className="px-4 py-2 rounded-md bg-orange-200 bg-opacity-100 self-end p-2 text-sm text-black transition duration-300 hover:text-gray-700 focus:outline-none"
                onClick={handleClose}
              >
                Close
              </button> */}

            </div>
          </div>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
      )}
    </>
  );
};

export default CustomModal;
