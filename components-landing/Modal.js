import React from 'react';

const Modal = ({ show, onClose, onSubmit }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Are you sure you want to submit the coding exercise?</h2>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onClose}
                    >
                        Go back
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={onSubmit}
                    >
                        Submit and finish Interview
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;