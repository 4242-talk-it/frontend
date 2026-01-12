import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LandingPage from "../component/LandingPage";
import SaisaiHome from "../component/SaisaiHome";
import Login from "../component/Login";
import Signup from "../component/Signup";
import ChattingPage from "../component/ChattingPage"; 
import CommunityListPage from "../pages/community/CommunityListPage";
import CommunityCreate from "../pages/community/CommunityCreate";
import CommunityDetail from "../pages/community/CommunityDetail";
import CommunityEdit from "../pages/community/CommunityEdit"; 
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
  {
    path: '*',
    element: <LandingPage />,
  },
]);

export default router;