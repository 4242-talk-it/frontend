import React, { useState, useEffect } from "react";

const Header = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [currentPath, setCurrentPath] = useState("/community");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      // 🔹 스냅 구간 설정 (깜빡임 방지)
      setIsCompact((prev) => {
        if (!prev && y > 120) return true;
        if (prev && y < 80) return false;
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userName = "김철수";
  const firstLetter = userName.charAt(0);
  const isActive = (p) => currentPath === p;
  const handleNavClick = (p) => setCurrentPath(p);
  const handleLogout = () => alert("로그아웃 되었습니다.");

  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className={`sticky top-0 z-10 bg-white overflow-hidden transition-all duration-500 ease-in-out ${
          isCompact
            ? "h-16 shadow-md border-b border-gray-200"
            : "h-24 border-b-2 border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex items-center justify-between">
          {/* ✅ 로고 (고정 위치) */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-6 h-6 bg-green-400 rounded-full"></div>
              <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
            </div>
            <button
              onClick={() => handleNavClick("/")}
              className="text-xl font-bold text-gray-800"
            >
              사이사이
            </button>
          </div>

          {/* ✅ 중앙 네비게이션 */}
          <nav
            className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2"
            style={{
              top: isCompact ? "50%" : "75%",
              transform: "translate(-50%, -50%)",
              opacity: 1,
              transition: "top 0.4s ease-in-out",
            }}
          >
            {[
              { path: "/chat", label: "말잇기" },
              { path: "/aichat", label: "AI연습" },
              { path: "/community", label: "커뮤니티" },
            ].map((nav) => (
              <button
                key={nav.path}
                onClick={() => handleNavClick(nav.path)}
                className={`transition-colors duration-200 ${
                  isActive(nav.path)
                    ? "text-green-500 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {nav.label}
              </button>
            ))}
          </nav>

          {/* ✅ 프로필 (고정 위치) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick("/profile")}
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

      {/* 스크롤 테스트용 */}
      <div style={{ height: "200vh" }}></div>
    </div>
  );
};

export default Header;
