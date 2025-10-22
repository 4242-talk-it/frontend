/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { 
  MessageCircle, TrendingUp, Settings, Calendar, Heart, Zap, Award, BarChart3, 
  Users, Clock, Target, Bell, User, Trash2, LogOut, ChevronRight, Star, Trophy,
  BookOpen, Smile, Frown, Meh, Eye, Filter, Download, MessageSquare
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('records');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showSettings, setShowSettings] = useState({
    notifications: true,
    soundAlerts: false,
    dataAnalytics: true
  });

const conversationHistory = [
    {
      id: 1,
      date: '2025-01-15',
      topic: '취미 이야기',
      keywords: ['영화', '음악', '독서'],
      emotion: 'positive',
      messageCount: 23,
      duration: '15분',
      messages: [
        { from: 'user', text: '안녕하세요! 오늘은 어떤 이야기를 나눠볼까요?' },
        { from: 'ai', text: '요즘 영화에 관심이 많아요' },
        { from: 'ai', text: '좋은 주제네요! 구체적으로 어떤 부분이 흥미로우신가요?' },
      ],
      feedback: {
        style: '공감형 대화',
        positive: ['적극적인 경청', '감정 표현이 풍부함'],
        improve: ['질문을 더 구체적으로 해보세요']
      }
    },
    {
      id: 2,
      date: '2025-01-14',
      topic: '진로 고민',
      keywords: ['직업', '미래', '계획'],
      emotion: 'neutral',
      messageCount: 31,
      duration: '22분',
      messages: [],
      feedback: {
        style: '분석형 대화',
        positive: ['논리적 사고', '체계적 접근'],
        improve: ['감정적 측면도 고려해보세요']
      }
    },
    {
      id: 3,
      date: '2025-01-13',
      topic: '인간관계',
      keywords: ['친구', '갈등', '소통'],
      emotion: 'negative',
      messageCount: 18,
      duration: '12분',
      messages: [],
      feedback: {
        style: '내향적 대화',
        positive: ['솔직한 감정 표현'],
        improve: ['다양한 관점에서 생각해보세요']
      }
    }
  ];


  const growthData = [
    { month: '10월', score: 65 },
    { month: '11월', score: 72 },
    { month: '12월', score: 78 },
    { month: '1월', score: 85 }
  ];

  const emotionData = [
    { name: '긍정적', value: 45, color: '#10B981' },
    { name: '보통', value: 35, color: '#6B7280' },
    { name: '부정적', value: 20, color: '#EF4444' }
  ];

  const badges = [
    { id: 1, name: '대화왕', icon: '👑', unlocked: true, description: '100회 대화 달성' },
    { id: 2, name: '공감마스터', icon: '❤️', unlocked: true, description: '공감 표현 50회' },
    { id: 3, name: '질문왕', icon: '❓', unlocked: false, description: '질문하기 100회' },
    { id: 4, name: '성장러', icon: '🌱', unlocked: true, description: '한 달 연속 사용' },
    { id: 5, name: '탐험가', icon: '🔍', unlocked: false, description: '모든 주제 경험' },
    { id: 6, name: '멘토', icon: '🎓', unlocked: false, description: '조언하기 마스터' }
  ];

  const getEmotionIcon = (emotion) => {
    switch (emotion) {
      case 'positive': return <Smile className="w-4 h-4 text-green-500" />;
      case 'negative': return <Frown className="w-4 h-4 text-red-500" />;
      default: return <Meh className="w-4 h-4 text-gray-500" />;
    }
  };

