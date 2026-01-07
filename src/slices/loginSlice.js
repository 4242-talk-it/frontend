// src/slices/loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getInitialUserInfo = () => {
  const savedInfo = localStorage.getItem('userInfo');
  // 값이 없거나, 문자열 "undefined"인 경우를 모두 체크
  if (!savedInfo || savedInfo === "undefined") {
    return null;
  }
  try {
    return JSON.parse(savedInfo);
  } catch (e) {
    console.error("userInfo parse error", e);
    return null;
  }
};

const initialState = {
  isLoggedIn: !!localStorage.getItem('accessToken'),
  userInfo: getInitialUserInfo(),
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      // 저장할 때 데이터가 유효한지 확인
      if (action.payload) {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
    },
  },
});

export const { loginSuccess, logout } = loginSlice.actions;
export default loginSlice.reducer;