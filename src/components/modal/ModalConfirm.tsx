'use client';

import { useState } from 'react';
import Button from '../button/Button';

interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  title?: string;
  message?: string;
}

const ModalConfirm = ({
  isOpen,
  onClose,
  handleConfirm,
  title = 'Confirm',
  message = 'Are you sure want to do this?',
}: ModalConfirmProps) => {
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    setLoading(true);
    setTimeout(() => {
      handleConfirm();
      onClose();
      setLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-[99] inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-xl modal-content max-h-[95dvh] overflow-y-auto px-3">
        <div className="flex flex-col gap-2 border-b border-neutral-400 p-6">
          <h2 className="text-xl font-bold">{title}</h2>
          <span className="">{message}</span>
        </div>

        <div className="flex items-center justify-end space-x-2 px-6 py-4 border-t border-neutral-400">
          <Button
            label="Close"
            type="button"
            disabled={loading}
            onClick={onClose}
            className="bg-gray-200 text-gray-600 w-fit hover:bg-gray-300 transition-all"
          />
          <Button
            label="Delete"
            type="button"
            loading={loading}
            onClick={onConfirm}
            className="bg-red-500 text-white w-fit px-4 hover:bg-red-600 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
