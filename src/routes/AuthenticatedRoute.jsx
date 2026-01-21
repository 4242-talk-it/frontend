import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ children }) => {
  // 🚩 수정: 전체 객체를 새로 만들지 말고, 초기 상태를 구조 분해 할당으로 가져옵니다.
  const loginState = useSelector((state) => state.login); // store.js의 reducer 키 이름 확인 (login 또는 loginSlice)
  const { isLoggedIn, isInitialized } = loginState || { isLoggedIn: false, isInitialized: false };

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 font-medium">사용자 확인 중...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    // 🚩 로그인이 안 되어 있으면 미인증 안내 페이지로 리다이렉트
    return <Navigate to="/unauthenticated" replace />;
  }

  return children;
};

export default AuthenticatedRoute;