const openModal = (conversation) => setSelectedConversation(conversation);
const closeModal = () => setSelectedConversation(null);

  const TabButton = ({ icon: Icon, title, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{title}</span>
    </button>
  );

  const Badge = ({ badge }) => (
    <div
      className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
        badge.unlocked
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
    >
      <div className="text-3xl mb-2">{badge.unlocked ? badge.icon : '🔒'}</div>
      <h3 className="font-semibold text-gray-800 text-sm">{badge.name}</h3>
      <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 프로필 헤더 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">안녕하세요, 대화마스터님!</h1>
                <p className="text-gray-600">오늘도 즐거운 대화를 나눠보세요</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">LV.7</div>
              <div className="text-sm text-gray-500">다음 레벨까지 240XP</div>
            </div>
          </div>
        </div>

        {/* 탭 버튼 */}
        <div className="flex space-x-2 mb-6 bg-white rounded-xl p-2 shadow-lg">
          <TabButton icon={MessageCircle} title="기록/피드백" isActive={activeTab === 'records'} onClick={() => setActiveTab('records')} />
          <TabButton icon={TrendingUp} title="성장/대시보드" isActive={activeTab === 'growth'} onClick={() => setActiveTab('growth')} />
          <TabButton icon={Settings} title="설정/계정관리" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </div>

        {/* 탭별 내용 */}
        {activeTab === 'records' && (
          <div className="space-y-4">
            {conversationHistory.map((conv) => (
              <div key={conv.id} className={`bg-white p-4 rounded-lg shadow border-l-4 ${conv.emotion === 'positive' ? 'border-green-400' : conv.emotion === 'negative' ? 'border-red-400' : 'border-gray-400'} cursor-pointer`} onClick={() => openModal(conv)}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {getEmotionIcon(conv.emotion)}
                    <span className="font-medium">{conv.topic}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{conv.date}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {conv.keywords.map((k) => (
                    <span key={k} className="text-purple-600 text-xs bg-purple-100 px-2 py-1 rounded-full">
                      #{k}
                    </span>
                  ))}
                </div>
                <div className="text-gray-400 text-xs mt-1">{conv.messageCount}개 메시지</div>
                <div className="text-right text-purple-600 text-sm mt-1 cursor-pointer">피드백 보기 →</div>
              </div>
            ))}
          </div>
        )}

        {/* 모달 */}
        {selectedConversation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-lg p-6 relative">
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
              <h2 className="font-bold text-lg mb-2">{selectedConversation.topic}</h2>
              {/* 메시지 */}
              <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                {selectedConversation.messages.map((msg, idx) => (
                  <div key={idx} className={`${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`${msg.from === 'user' ? 'inline-block bg-purple-600 text-white' : 'inline-block bg-gray-100 text-gray-800'} px-3 py-2 rounded-lg max-w-xs`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI 피드백 */}
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <div className="flex items-center font-medium text-purple-600 mb-2">
                  ⚡ AI 피드백
                </div>
                <div className="text-sm mb-1">대화 스타일: <span className="font-semibold">{selectedConversation.feedback.style}</span></div>
                <div className="text-sm text-green-600 mb-1">잘한 점:
                  <ul className="list-disc ml-4">
                    {selectedConversation.feedback.positive.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="text-sm text-blue-600">개선 제안:
                  <ul className="list-disc ml-4">
                    {selectedConversation.feedback.improve.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>

              {/* 요약 */}
              <div className="flex justify-between text-center text-gray-600">
                <div>
                  <div className="font-bold text-purple-600">{selectedConversation.messageCount}</div>
                  <div className="text-xs">메시지</div>
                </div>
                <div>
                  <div className="font-bold text-purple-600">{selectedConversation.duration}</div>
                  <div className="text-xs flex items-center justify-center"><Clock className="w-3 h-3 mr-1" />대화시간</div>
                </div>
                <div>
                  <div className="font-bold text-purple-600">{selectedConversation.keywords.length}</div>
                  <div className="text-xs">키워드</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'growth' && (
          <div className="space-y-6">
            {/* 성장 그래프 */}
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

            {/* 감정 분포 파이차트 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">대화 감정 비율</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={emotionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {emotionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 배지 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">획득 배지</h2>
              <div className="grid grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <Badge key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">프로필 설정</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">닉네임</label>
                  <input
                    type="text"
                    defaultValue="대화마스터"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    disabled
                  />
                </div>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  저장하기
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">환경 설정</h2>
              <div className="space-y-3">
                {Object.entries(showSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-700">{key === 'notifications' ? '알림 받기' : key === 'soundAlerts' ? '소리 알림' : '데이터 분석'}</span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setShowSettings((prev) => ({ ...prev, [key]: !prev[key] }))}
                      className="w-5 h-5 text-purple-600 rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <LogOut className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <button className="text-red-500 font-semibold hover:underline">로그아웃</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyPage;
