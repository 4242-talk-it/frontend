import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Outlet } from 'react-router-dom';
import Header from "./component/Header";
import axiosInstance from "./api/axiosInstance";
import { loginSuccess, logout, setLoading } from "./slices/loginSlice"; // setLoading 추가

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        try {
          const response = await axiosInstance.get('/api/auth/status');
          // 백엔드 응답 구조에 맞춰 데이터 주입
          dispatch(loginSuccess(response.data.data?.user || response.data));
        } catch (err) {
          console.log("세션 만료 또는 유효하지 않은 토큰");
          dispatch(logout()); // 여기서 로딩 종료 처리도 함께 됨
        }
      } else {
        // 토큰이 아예 없는 경우 검사 종료 알림
        dispatch(setLoading(false));
      }
    };
    
    checkAuth();
  }, [dispatch]);

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