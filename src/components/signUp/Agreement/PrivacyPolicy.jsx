function PrivacyPolicy() {
  return (
    <div>
      <p className="font-medium mb-8">
        본 개인정보 보호 정책은 Geppetto에서 수집하는 정보와 해당 정보를
        처리하는 방법에 대해 설명합니다. Geppetto를 사용함으로서 사용자가 본
        개인정보 보호 정책에 동의한 것으로 간주됩니다.
      </p>

      <p className="text-lg mt-6 mb-3 font-semibold">수집하는 정보</p>
      <p className="my-2">
        Geppetto는 사용자가 서비스를 이용할 때 일부 개인 식별 정보를 수집할 수
        있습니다. 이러한 정보는 다음과 같을 수 있습니다:
      </p>

      <ul>
        <li>- 이름, 전자메일 주소, 연락처 등과 같은 개인 식별 정보</li>
        <li>- 기기 및 브라우저 정보</li>
        <li>- 서비스 이용 기록, 로그 데이터 등</li>
      </ul>

      <p className="text-lg mt-6 mb-3 font-semibold">정보의 사용 목적</p>
      <p className="my-2">Geppetto는 다음과 같은 목적으로 사용자의 개인정보를 처리합니다:</p>

      <ul>
        <li>- 서비스 제공 및 운영</li>
        <li>- 계정 관리와 인증</li>
        <li>- 고객 지원 및 문의 응답</li>
        <li>- 서비스 향상을 위한 분석 및 통계 자료 작성</li>
        <li>- 법적 의무 준수</li>
      </ul>
      <p className="text-lg mt-6 mb-3 font-semibold">정보의 공유와 제공</p>
      <span>
        Geppetto는 사용자의 개인정보를 다른 당사자와 공유하지 않으며, 법적
        규제나 요구 사항 없이 별도로 동의하지 않는 한 판매, 임대 또는 교환하지
        않습니다.
      </span>

    </div>
  );
}

export default PrivacyPolicy;
