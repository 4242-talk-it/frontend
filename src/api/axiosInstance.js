import axios from 'axios';

let isRefreshing = false;
let refreshSubscribers = [];

// 리덕스 스토어 주입을 위한 변수
let store;
export const injectStore = (_store) => {
  store = _store;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HOST,
  withCredentials: true, // 쿠키 공유를 위해 필수
});

// 토큰 갱신 후 대기 중이던 요청들 재실행
const onRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

// [요청 인터셉터]
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); 
    if (token && !config.url.includes('/api/auth/reissue')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// [응답 인터셉터]
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error("네트워크 에러 또는 서버가 응답하지 않습니다.");
      return Promise.reject(error);
    }

    const { status } = error.response;

    // 401 Unauthorized 에러 발생 시
    if (status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        // 이미 재발급 중이면 대기열에 추가
        return new Promise((resolve) => {
          refreshSubscribers.push(() => resolve(axiosInstance(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 백엔드에 토큰 재발급 요청
        await axiosInstance.post('/api/auth/reissue'); 
        
        isRefreshing = false;
        onRefreshed(); // 대기열 요청들 처리
        
        return axiosInstance(originalRequest); // 현재 요청 재시도
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = []; // 실패 시 대기열 비움

        console.error("세션이 만료되었습니다. 다시 로그인해주세요.");

        if (store) {
          // 순환 참조 방지를 위해 다이나믹 import 사용 가능성 고려
          const { logout } = await import('../slices/loginSlice'); 
          store.dispatch(logout());
        }

        // 로그인 페이지로 이동
        window.location.href = '/login?expired=true'; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;