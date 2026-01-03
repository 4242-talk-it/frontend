import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 추가
import { useDispatch } from 'react-redux';      // 2. useDispatch 추가
import { loginSuccess } from '../slices/loginSlice'; // 3. 액션 임포트
import axiosInstance from '../api/axiosInstance';   // 4. axios 인스턴스

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      // 1. 로그인 요청
      const response = await axiosInstance.post('/api/users/login', formData);
      console.log("서버 응답 데이터:", response.data);

      // 2. 데이터 구조 분해 할당 (응답 바디에는 user만 있음)
      const { user } = response.data;
      
      // 3. 만약 백엔드가 헤더에 토큰을 실어 보냈다면 localStorage에 백업 (선택사항)
      // 쿠키(httpOnly)를 사용한다면 이 과정이 없어도 axiosInstance가 쿠키를 자동으로 보냅니다.
      const authHeader = response.headers['authorization'];
      if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          localStorage.setItem('accessToken', token);
      }

      // 4. 성공 판별 (바디에 user 정보가 왔다면 성공!)
      if (user) {
        // 리덕스 상태 업데이트 (유저 정보 저장)
        dispatch(loginSuccess(user));
        
        alert('로그인에 성공했습니다!');
        
        // 홈 화면으로 이동
        navigate('/home'); 
      }
    } catch (error) {
      console.error("전체 에러 객체:", error);
      
      if (error.response) {
          // 서버가 에러 코드를 반환한 경우 (401, 400 등)
          alert(error.response.data?.message || "이메일 또는 비밀번호를 확인해주세요.");
      } else {
          // 네트워크 에러 (서버가 꺼져있거나 포트가 안 맞을 때)
          alert("서버와 통신할 수 없습니다. 백엔드 포트(8080)와 실행 상태를 확인하세요.");
      }
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} 로그인 연동 준비중입니다!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            사이사이
          </h1>
          <p className="text-gray-600">말잇는 사이트에 오신 것을 환영합니다</p>
        </div>

        <div className="space-y-6">
          {/* 이메일 입력 */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력하세요"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력하세요"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
          >
            로그인
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">또는</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* 소셜 로그인 */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialLogin('카카오')}
            className="w-full bg-yellow-400 text-black py-3 rounded-xl font-medium hover:bg-yellow-500 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <div className="w-5 h-5 bg-black rounded-full"></div>
            <span>카카오로 로그인하기</span>
          </button>
          <button
            onClick={() => handleSocialLogin('구글')}
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></div>
            <span>구글로 로그인하기</span>
          </button>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-600">아직 계정이 없으신가요? </span>
          <button
            onClick={() => navigate('/signup')} // 5. useNavigate로 경로 이동
            className="text-purple-600 font-medium hover:text-purple-700 transition-colors duration-200"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;