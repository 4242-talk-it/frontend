import React from 'react';
import LandingPage from './component/LandingPage';
import SaisaiHome from './component/SaisaiHome';
import Login from './component/Login';
import Signup from './component/Signup';
import Chattingpage from './component/chattingPage';
import CommunityCreate from './pages/community/CommunityCreate';
import CommunityDetail from './pages/community/CommunityDetail';
import CommunityPage from './component/CommunityPage';
import AIChattingPage from './component/AIChattingPage';


const App = () => {
  return (
    <main>
      {/* <LandingPage /> */}
      <CommunityCreate/>
    </main>
  );
};

export default App;
