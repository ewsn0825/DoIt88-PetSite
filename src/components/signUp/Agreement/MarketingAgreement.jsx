
function MarketingAgreement() {
  return (
    <div>
      <p className="font-medium mb-8">
        본 마케팅 정책은 Geppetto에서 수집한 정보를 활용하여 진행하는 마케팅
        활동에 대해 설명합니다. Geppetto를 사용함으로서 사용자가 본 마케팅
        정책에 동의한 것으로 간주됩니다.
      </p>

      <p className="text-lg font-semibold">수집한 정보 활용 </p>
      <p className="my-2">
        Geppetto는 사용자로부터 수집한 정보를 다음과 같은 목적으로 마케팅 활동에
        활용할 수 있습니다 : {' '}
      </p>

      <ul>
        <li>- 개인 맞춤형 서비스 제공</li>
        <li>- 새로운 기능, 업데이트, 프로모션 등의 안내 및 소식 전달</li>
        <li>- 설문조사나 피드백 요청을 통한 서비스 개선 및 고객 만족도 측정</li>
        <li>- 관련된 제품 또는 서비스의소개와 추천</li>
      </ul>


      <p className="text-lg mt-6 mb-3 font-semibold">정보 공유와 제3자 협력 </p>
      <span>
        Geppetto는 사용자의 개인정보를 제3자와 공유하지 않으며, 법적 규제나 요구
        사항 없이 별도로 동의하지 않는 한 판매, 임대 또는 교환하지 않습니다.
        그러나 Geppetto가 외부 파트너 또는 업체와 협력하여 마케팅 활동을
        진행하는 경우 일부 정보가 필요할 수 있습니다. 이 경우 해당 파트너 또는
        업체와 데이터 처리 계약을 체결하고 안전한 방법으로 개인정보를 공유하며,
        이들은 본 정책을 준수해야 합니다.
      </span>

      <p className="text-lg  mt-6 mb-3 font-semibold">
        쿠키(Cookies)와 추적 기능{' '}
      </p>
      <span>
        Geppetto 웹 어플리케이션은 쿠키 등 추적 기능을 사용하여 사용자 경험
        개선과 타겟된 광고 전달 등 다양한 목적으로 활용할 수 있습니다. 이러한
        기능은 사용자에게 맞춤형 컨텐츠 및 광고를 제공하기 위해 필요합니다.
        사용자는 자신의 브라우저 설정에서 쿠키 관리 옵션을 선택할 수 있으며,
        필요에 따라 거부하거나 경고 메시지 설정도 가능합니다.
      </span>
    </div>
  );
}

export default MarketingAgreement;
