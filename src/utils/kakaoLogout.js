const { VITE_KAKAO_CLIENT_ID, VITE_KAKAO_LOGOUT_REDIRECT_URI } = import.meta.env;


export const kakaoLogout = async () => {
  try {
    location.replace(
      `https://kauth.kakao.com/oauth/logout?client_id=${VITE_KAKAO_CLIENT_ID}&logout_redirect_uri=${VITE_KAKAO_LOGOUT_REDIRECT_URI}`
    );
  } catch (error) {
    throw new Error(error.message);
  }
};
