import LoginButtonGroup from '@/components/signIn/LoginButtonGroup';
import uselogin from '@/store/login';
import debounce from '@/utils/debounce';
import { Link } from 'react-router-dom';

function SignIn() {
  const {
    loginEmail,
    loginPassword,
    isLoginEmailValid,
    isLoginPasswordValid,
    setLoginEmail,
    setLoginPassword,
    setIsLoginEmailValid,
    setIsLoginPasswordValid,
  } = uselogin();

  const handleEmailInput = (e) => {
    const value = e.target.value;
    setLoginEmail(value);

    // 유효성 검사 로직
    const atIndex = value.indexOf('@');
    if (
      atIndex >= 5 &&
      atIndex <= 20 &&
      /^[a-z0-9_.-]+@[a-z0-9.._.-]+\.[a-z]{2,}$/.test(value)
    ) {
      setIsLoginEmailValid(true);
    } else {
      setIsLoginEmailValid(false);
    }

  };

  const handlepasswordInput = (e) => {
    const value = e.target.value;
    setLoginPassword(value);

    // 유효성 검사 로직

    if (/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(value)) {
      setIsLoginPasswordValid(true);
    } else {
      setIsLoginPasswordValid(false);
    }
  };

  const inputIdDebounce = debounce(handleEmailInput, 500);
  const inputPasswordDebounce = debounce(handlepasswordInput, 500);

  return (
    <div className="flex-col max-w-[340px] mx-auto mb-12">
      <h1 className="text-center font-semibold text-3xl my-12">로그인</h1>

      <form>
        <div>
          <div className="mb-7">
            <label htmlFor="signInID" className="sr-only">
              로그인 아이디 입력창
            </label>
            <input
              type="text"
              name="signInID"
              id="signInID"
              required
              placeholder="아이디를 입력해주세요"
              className="w-[340px] h-[50px] rounded-xl text-lg border border-[#C4C4C4] mx-auto block pl-5 outline-none focus:border-primary"
              defaultValue={loginEmail}
              onChange={inputIdDebounce}
            />
            {!isLoginEmailValid && loginEmail ? (
              <p className="text-error w-[340px]  text-sm font-medium mt-1 ml-2">
                아이디(이메일)를 형식에 맞게 입력해주세요.
              </p>
            ) : (
              ''
            )}
          </div>

          <div>
            <label htmlFor="signInPWD" className="sr-only">
              로그인 비밀번호 입력창
            </label>
            <input
              type="password"
              name="signInPWD"
              id="signInPWD"
              required
              placeholder="비밀번호를 입력해주세요"
              className="w-[340px] h-[50px] rounded-xl text-lg border border-[#C4C4C4] mx-auto block pl-5 outline-none focus:border-primary"
              defaultValue={loginPassword}
              onChange={inputPasswordDebounce}
            />
            {!isLoginPasswordValid && loginPassword ? (
              <p className="text-error w-[340px] text-sm font-medium mt-1 ml-3">
                비밀번호를 형식에 맞게 입력해주세요
              </p>
            ) : (
              ''
            )}
          </div>

          <div className="mb-20 text-sm font-medium mt-7 flex justify-end gap-1">
            <button type="button">아이디 찾기</button>
            <span> | </span>
            <button type="button">비밀번호 찾기</button>
          </div>
        </div>

        <LoginButtonGroup />
      </form>
      <div className="w-[340px] flex justify-between items-center text-sm mb-28">
        <span>아직 회원이 아니신가요?</span>

        <Link to="/signUp" className="hover:text-primary">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
