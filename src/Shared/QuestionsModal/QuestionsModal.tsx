
const QuestionsModal = ({ closeModal, onSave, children }) => {
    return (
        <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center" >
                <div className="bg-white p-8 rounded shadow-lg w-4/6">
                    {children}
                    <div className="flex justify-end">
                        <button onClick={closeModal} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                            Close
                        </button>
                        <button onClick={onSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default QuestionsModal