// 공통 색상 시스템
export const colors = {
  primary: '#A5F278',
  secondary: '#7AADFE',
  gradient: 'linear-gradient(135deg, #A5F278, #7AADFE)',
  background: 'rgba(165, 242, 120, 0.08)',
  white: '#FFFFFF',
  text: {
    primary: '#333',
    secondary: '#666',
    tertiary: '#888',
  },
  border: {
    light: '#E5E5E5',
    lighter: '#F0F0F0',
  },
  error: '#FF6B6B',
};

// 그림자 스타일
export const shadows = {
  small: '0 2px 12px rgba(0,0,0,0.08)',
  medium: '0 4px 15px rgba(165, 242, 120, 0.3)',
  large: '0 8px 32px rgba(0,0,0,0.1)',
};

// 테두리 반경
export const borderRadius = {
  small: '8px',
  medium: '12px',
  large: '16px',
  xlarge: '20px',
  round: '50%',
};

// 공통 스타일 객체
export const commonStyles = {
  page: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", sans-serif',
    background: colors.background,
    minHeight: '100vh',
    lineHeight: 1.6,
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px',
  },
  wideContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  card: {
    background: colors.white,
    borderRadius: borderRadius.xlarge,
    padding: '40px',
    boxShadow: shadows.large,
  },
  input: {
    width: '100%',
    padding: '16px 20px',
    border: `2px solid ${colors.border.light}`,
    borderRadius: borderRadius.medium,
    fontSize: '14px',
    transition: 'all 0.3s',
    outline: 'none',
    fontFamily: 'inherit',
  },
  button: {
    primary: {
      background: colors.primary,
      color: colors.white,
      border: 'none',
      padding: '16px 32px',
      borderRadius: borderRadius.medium,
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s',
      minWidth: '120px',
      boxShadow: shadows.medium,
    },
    secondary: {
      background: '#F7F7F7',
      color: colors.text.secondary,
      border: `2px solid ${colors.border.light}`,
      padding: '16px 32px',
      borderRadius: borderRadius.medium,
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s',
      minWidth: '120px',
    },
  },
};

// 카테고리 데이터
export const categories = [
  { id: 'chat-review', value: '대화후기', icon: '💬' },
  { id: 'emotion', value: '감정공유', icon: '🧡' },
  { id: 'question', value: '궁금해요', icon: '❓' },
  { id: 'celebration', value: '대단한일', icon: '🎉' },
  { id: 'daily', value: '일기장', icon: '📔' },
];