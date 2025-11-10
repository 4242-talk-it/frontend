import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isCompact, setIsCompact] = useState(false);
  const location = useLocation();
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

  const userName = "김철수";
  const firstLetter = userName.charAt(0);
  const isActive = (p) => currentPath === p;
  
  const handleNavClick = (p) => navigate(p);

  const handleLogout = () => alert("로그아웃 되었습니다.");

  return (
    <header
      className={`sticky top-0 z-[9999] bg-white overflow-hidden transition-all duration-500 ease-in-out ${
        isCompact
          ? "h-16 shadow-md border-b border-gray-200"
          : "h-24 border-b-2 border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex items-center justify-between">
        {/* ✅ 로고 */}
        <button
            onClick={() => handleNavClick("/")}
            className="text-xl font-bold text-gray-800"
          >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-6 h-6 bg-green-400 rounded-full"></div>
            <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
          </div>
          
            사이사이
          
        </div>
        </button>

        {/* ✅ 네비게이션 */}
        <nav
          className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2"
          style={{
            top: isCompact ? "50%" : "75%",
            transform: "translate(-50%, -50%)",
            transition: "top 0.4s ease-in-out",
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
                isActive(nav.path)
                  ? "text-green-500 font-semibold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>

        {/* ✅ 프로필 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("/mypage")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
              {firstLetter}
            </div>
            <span className="text-gray-800 font-medium">{userName}님</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;