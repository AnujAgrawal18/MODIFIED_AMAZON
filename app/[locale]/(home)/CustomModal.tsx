// components/CustomModal.tsx
'use client';
import React from 'react';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, title, message }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-2 text-green-600">{title}</h2>
        <p className="text-sm text-gray-700 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
