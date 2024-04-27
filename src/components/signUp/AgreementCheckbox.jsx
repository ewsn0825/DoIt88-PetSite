import { useEffect } from 'react';
import uncheckedImage from '@/assets/icon/checkFalse.svg'; // 체크되지 않은 상태의 이미지
import checkedImage from '@/assets/icon/checkTrue.svg'; // 체크된 상태의 이미지
import useAgreement from '@/store/agreementStore';

import Modal from './Modal';

const AgreementCheckbox = () => {
  const agreementContents = {
    service: 'Geppetto 서비스 이용약관',
    privacy: 'Geppetto 개인정보 보호 정책',
    marketing: 'Geppetto 마케팅 정책',
  };

  const {
    selectAllCheck,
    serviceAgreementCheck,
    privacyPolicyCheck,
    ageVerificationCheck,
    marketingAgreementCheck,
    setSelectAllCheck,
    setServiceAgreementCheck,
    setPrivacyPolicyCheck,
    setAgeVerificationCheck,
    setMarketingAgreementCheck,
  } = useAgreement();

  // 전체 동의 체크박스를 눌렀을 때 다른 모든 체크박스도 체크 상태로 변경
  const handleSelectAllChange = () => {
    let newValue = !selectAllCheck;
    setSelectAllCheck(newValue);
    setServiceAgreementCheck(newValue);
    setPrivacyPolicyCheck(newValue);
    setAgeVerificationCheck(newValue);
    setMarketingAgreementCheck(newValue);
    // 마케팅 정보 수신 동의는 선택사항이므로 자동으로 체크되지 않음
  };

  // 개별 항목 중 하나라도 체크가 해제되면 전체 동의도 해제
  useEffect(() => {
    if (
      serviceAgreementCheck &&
      privacyPolicyCheck &&
      ageVerificationCheck &&
      marketingAgreementCheck
    ) {
      setSelectAllCheck(true);
    } else {
      setSelectAllCheck(false);
    }
  }, [
    serviceAgreementCheck,
    privacyPolicyCheck,
    ageVerificationCheck,
    marketingAgreementCheck,
    setSelectAllCheck,
  ]);

  return (
    <div className="flex relative">
      <p className="w-[150px] py-3 inline-block">
        <span className="font-semibold text-lg relative">
          이용약관 동의
          <span className="text-[#FF483D] inline-block absolute -top-3 -right-3">
            *
          </span>
        </span>
      </p>

      <div className="flex-col ml-2 ">
        <div className="relative my-5">
          <img
            src={selectAllCheck ? checkedImage : uncheckedImage}
            alt="checkbox"
            onClick={() => {
              handleSelectAllChange();
            }}
            className="inline-block absolute top-1"
          />
          <input
            id="allCheck"
            type="checkbox"
            checked={selectAllCheck}
            onChange={handleSelectAllChange}
            className="hidden"
          />
          <label
            htmlFor="allCheck"
            className="text-2xl font-medium inline-block ml-8"
          >
            전체 동의합니다.
          </label>
        </div>

        {/* 선택사항인 이용약관 동의 체크박스 */}

        {/* 서비스 이용약관 동의 */}
        <div className="flex justify-between w-[500px]  my-7 ml-3">
          <div className="flex items-center relative">
            <img
              src={serviceAgreementCheck ? checkedImage : uncheckedImage}
              alt="체크버튼"
              onClick={() => setServiceAgreementCheck(!serviceAgreementCheck)}
              className="inline-block absolute top-0.5"
              // className="inline-block absolute top-0.5"
            />
            <label
              htmlFor="serviceCheck"
              className="text-xl font-medium inline-block ml-8"
            >
              서비스 이용약관 동의
            </label>
            <input
              type="checkbox"
              id="serviceCheck"
              onChange={() => {
                setServiceAgreementCheck(!serviceAgreementCheck);
              }}
              className="hidden"
            />
          </div>

          <Modal headline={agreementContents.service} id="service" />
        </div>

        {/* 개인정보 수집 및 이용동의 */}
        <div className="flex justify-between w-[500px] relative my-7 ml-3">
          <div>
            <img
              src={privacyPolicyCheck ? checkedImage : uncheckedImage}
              alt="체크버튼"
              onClick={() => setPrivacyPolicyCheck(!privacyPolicyCheck)}
              className="inline-block absolute top-0.5"
            />
            <label
              htmlFor="privacyCheck"
              className="text-xl font-medium inline-block ml-8"
            >
              개인정보 수집 및 이용 동의
            </label>
            <input
              type="checkbox"
              id="privacyCheck"
              onChange={() => setPrivacyPolicyCheck(!privacyPolicyCheck)}
              className="hidden"
            />
          </div>

          <Modal headline={agreementContents.privacy} id="privacy" />
        </div>

        {/* 만 14세 이상 확인 */}
        <div className="flex justify-between w-[500px] relative my-7 ml-3">
          <div>
            <img
              src={ageVerificationCheck ? checkedImage : uncheckedImage}
              alt="체크버튼"
              onClick={() => setAgeVerificationCheck(!ageVerificationCheck)}
              className="inline-block absolute top-0.5"
            />
            <label
              htmlFor="ageCheck"
              className="text-xl font-medium inline-block ml-8"
            >
              만 14세 이상입니다.
            </label>
            <input
              type="checkbox"
              id="ageCheck"
              onChange={() => setAgeVerificationCheck(!ageVerificationCheck)}
              className="hidden"
            />
          </div>
        </div>

        {/* 마케팅 정보 수신 동의 */}
        <div className="flex justify-between w-[500px] relative my-7 ml-3">
          <div>
            <img
              src={marketingAgreementCheck ? checkedImage : uncheckedImage}
              alt="체크버튼"
              onClick={() =>
                setMarketingAgreementCheck(!marketingAgreementCheck)
              }
              className="inline-block absolute top-0.5"
            />
            <label
              htmlFor="marketingCheck"
              className="text-xl font-medium inline-block ml-8"
            >
              (선택) 마케팅 정보 수신 동의
            </label>
            <input
              type="checkbox"
              id="marketingCheck"
              // checked={marketingAgreementCheck}
              onChange={() =>
                setMarketingAgreementCheck(!marketingAgreementCheck)
              }
              className="hidden"
            />
          </div>

          <Modal headline={agreementContents.marketing} id="marketing" />
        </div>
      </div>
    </div>
  );
};

export default AgreementCheckbox;
