import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const AuthenticatedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.login);
  const location = useLocation();

  useEffect(() => {
    // 현재 주소가 루트('/')가 아닐 때만 로그인이 필요하다는 알림을 띄웁니다.
    if (!isLoading && !isLoggedIn && location.pathname !== "/") {
      alert("로그인이 필요한 페이지입니다.");
    }
  }, [isLoading, isLoggedIn, location.pathname]);

  if (isLoading) return <div>로딩 중...</div>;

  if (!isLoggedIn) {
    // 🚩 핵심: 현재 주소가 루트('/')라면 리다이렉트하지 않고 null을 반환하여 멈춥니다.
    if (location.pathname === "/") return null;
    
    // 그 외의 보호된 페이지(home, mypage 등)라면 로그인으로 보냅니다.
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthenticatedRoute;