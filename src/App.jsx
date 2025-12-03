import React from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import SaisaiHome from "./component/SaisaiHome";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Chattingpage from "./component/ChattingPage";
import CommunityCreate from "./pages/community/CommunityCreate";
import CommunityDetail from "./pages/community/CommunityDetail";
import CommunityPage from "./pages/community/CommunityPage";
import AIChattingPage from "./component/AIChattingPage";
import MyPage from "./component/MyPage";
import Header from "./component/Header";

const App = () => {

  const location = useLocation();
  
  const hideHeaderPaths = ["/", "/login", "/signup"];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <main>
      {!shouldHideHeader && <Header />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<SaisaiHome />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/chatting" element={<Chattingpage />} />
        <Route path="/aichat" element={<AIChattingPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/create" element={<CommunityCreate />} />
        <Route path="/community/detail" element={<CommunityDetail />} />
      </Routes>
    </main>
  );
};

export default App;
