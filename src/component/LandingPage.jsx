import React from "react";
import { useNavigate } from "react-router-dom";

// 메인 컬러 시스템
const COLORS = {
  primary: "#A5F278",   // 연두색
  secondary: "#7AADFE", // 푸른색
};

export default function App() {
  const navigate = useNavigate();

  const features = [
    { icon: "💬", title: "10턴 익명 채팅", desc: "부담 없는 짧은 대화로 말문을 틔워보세요." },
    { icon: "🎯", title: "미션 & 키워드", desc: "매일 새로운 미션과 키워드로 연습해요." },
    { icon: "💝", title: "감정 태그 교환", desc: "대화 후 감정을 나누며 공감해요." },
    { icon: "🤖", title: "AI 피드백", desc: "AI가 맞춤 피드백으로 실력을 키워줘요." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEF6FF] to-white text-gray-900">

      {/* HEADER */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
            onClick={() => handleNavClick("/")}
            className="text-xl font-bold text-gray-800"
          >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-6 h-6 bg-primary rounded-full"></div>
            <div className="w-6 h-6 bg-secondary rounded-full"></div>
          </div>
            말잇기
        </div>
        </button>

          <div className="flex gap-3">
            <button onClick={() => navigate("/login")} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
              로그인
            </button>

            <button onClick={() => navigate("/signup")} className="px-4 py-2 rounded-lg bg-primary text-black shadow hover:bg-green-400 transition">
              회원가입
            </button>
          </div>
        </div>
      </header>
      
      {/* HERO SECTION */}
      <section className="text-center pt-32 pb-24">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-snug mb-6">
          짧은 대화로 성장하는 <br /> 당신의 말하기 습관
        </h1>

        <p className="text-gray-600 mb-10">
          10턴의 짧은 익명 대화, 매일 가벼운 말문 트기
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-3 rounded-xl text-black font-semibold shadow"
            style={{ backgroundColor: COLORS.primary }}
          >
            Talk It Now! 🗣️
          </button>

          <button
            className="px-6 py-3 rounded-xl border"
            style={{ color: COLORS.secondary, borderColor: COLORS.secondary }}
          >
            말잇기 시작
          </button>
        </div>

        <div className="text-6xl mt-10">💬✨</div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <h2 className="text-center text-3xl font-bold mb-12">말잇기와 함께 성장해요</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition border"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-200 py-16 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h4 className="text-green-200 font-semibold mb-3">말잇기</h4>
            <p className="text-gray-400">짧은 대화로 성장하는 말하기 습관 훈련장</p>
          </div>

          <div>
            <h4 className="text-green-200 font-semibold mb-3">서비스</h4>
            <ul className="space-y-2 text-gray-400">
              <li>기능 소개</li>
              <li>요금제</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="text-green-200 font-semibold mb-3">회사</h4>
            <ul className="space-y-2 text-gray-400">
              <li>소개</li>
              <li>문의</li>
              <li>블로그</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-10">
          © 2025 말잇기. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
