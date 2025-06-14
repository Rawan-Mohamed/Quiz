import { XIcon, CheckIcon } from '@heroicons/react/outline';

const SharedModal = ({ closeModal, onSave,onHide, children, width }) => {
    const handleOverlayClick = (e) => {
        // Check if the click target is the overlay (outside the modal)
        if (e.target === e.currentTarget) {
            // Call onHide if the click is outside the modal
            onHide();
        }
    };
    return (
        <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center" onClick={handleOverlayClick}>
                <div className={`bg-white p-8 rounded shadow-lg ${width && `w-${width}` || 'w-4/12'} relative`}>
                    {/* Move the buttons to the top right */}
                    <div className="absolute top-0 right-0 pt-2 pr-2">
                        <button onClick={closeModal} className="text-black ">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg> */}

                            <XIcon className="h-10 w-10   hover:text-red-700 ml-2" />
                            <span className='sr-only'>close</span>

                        </button>
                        <button onClick={onSave} className="text-black ">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg> */}
                            <CheckIcon className="h-10 w-10  hover:text-green-700 ml-2" />
                            <span className='sr-only'>save</span>

                        </button>

                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default SharedModal;
