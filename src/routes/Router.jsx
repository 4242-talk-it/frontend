import { createBrowserRouter } from 'react-router-dom';

import LandingPage from "../component/LandingPage";
import SaisaiHome from "../component/SaisaiHome";
import Login from "../component/Login";
import Signup from "../component/Signup";
import ChattingPage from "../component/ChattingPage";
import CommunityCreate from "../pages/community/CommunityCreate";
import CommunityDetail from "../pages/community/CommunityDetail";
import CommunityPage from "../pages/community/CommunityPage";
import AIChattingPage from "../component/AIChattingPage";
import MyPage from "../component/MyPage";
import Header from "../component/Header";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage type="header" />,
  },
  {
    path: '/community',
    children: [
        {
            index: true,
            element: (
            <AuthenticatedRoute>
                <Refrigerator />
            </AuthenticatedRoute>
            ),
        },
        {
            path: '',
            element: (
            <AuthenticatedRoute>
                <Refrigerator />
            </AuthenticatedRoute>
            ),
        },
        {
            path: 'search',
            element: (
            <AuthenticatedRoute>
                <RefrigeratorSearch />
            </AuthenticatedRoute>
            ),
        },
    ],
  },
]);

export default router;