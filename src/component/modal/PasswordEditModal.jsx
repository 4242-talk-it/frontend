import React, { useState } from 'react';
import Modal from '../common/Modal';

const PasswordEditModal = ({ isOpen, onClose, onSubmit }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    // 부모(SettingsTab)의 handleUpdatePassword 실행
    onSubmit({ newPassword }); 
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="비밀번호 변경">
      {/* 🚩 현재 비밀번호 입력칸은 삭제하세요. 밖에서 이미 검증했습니다. */}
      
      <label className="text-sm text-gray-600">새 비밀번호</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full px-4 py-3 mt-1 mb-4 border rounded-lg"
        placeholder="새 비밀번호 입력"
      />

      <label className="text-sm text-gray-600">새 비밀번호 확인</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-3 mt-1 border rounded-lg"
        placeholder="새 비밀번호 확인"
      />

      <button
        onClick={handleSubmit}
        className="w-full mt-6 py-3 bg-purple-600 text-white rounded-lg font-bold"
      >
        비밀번호 변경하기
      </button>
    </Modal>
  );
};

export default PasswordEditModal;