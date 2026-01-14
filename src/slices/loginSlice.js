import { createSlice } from '@reduxjs/toolkit';

const getInitialUserInfo = () => {
  const savedInfo = localStorage.getItem('userInfo');
  if (!savedInfo || savedInfo === "undefined") return null;
  try {
    return JSON.parse(savedInfo);
  } catch (e) {
    return null;
  }
};

const initialState = {
  isLoggedIn: !!localStorage.getItem('accessToken'),
  userInfo: getInitialUserInfo(),
  isLoading: true, // 🚩 핵심: 초기값을 true로 설정합니다.
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      state.isLoading = false; // 🚩 로딩 완료
      if (action.payload) {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.isLoading = false; // 🚩 로딩 완료
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
    },
    setLoading: (state, action) => { // 🚩 수동 로딩 제어용
      state.isLoading = action.payload;
    },
  },
});

export const { loginSuccess, logout, setLoading } = loginSlice.actions;
export default loginSlice.reducer;