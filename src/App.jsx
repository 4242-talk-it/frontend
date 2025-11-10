import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import SaisaiHome from "./component/SaisaiHome";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Chattingpage from "./component/chattingPage";
import CommunityCreate from "./pages/community/CommunityCreate";
import CommunityDetail from "./pages/community/CommunityDetail";
import CommunityPage from "./pages/community/CommunityPage";
import AIChattingPage from "./component/AIChattingPage";
import MyPage from "./component/MyPage";
import Header from "./component/Header";

const App = () => {
  return (
    <main>
      <Header />
      <Routes>
          <Route path="/" element={<SaisaiHome />} />
          <Route path="/mypage" element={<MyPage/>} />
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
