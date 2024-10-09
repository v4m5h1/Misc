import React, { useEffect } from 'react';

const ToastMessage = ({ show, onClose, message }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer); // Cleanup timeout on unmount or show change
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed z-50 p-4 bg-white border border-gray-300 rounded-lg shadow-md top-5 right-5"
      style={{ transition: 'opacity 0.3s ease', opacity: show ? 1 : 0 }}
    >
      <div className="flex items-center justify-between">
        <strong className="text-lg">Notification</strong>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      <div className="mt-2 text-gray-700">{message}</div>
    </div>
  );
};

export default ToastMessage;
