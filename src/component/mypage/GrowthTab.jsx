// 성장 기록 차트 및 배지
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const GrowthTab = ({ growthData, emotionData, badges }) => {
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
              {emotionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">획득 배지</h2>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div key={badge.id} className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${badge.unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
              <div className="text-3xl mb-2">{badge.unlocked ? badge.icon : '🔒'}</div>
              <h3 className="font-semibold text-gray-800 text-sm">{badge.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowthTab;