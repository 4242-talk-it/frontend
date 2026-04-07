import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axiosInstance from '../../api/axiosInstance';

const GrowthTab = ({ growthData, emotionData, userId }) => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('userId: ',userId)
    axiosInstance.get(`/api/chatting-badge/my?userId=${userId}`)
      .then(res => {
        setBadges(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('뱃지 조회 실패', err);
        setLoading(false);
      });
  }, [userId]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">성장 추이</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">대화 감정 비율</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={emotionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {emotionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">획득 배지</h2>
        {loading ? (
          <p className="text-center text-gray-400 py-8">불러오는 중...</p>
        ) : badges.length === 0 ? (
          <p className="text-center text-gray-400 py-8">아직 획득한 배지가 없어요!</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.badgeId}
                className="p-4 rounded-xl border-2 text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h3 className="font-semibold text-gray-800 text-sm">{badge.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                <p className="text-xs text-yellow-500 font-medium mt-2">
                  🏅 {formatDate(badge.earnedAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GrowthTab;