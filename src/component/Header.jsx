import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/loginSlice";
import axiosInstance from "../api/axiosInstance";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { isLoggedIn, userInfo } = useSelector((state) => state.login);
  const [isCompact, setIsCompact] = useState(false);
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsCompact((prev) => {
        if (!prev && y > 50) return true;
        if (prev && y < 30) return false;
        return prev;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userName = userInfo?.nickname || "사용자";
  const firstLetter = userName.charAt(0);
  
  const isActive = (p) => currentPath === p;
  const handleNavClick = (p) => navigate(p);

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        await axiosInstance.post('/api/users/logout');
      } catch (error) {
        console.error("서버 로그아웃 오류:", error);
      } finally {
        dispatch(logout());
        alert("로그아웃 되었습니다.");
        navigate("/");
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-[9999] bg-white overflow-hidden transition-all duration-500 ease-in-out ${
        isCompact ? "h-16 shadow-md border-b border-gray-200" : "h-24 border-b-2 border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex items-center justify-between">
        <button onClick={() => handleNavClick("/")} className="text-xl font-bold text-gray-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
            </div>
            사이사이
          </div>
        </button>

        <nav
          className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2"
          style={{
            top: "50%",
            transform: "translate(-50%, -50%)",
            transition: "all 0.4s ease-in-out",
          }}
        >
          {[
            { path: "/chatting", label: "말잇기" },
            { path: "/aichat", label: "AI연습" },
            { path: "/community", label: "커뮤니티" },
          ].map((nav) => (
            <button
              key={nav.path}
              onClick={() => handleNavClick(nav.path)}
              className={`text-lg transition-colors duration-200 ${
                isActive(nav.path) ? "text-purple-600 font-semibold" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => handleNavClick("/mypage")}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                  {firstLetter}
                </div>
                <span className="text-gray-800 font-medium hidden sm:inline">{userName}님</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-red-500 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavClick("/login")}
                className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                로그인
              </button>
              <button
                onClick={() => handleNavClick("/signup")}
                className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:opacity-90 transition-all shadow-md"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;