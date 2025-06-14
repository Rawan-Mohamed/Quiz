// CustomModal.tsx

import React, { useState } from 'react';

// Define the props for the CustomModal component
interface ModalProps {
    onClose: () => void;
}

// Define the CustomModal functional component
const Modal: React.FC<ModalProps> = ({ onClose }) => {
    // State hooks for form fields
    const [title, setTitle] = useState('');
    const [dropdown1Value, setDropdown1Value] = useState('');
    const [dropdown2Value, setDropdown2Value] = useState('');
    const [dropdown3Value, setDropdown3Value] = useState('');
    const [textareaValue, setTextareaValue] = useState('');

    // Function to handle saving form data
    const handleSave = () => {
        // Add your logic to save the form data
        // For example, you can send an API request or perform other actions
        console.log('Form data saved:', { title, dropdown1Value, dropdown2Value, dropdown3Value, textareaValue });

        // Close the modal after saving
        onClose();
    };

    // Return JSX for the CustomModal component
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg w-10/12">
                {/* First Row: Input Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 pl-20 w-full border rounded-md" // Adjusted to accommodate the background span
                    />
                </div>

                {/* Second Row: 3 Dropdowns */}
                <div className="flex mb-4">
                    <div className="w-1/3 mr-2">
                        <label htmlFor="dropdown1" className="block text-sm font-medium text-gray-600">Dropdown 1</label>
                        <select
                            id="dropdown1"
                            name="dropdown1"
                            value={dropdown1Value}
                            onChange={(e) => setDropdown1Value(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        >
                            {/* Dropdown options here */}
                        </select>
                    </div>
                    <div className="w-1/3 mx-2">
                        <label htmlFor="dropdown2" className="block text-sm font-medium text-gray-600">Dropdown 2</label>
                        <select
                            id="dropdown2"
                            name="dropdown2"
                            value={dropdown2Value}
                            onChange={(e) => setDropdown2Value(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        >
                            {/* Dropdown options here */}
                        </select>
                    </div>
                    <div className="w-1/3 ml-2">
                        <label htmlFor="dropdown3" className="block text-sm font-medium text-gray-600">Dropdown 3</label>
                        <select
                            id="dropdown3"
                            name="dropdown3"
                            value={dropdown3Value}
                            onChange={(e) => setDropdown3Value(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        >
                            {/* Dropdown options here */}
                        </select>
                    </div>
                </div>

                {/* Third Row: Textarea */}
                <div className="mb-4">
                    <label htmlFor="textarea" className="block text-sm font-medium text-gray-600">Textarea</label>
                    <textarea
                        id="textarea"
                        name="textarea"
                        value={textareaValue}
                        onChange={(e) => setTextareaValue(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    ></textarea>
                </div>

                {/* ... Fourth and Fifth Rows and other rows as needed ... */}
                {/* Combined Schedule and Time Row */}
                <div className="mb-4">
                    <label htmlFor="dateTime" className="block text-sm font-medium text-gray-600">Schedule and Time</label>
                    <div className="flex items-center">
                        <input
                            type="date"
                            id="schedule"
                            name="schedule"
                            // value={scheduleValue}
                            // onChange={(e) => setScheduleValue(e.target.value)}
                            className="mt-1 p-2 border rounded-md mr-2"
                        />
                        <input
                            type="time"
                            id="time"
                            name="time"
                            // value={timeValue}
                            // onChange={(e) => setTimeValue(e.target.value)}
                            className="mt-1 p-2 border rounded-md"
                        />
                    </div>
                </div>

                {/* Second Row: 3 Dropdowns */}
                <div className="flex mb-4">
                    <div className="w-1/3 mr-2">
                        <label htmlFor="dropdown1" className="block text-sm font-medium text-gray-600">Dropdown 1</label>
                        <select
                            id="dropdown1"
                            name="dropdown1"
                            value={dropdown1Value}
                            onChange={(e) => setDropdown1Value(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        >
                            {/* Dropdown options here */}
                        </select>
                    </div>
                    <div className="w-1/3 mx-2">
                        <label htmlFor="dropdown2" className="block text-sm font-medium text-gray-600">Dropdown 2</label>
                        <select
                            id="dropdown2"
                            name="dropdown2"
                            value={dropdown2Value}
                            onChange={(e) => setDropdown2Value(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        >
                            {/* Dropdown options here */}
                        </select>
                    </div>
                    <div className="w-1/3 ml-2">
                        <label htmlFor="dropdown3" className="block text-sm font-medium text-gray-600">Dropdown 3</label>
                        <select
                            id="dropdown3"
                            name="dropdown3"
                            value={dropdown3Value}
                            onChange={(e) => setDropdown3Value(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        >
                            {/* Dropdown options here */}
                        </select>
                    </div>
                </div>

                {/* Close and Save buttons for the modal */}
                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 mr-4">Close</button>
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
