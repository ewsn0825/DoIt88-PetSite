import BirthDate from '@/components/signUp/BirthDate';
import { useNavigate } from 'react-router-dom';
import pb from '@/api/pocketbase';
import debounce from '@/utils/debounce';
// import { useState } from 'react';
import AgreementCheckbox from '@/components/signUp/AgreementCheckbox';
import ImageUploader from '@/components/signUp/ImageUploader';
import FormInput from '@/components/signUp/FormInput';
import dashDate from '@/utils/dashDate';
import useDate from '@/store/dateStore';
import useAgreement from '@/store/agreementStore';
import useImage from '@/store/imageUploadStore';
import useRegister from '@/store/registerStore';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

function SignUP() {
  const navigate = useNavigate();

  const [isFormValid, setIsFormValid] = useState(false);

  //날짜 상태 변수
  const { year, month, day, setYear, setDay, setMonth, isValid } = useDate();

  //이미지 상태 변수
  const { selectedImageFile, setSelectedImageFile, setSelectedImageURL } =
    useImage();

  //동의버튼 상태 변수
  const {
    serviceAgreementCheck,
    privacyPolicyCheck,
    ageVerificationCheck,
    marketingAgreementCheck,
    setServiceAgreementCheck,
    setPrivacyPolicyCheck,
    setAgeVerificationCheck,
    setMarketingAgreementCheck,
  } = useAgreement();

  const {
    email,
    password,
    passwordConfirm,
    nickname,
    isEmailValid,
    isPasswordValid,
    isNicknameValid,
    isEmailDateValid,
    isNicknameDateValid,
    setEmail,
    setPassword,
    setPasswordConfirm,
    setNickname,
    setIsEmailValid,
    setIsPasswordValid,
    setIsPasswordConfirmValid,
    setIsNicknameValid,
  } = useRegister();

  const resetFormState = () => {
    setEmail('');
    setNickname('');
    setPassword('');
    setPasswordConfirm('');
    setYear('');
    setMonth('');
    setDay('');
    setSelectedImageFile(null);
    setSelectedImageURL(null);
    setServiceAgreementCheck(false);
    setPrivacyPolicyCheck(false);
    setAgeVerificationCheck(false);
    setMarketingAgreementCheck(false);
  };

  const handleEmailInput = (e) => {
    const value = e.target.value;

    // 유효성 검사 로직
    const atIndex = value.indexOf('@');
    if (
      atIndex >= 5 &&
      atIndex <= 20 &&
      /^[a-z0-9_.-]+@[a-z0-9.._.-]+\.[a-z]{2,}$/.test(value)
    ) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
    setEmail(value);
  };

  const handlePasswordInput = (e) => {
    const value = e.target.value;

    // 유효성 검사 로직

    if (/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(value)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }

    setPassword(value);
  };

  const handlePasswordConfirmInput = (e) => {
    const value = e.target.value;

    if (value === password) {
      setIsPasswordConfirmValid(true);
    } else {
      setIsPasswordConfirmValid(false);
    }

    setPasswordConfirm(value);
  };

  const handleNicknameInput = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9가-힣]{2,}$/; // 알파벳 대소문자, 숫자, 한글로 이루어진 2글자 이상의 문자열

    if (regex.test(value)) {
      setIsNicknameValid(true);
    } else {
      setIsNicknameValid(false);
    }

    setNickname(value);
  };

  const inputEmailDebounce = debounce(handleEmailInput, 300);
  const inputPasswordDebounce = debounce(handlePasswordInput, 300);
  const inputPasswordConfirmDebounce = debounce(
    handlePasswordConfirmInput,
    300
  );
  const inputNicknameDebounce = debounce(handleNicknameInput, 300);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // const { email, nickname, password, passwordConfirm } = formState;

    if (password !== passwordConfirm) {
      toast.error('비밀번호가 일치하지 않습니다.', {
        duration: 2000,
      });
      return;
    }

    // PocketBase SDK 인증 요청
    try {
      formData.append('email', email);
      formData.append('password', password);
      formData.append('passwordConfirm', passwordConfirm);
      formData.append('nickname', nickname);
      formData.append('birthDate', dashDate(year, month, day));
      formData.append('emailVisibility', true);
      // formData.append('verified', true);

      if (selectedImageFile) {
        formData.append('profile', selectedImageFile);
      }
      // formData.append('profile', cc);
      formData.append('serviceCheck', serviceAgreementCheck);
      formData.append('privacyCheck', privacyPolicyCheck);
      formData.append('ageCheck', ageVerificationCheck);
      formData.append('marketingCheck', marketingAgreementCheck);

      await pb.collection('users').create(formData);
      // authSignUp(formData);

      toast.success(`회원가입이 완료되었습니다.`, {
        icon: '🎉',
        duration: 2000,
      });

      resetFormState();

      navigate('/signIn');
    } catch (error) {
      toast.error('회원가입에 실패하였습니다.');

      console.log('오류', error.response);
    }
  };

  useEffect(() => {
    if (
      isValid &&
      isEmailValid &&
      isPasswordValid &&
      isEmailDateValid &&
      isNicknameDateValid &&
      isNicknameValid &&
      serviceAgreementCheck &&
      privacyPolicyCheck &&
      ageVerificationCheck
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    isValid,
    isEmailValid,
    isPasswordValid,
    isNicknameValid,
    isEmailDateValid,
    isNicknameDateValid,
    selectedImageFile,
    serviceAgreementCheck,
    privacyPolicyCheck,
    ageVerificationCheck,
  ]);

  return (
    <div className=" mx-auto max-w-[750px] flex-col py-7">
      <h2 className="text-center font-semibold  text-4xl my-7">회원가입</h2>
      <p className="text-[#686868] text-right my-5">
        <span className="text-[#FF483D]">*</span>는 필수 입력 항목입니다.
      </p>
      <form className="flex-col" onSubmit={handleRegister}>
        <div className="border-y-2 flex-col border-black items-center gap-10">
          <FormInput
            label="이메일"
            isNecessary="true"
            id="email"
            placeholder="이메일를 입력해주세요"
            isBtn="true"
            defaultValue={email}
            onChange={inputEmailDebounce}
          />
          {!isEmailValid && email ? (
            <p className="text-error text-sm font-medium ml-[168px] -mt-4">
              이메일: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용
              가능합니다.
            </p>
          ) : (
            ''
          )}

          <FormInput
            label="비밀번호"
            type="password"
            isNecessary="true"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            defaultValue={password}
            onChange={inputPasswordDebounce}
          />

          {!isPasswordValid && password ? (
            <p className="text-error text-sm font-medium ml-[168px] -mt-4">
              비밀번호: 8~16자의 영문 대/소문자, 숫자와 1개 이상의 특수문자를
              사용해 주세요.
            </p>
          ) : (
            ''
          )}

          <FormInput
            label="비밀번호 확인"
            type="password"
            isNecessary="true"
            id="passwordConfirm"
            placeholder="비밀번호를 한 번 더 입력해주세요"
            defaultValue={passwordConfirm}
            onChange={inputPasswordConfirmDebounce}
          />

          {password && passwordConfirm && password !== passwordConfirm ? (
            <p className="text-error text-sm font-medium ml-[168px] -mt-4">
              비밀번호가 일치하지 않습니다.
            </p>
          ) : (
            ''
          )}

          <FormInput
            label="닉네임"
            isNecessary="true"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            isBtn="true"
            defaultValue={nickname}
            onChange={inputNicknameDebounce}
          />
          {!isNicknameValid && nickname ? (
            <p className="text-error text-sm font-medium ml-[168px] -mt-4">
              닉네임: 2글자 이상, 특수문자 사용불가
            </p>
          ) : (
            ''
          )}

          <ImageUploader />

          <BirthDate />
        </div>

        <AgreementCheckbox />

        <button
          type="submit"
          className={`w-[340px] h-[50px]  text-white font-medium rounded-xl text-lg block mt-14 mx-auto ${
            isFormValid ? 'bg-primary' : 'bg-primaryContainer'
          } `}
          disabled={!isFormValid}
        >
          가입하기
        </button>
      </form>
    </div>
  );
}

export default SignUP;
