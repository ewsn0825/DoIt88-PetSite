import SearchForm from '@/components/signUp/SearchForm';
import HeaderNav from './HeaderNav';
// import Logo from '@/components/header/Logo';
import useAuthStore from '@/store/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { kakaoLogout } from '@/utils/kakaoLogout';
import uselogin from '@/store/login';
// import pb from '@/api/pocketbase';
import useImageURL from '@/store/imageURL';

function Header() {
  const navigate = useNavigate();
  // const isAuth = useAuthStore((state) => state.isAuth);
  // const token = useAuthStore((state) => state.token);
  // const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const signOutGoogle = useAuthStore((state) => state.signOutGoogle);
  const { isKakao, setIsKakao, isGoogle, setIsGoogle } = uselogin();

  // const setURL =useImageURL((state)=>state.setProfileURL)
  const url = useImageURL((state) => state.profileURL);
  // const setURL = useImageURL((state) => state.setProfileURL);
  const clearURL = useImageURL((state) => state.clearProfileURL);

  // const url=

  const authDataString = localStorage.getItem('pocketbase_auth');
  const authData = JSON.parse(authDataString);

  const handleGoToLogin = (e) => {
    e.preventDefault();
    navigate('/signIn');
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    // PocketBase SDK 인증 요청
    try {
      clearURL();
      signOut();
      // kakaoLogout();

      toast.success(`이용해주셔서 감사합니다`, {
        icon: '🙇🏻‍♂️',
        duration: 2000,
      });

      navigate('/');
    } catch (error) {
      toast.error('로그아웃 실패');

      console.log('오류', error.response);
    }
  };

  const handleGoogleLogout = async (e) => {
    e.preventDefault();

    // PocketBase SDK 인증 요청
    try {
      clearURL();
      setIsGoogle(false);
      signOutGoogle();
      // signOut();
      toast.success(`이용해주셔서 감사합니다`, {
        icon: '🙇🏻‍♂️',
        duration: 2000,
      });

      navigate('/');
    } catch (error) {
      toast.error('로그아웃 실패');

      console.log('오류', error.response);
    }
  };

  const handleKakaoLogout = async (e) => {
    e.preventDefault();

    // PocketBase SDK 인증 요청
    try {
      clearURL();
      setIsKakao(false);
      signOut();

      await kakaoLogout();

   

      // kakaoLogout();
      navigate('/');
      toast.success(`이용해주셔서 감사합니다`, {
        icon: '🙇🏻‍♂️',
        duration: 2000,
      });
    } catch (error) {
      // toast.error('로그아웃 실패');
      console.log('오류', error.response);
    }
  };
  // max-w-[1200px]
  return (
    <div className="flex flex-row  flex-nowrap py-10 items-center mx-auto justify-between font-pre max-w-[1200px] ">
      {/* <Logo className="flex-shrink-0" /> */}
      <HeaderNav className="flex-shrink-0" />

      <div className="flex flex-row gap-7 flex-shrink-0 flex-grow-0">
        <SearchForm className="flex-shrink-0" />
        {authData ? (
          <div className="flex items-center flex-nowrap">
            {url ? (
              <>
                <img src={url} alt="" className="w-7 h-7 rounded-full mr-2" />
                <span className="font-medium text-xl underline underline-offset-8 flex-nowrap flex-shrink-0">{`${authData.model.nickname}님`}</span>
                <button
                  type="button"
                  className="rounded-xl bg-primary text-white font-medium text-base px-11 py-3 flex-nowrap flex-shrink-0 ml-8"
                  onClick={
                    isKakao
                      ? handleKakaoLogout
                      : isGoogle
                      ? handleGoogleLogout
                      : handleSignOut
                  }
                >
                  로그아웃
                </button>
              </>
            ) : (
              ''
            )}
          </div>
        ) : (
          <button
            type="button"
            className="rounded-xl bg-primary text-white font-medium text-base px-11 py-3 flex-shrink-0"
            onClick={handleGoToLogin}
          >
            로그인
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
