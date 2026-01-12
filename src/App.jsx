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
      if (token) {
        try {
          const response = await axiosInstance.get('/api/auth/status');
          dispatch(loginSuccess(response.data));
        } catch (err) {
          console.log("세션 만료 또는 유효하지 않은 토큰");
          localStorage.removeItem('accessToken');
        }
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