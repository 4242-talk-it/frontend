import React, { useState } from 'react';
import Modal from '../common/Modal';

const NicknameEditModal = ({
  isOpen,
  onClose,
  currentNickname,
  onSubmit,
}) => {
  const [newNickname, setNewNickname] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="닉네임 수정"
    >
      <label className="text-sm text-gray-600">현재 닉네임</label>
      <input
        value={currentNickname}
        disabled
        className="w-full px-4 py-3 mt-1 mb-4 bg-gray-50 border rounded-lg"
      />

      <label className="text-sm text-gray-600">새로운 닉네임</label>
      <input
        value={newNickname}
        onChange={(e) => setNewNickname(e.target.value)}
        className="w-full px-4 py-3 mt-1 border rounded-lg"
      />

      <button
        onClick={() => onSubmit(newNickname)}
        className="w-full mt-6 py-3 bg-purple-600 text-white rounded-lg"
      >
        닉네임 변경하기
      </button>
    </Modal>
  );
};

export default NicknameEditModal;
