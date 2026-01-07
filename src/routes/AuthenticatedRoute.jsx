import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ children }) => {
  // 예시: 로컬 스토리지에 토큰이 있는지 확인
  const token = localStorage.getItem('accessToken');
  const isLoggedIn = !!token; // 토큰이 있으면 true

  if (!isLoggedIn) {
    alert("로그인이 필요한 페이지입니다.");
    return <Navigate to="/api/users/login" replace />; // /unauthenticated 대신 /login으로 보냄
  }

  return children;
};

export default AuthenticatedRoute;