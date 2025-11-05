import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import SaisaiHome from "./component/SaisaiHome";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Chattingpage from "./component/chattingPage";
import CommunityCreate from "./pages/community/CommunityCreate";
import CommunityDetail from "./pages/community/CommunityDetail";
import CommunityPage from "./component/CommunityPage";
import AIChattingPage from "./component/AIChattingPage";
import MyPage from "./component/MyPage";
//import { Header } from "./component/common/Community";
import Header from "./component/Header";

const App = () => {
  return (
    <main>
      {/* <LandingPage /> */}
      <Header />
      <Routes>
        <Route path="/" element={<CommunityDetail />} />
        </Routes>
    </main>
  );
};

export default App;
