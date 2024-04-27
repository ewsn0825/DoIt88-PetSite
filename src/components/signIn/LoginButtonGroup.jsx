import kakao from '@/assets/icon/kakao.svg';
import google from '@/assets/icon/google.svg';
import useAuthStore from '@/store/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import uselogin from '@/store/login';
import pb from '@/api/pocketbase';
import { getPbImageURL } from '@/utils';
import useImageURL from '@/store/imageURL';

function LoginButtonGroup() {
  const navigate = useNavigate();

  const signInGoogle = useAuthStore((state) => state.signInGoogle);
  const signInKakao = useAuthStore((state) => state.kakaoLogin);
  const setURL = useImageURL((state) => state.setProfileURL);
  const {
    loginEmail,
    loginPassword,
    isLoginEmailValid,
    isLoginPasswordValid,
    // profileURL,
    setIsGoogle,
    setIsKakao,
    setLoginEmail,
    setLoginPassword,
    setIsLoginEmailValid,
    setIsLoginPasswordValid,
    // setProfileURL,
  } = uselogin();

  const signInHome = useAuthStore((state) => state.signIn);
  // const isAuth = useAuthStore((state) => state.isAuth);
  // const user = useAuthStore((state) => state.user);
  // const {}

  const handleLoginReset = () => {
    setLoginEmail('');
    setLoginPassword('');
    setIsLoginEmailValid(false);
    setIsLoginPasswordValid(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // PocketBase SDK 인증 요청
    try {
      if (isLoginEmailValid !== true || isLoginPasswordValid !== true) {
        toast.error('아이디 또는 비밀번호를 형식에 맞게 입력해주세요');
        return;
      }

      const authData = await signInHome(loginEmail, loginPassword);
    

      if (authData) {
        toast.success(`${authData.record.nickname}님 환영합니다.`, {
          icon: '😄',
          duration: 2000,
        });

        const record = await pb.collection('users').getOne(authData.record.id);
        const url = getPbImageURL(record, 'profile');
        setURL(url);
      
        handleLoginReset();

        navigate('/');
      }
    } catch (error) {
      // handleLoginReset();
      toast.error('아이디 또는 비밀번호가 일치하지 않습니다.');
      console.log('오류', error.response);
      // throw new Error(error.message);
    }
  };

  const handleLoginGoogle = async (e) => {
    e.preventDefault();

    // PocketBase SDK 인증 요청
    try {
      const authData = await signInGoogle();

      setIsGoogle(true);
      if (authData.meta) {
        const record = await pb.collection('users').getOne(authData.record.id);
        const url = getPbImageURL(record, 'profile');
        setURL(url);
        toast.success(`${authData.record.nickname}님 환영합니다.`, {
          icon: '😄',
          duration: 2000,
        });
        navigate('/');
      }
    } catch (error) {
      toast.error('로그인 실패하였습니다.');

      console.log('오류', error.response);
      throw new Error(error.message);
    }
  };

  const kakaoLogin = async (e) => {
    e.preventDefault();

    // PocketBase SDK 인증 요청
    try {
      const authData = await signInKakao();
      setIsKakao(true);

      if (authData.meta) {
        const record = await pb.collection('users').getOne(authData.record.id);
        const url = getPbImageURL(record, 'profile');
        setURL(url);
        toast.success(`${authData.record.nickname}님 환영합니다.`, {
          icon: '😄',
          duration: 2000,
        });
        navigate('/');
      }
    } catch (error) {
      toast.error('로그인 실패하였습니다.');

      console.log('오류', error.response);
      throw new Error(error.message);
    }
  };

  return (
    <div className="buttonGroup flex-col justify-center">
      <button
        type="submit"
        className="w-[340px] h-[50px] bg-primary text-white text-center font-medium rounded-xl text-lg  my-2"
        onClick={handleLogin}
      >
        로그인
      </button>
      <button
        type="button"
        className="w-[340px] h-[50px] bg-[#FFDC60] text-black text-center font-medium rounded-xl text-lg  my-2 relative"
        onClick={kakaoLogin}
      >
        <img
          src={kakao}
          alt="카카오톡 로고"
          className="absolute top-3 left-5"
        />
        카카오로 로그인
      </button>
      <button
        type="button"
        className="w-[340px] h-[50px] bg-white text-black text-center font-medium rounded-xl text-lg  my-2 border border-[#C4C4C4] relative"
        onClick={handleLoginGoogle}
      >
        <img src={google} alt="구글 로고" className="absolute top-3 left-5" />
        구글로 로그인
      </button>
    </div>
  );
}

export default LoginButtonGroup;
