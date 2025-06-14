import React from "react";

const LoadingButton = ({ isLoading, onClick, children }) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center w-40 bg-white text-slate-950 hover:bg-white p-2 mt-6 font-semibold rounded-md ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span className="animate-spin inline-block mr-2">
            {/* Loading Spinner */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 border-t-2 border-blue-950 border-solid rounded-full animate-spin"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 13a7 7 0 0 0-14 0h0M5 11a7 7 0 0 1 14 0h0"
              />
            </svg>
          </span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
