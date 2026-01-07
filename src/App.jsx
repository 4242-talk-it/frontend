import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Outlet } from 'react-router-dom';
import Header from "./component/Header";
import axiosInstance from "./api/axiosInstance";
import { loginSuccess } from "./slices/loginSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      // 쿠키 방식이라면 토큰이 없어도 status 체크를 시도할 수 있습니다.
      if (token) {
        try {
          const response = await axiosInstance.get('/api/users/me'); // 내 정보 가져오기 엔드포인트
          dispatch(loginSuccess(response.data.user));
        } catch (err) {
          console.log("세션 만료 또는 유효하지 않은 토큰");
          // 로그아웃 처리 등을 수행할 수 있습니다.
        }
      }
    };
    checkAuth();
  }, [dispatch]);

  // 헤더를 숨길 경로 설정
  const hideHeaderPaths = ["/", "/login", "/signup"];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <div className="app-container">
      {!shouldHideHeader && <Header />}
      <main className="content">
        <Outlet /> 
      </main>
    </div>
  );
}

export default App;