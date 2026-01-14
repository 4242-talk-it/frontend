import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthenticatedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.login);
  const location = useLocation();

  if (isLoading) {
    return <div>로딩 중...</div>; 
  }

  if (!isLoggedIn) {
    // 주의: alert는 렌더링을 방해할 수 있으니 흐름 확인 후 필요없으면 제거하세요!
    alert("로그인이 필요한 페이지입니다."); 
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthenticatedRoute;