import React, { useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

// ===== Global Styles =====
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
    background-color: #f9fafb;
    color: #222;
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    margin: 0;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }
`;

// ===== Reusable Styles =====
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Section = styled.section`
  padding: 100px 0;
  text-align: center;
`;

const Button = styled.button`
  background-color: ${({ primary }) => (primary ? "#4F46E5" : "#fff")};
  color: ${({ primary }) => (primary ? "#fff" : "#4F46E5")};
  border: 2px solid #4F46E5;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  margin: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ primary }) => (primary ? "#4338CA" : "#EEF2FF")};
  }
`;

// ===== Header =====
const Header = styled.header`
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: #4F46E5;
`;

// ===== Hero Section =====
const Hero = styled(Section)`
  background: linear-gradient(180deg, #EEF2FF 0%, #fff 100%);
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  line-height: 1.4;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  color: #555;
  margin-bottom: 40px;
`;

const HeroIllustration = styled.div`
  font-size: 60px;
  margin-top: 30px;
`;

// ===== Feature Section =====
const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 40px;
`;

const FeatureCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  animation: ${fadeInUp} 0.6s ease both;
`;

const FeatureIcon = styled.div`
  font-size: 36px;
  margin-bottom: 12px;
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 8px;
  color: #111;
`;

const FeatureDesc = styled.p`
  font-size: 15px;
  color: #555;
`;

// ===== Testimonials =====
const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 40px;
`;

const TestimonialCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  animation: ${fadeInUp} 0.7s ease both;
`;

const Quote = styled.p`
  font-style: italic;
  color: #333;
  margin-bottom: 10px;
`;

// ===== Footer =====
const Footer = styled.footer`
  background: #111827;
  color: #fff;
  padding: 60px 0;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 40px;
`;

const FooterTitle = styled.h4`
  margin-bottom: 12px;
  color: #E0E7FF;
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 40px;
  font-size: 14px;
  color: #9CA3AF;
`;

// ===== Sticky CTA =====
const StickyCta = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #4F46E5;
  color: white;
  padding: 16px 0;
  transform: translateY(100%);
  transition: transform 0.4s ease;
  z-index: 99;

  &.visible {
    transform: translateY(0);
  }
`;

const StickyContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StickyText = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

// ===== App Component =====
export default function App() {
  useEffect(() => {
    const sticky = document.getElementById("sticky");
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        sticky.classList.add("visible");
      } else {
        sticky.classList.remove("visible");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { icon: "💬", title: "10턴 익명 채팅", desc: "부담 없는 짧은 대화로 말문을 틔워보세요." },
    { icon: "🎯", title: "미션 & 키워드", desc: "매일 새로운 미션과 키워드로 연습해요." },
    { icon: "💝", title: "감정 태그 교환", desc: "대화 후 감정을 나누며 공감해요." },
    { icon: "🤖", title: "AI 피드백", desc: "AI가 맞춤 피드백으로 실력을 키워줘요." },
  ];

  const testimonials = [
    ["짧아서 부담 없고, 피드백이 진짜 도움 됐어요.", "익명 사용자 A"],
    ["익명이라서 더 솔직하게 대화할 수 있어요.", "익명 사용자 B"],
    ["10턴 제한이 오히려 좋더라구요.", "익명 사용자 C"],
  ];

  return (
    <>
      <GlobalStyle />
      <Header>
        <Container>
          <HeaderContent>
            <Logo>말잇기</Logo>
            <div>
              <Button>로그인</Button>
              <Button primary>회원가입</Button>
            </div>
          </HeaderContent>
        </Container>
      </Header>

      <Hero>
        <Container>
          <HeroTitle>
            짧은 대화로 성장하는 <br /> 당신의 말하기 습관
          </HeroTitle>
          <HeroSubtitle>10턴의 짧은 익명 대화, 매일 가벼운 말문 트기</HeroSubtitle>
          <Button primary>Talk It Now! 🗣️</Button>
          <Button>말잇기 시작</Button>
          <HeroIllustration>💬✨</HeroIllustration>
        </Container>
      </Hero>

      <Section>
        <Container>
          <h2>말잇기와 함께 성장해요</h2>
          <FeatureGrid>
            {features.map((f, i) => (
              <FeatureCard key={i}>
                <FeatureIcon>{f.icon}</FeatureIcon>
                <FeatureTitle>{f.title}</FeatureTitle>
                <FeatureDesc>{f.desc}</FeatureDesc>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2>사용자 후기</h2>
          <TestimonialGrid>
            {testimonials.map(([text, author], i) => (
              <TestimonialCard key={i}>
                <Quote>“{text}”</Quote>
                <p>— {author}</p>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </Container>
      </Section>

      <Footer>
        <Container>
          <FooterGrid>
            <div>
              <FooterTitle>말잇기</FooterTitle>
              <p>짧은 대화로 성장하는 말하기 습관 훈련장</p>
            </div>
            <div>
              <FooterTitle>서비스</FooterTitle>
              <ul>
                <li>기능 소개</li>
                <li>요금제</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <FooterTitle>회사</FooterTitle>
              <ul>
                <li>소개</li>
                <li>문의</li>
                <li>블로그</li>
              </ul>
            </div>
          </FooterGrid>
          <FooterBottom>© 2025 말잇기. All rights reserved.</FooterBottom>
        </Container>
      </Footer>

      <StickyCta id="sticky">
        <Container>
          <StickyContent>
            <StickyText>말잇기 시작해보세요 · 2분만 투자하면 말하기가 편해져요</StickyText>
            <Button>지금 시작</Button>
          </StickyContent>
        </Container>
      </StickyCta>
    </>
  );
}
