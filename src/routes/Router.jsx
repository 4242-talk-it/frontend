import { createBrowserRouter, Outlet } from 'react-router-dom';
import LandingPage from "../component/LandingPage";
import SaisaiHome from "../component/SaisaiHome";
import Login from "../component/Login";
import Signup from "../component/Signup";
import ChattingPage from "../component/ChattingPage"; 
import CommunityListPage from "../component/community/CommunityListPage";
import CommunityCreate from "../component/community/CommunityCreate";
import CommunityDetail from "../component/community/CommunityDetail";
import CommunityEdit from "../component/community/CommunityEdit"; 
import MyPage from "../component/mypage/MyPage";
import AIChattingPage from "../component/AIChattingPage";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Header from "../component/Header"; 

// 공통 레이아웃 (헤더가 필요한 페이지용)
const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    // 🚩 1. 헤더가 공통으로 들어가야 하는 '인증 전용' 페이지들
    path: '/',
    element: <Layout />, 
    children: [
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
      {
        path: 'community',
        children: [
          {
            index: true,
            element: (
              <AuthenticatedRoute>
                <CommunityListPage />
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
            path: 'detail/:id',
            element: (
              <AuthenticatedRoute>
                <CommunityDetail />
              </AuthenticatedRoute>
            ),
          },
          {
            path: 'edit/:id', 
            element: (
              <AuthenticatedRoute>
                <CommunityEdit />
              </AuthenticatedRoute>
            ),
          },
        ],
      },
    ],
  },
  // 🚩 2. 헤더가 이미 포함되어 있거나 레이아웃이 필요 없는 페이지들 (Layout 밖으로 이동)
  {
    path: '/',
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
    path: 'unauthenticated', // 🚩 미인증 안내 시 랜딩페이지를 보여줄 경우
    element: <LandingPage />,
  },
  {
    path: '*',
    element: <LandingPage />,
  },
]);

export default router;