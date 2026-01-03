import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; // App 컴포넌트 임포트 확인!
import LandingPage from "../component/LandingPage";
import SaisaiHome from "../component/SaisaiHome";
import Login from "../component/Login";
import Signup from "../component/Signup";
import ChattingPage from "../component/ChattingPage"; 
import CommunityPage from "../pages/community/CommunityPage";
import CommunityCreate from "../pages/community/CommunityCreate";
import CommunityDetail from "../pages/community/CommunityDetail";
import MyPage from "../component/MyPage";
import AIChattingPage from "../component/AIChattingPage";
import AuthenticatedRoute from "./AuthenticatedRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'home',
        element: (
          <AuthenticatedRoute>
            <SaisaiHome />
          </AuthenticatedRoute>
        ),
      },
      {
        path: 'mypage',
        element: (
          <AuthenticatedRoute>
            <MyPage />
          </AuthenticatedRoute>
        ),
      },
      {
        path: 'chatting',
        element: (
          <AuthenticatedRoute>
            <ChattingPage />
          </AuthenticatedRoute>
        ),
      },
      {
        path: 'aichat',
        element: (
          <AuthenticatedRoute>
            <AIChattingPage />
          </AuthenticatedRoute>
        ),
      },
      // 커뮤니티 그룹화
      {
        path: 'community',
        children: [
          {
            index: true,
            element: (
              <AuthenticatedRoute>
                <CommunityPage />
              </AuthenticatedRoute>
            ),
          },
          {
            path: 'create',
            element: (
              <AuthenticatedRoute>
                <CommunityCreate />
              </AuthenticatedRoute>
            ),
          },
          {
            path: 'detail',
            element: (
              <AuthenticatedRoute>
                <CommunityDetail />
              </AuthenticatedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <LandingPage />, // 정의되지 않은 경로는 랜딩페이지로
  },
]);

export default router;