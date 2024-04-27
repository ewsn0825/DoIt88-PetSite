function ServiceAgreement() {
  return (
    <div>
      <p className="font-medium mb-8">
        <span>환영합니다! Geppetto를 이용해 주셔서 감사합니다. </span><br />
        아래의 약관은 Geppetto와 사용자 사이의 권리와 의무를 규정합니다. 본
        약관에 동의하지 않는 경우, 해당 서비스를 사용할 수 없습니다.
      </p>

      <dl>
        <dt className="text-lg  mt-5 font-semibold">정의</dt>
        <dd className="my-2">
          1.1 "Geppetto"는 본 웹 어플리케이션을 운영하는 회사를 가리킵니다.
        </dd>
        <dd className="my-2">
          1.2 "사용자"란 본 서비스에 접속하여 제공되는 기능과 콘텐츠를 활용하는
          개인 또는 단체를 말합니다.
        </dd>
        <dt className="text-lg  mt-5 font-semibold">계정 생성 및 보안</dt>
        <dd className="my-2">
          2.1 사용자가 본 서비스를 이용하기 위해서는 계정 생성 과정을 거치셔야
          합니다.
        </dd>
        <dd className="my-2">
          2.2 계정 정보(아이디, 비밀번호 등)는 사용자 개인에게 책임이 있으며,
          타인과 공유하거나 대여할 수 없습니다.
        </dd>
        <dd className="my-2">
          2.3 계정 정보 유출로 인한 피해나 손실에 대해서 Geppetto는 책임지지
          않습니다.
        </dd>
        <dt className="text-lg mt-5 font-semibold">서비스 이용</dt>

        <dd className="my-2">
          3.1 사용자는 본 서비스를 법률과 관련 규정을 준수하여 이용해야 합니다.
        </dd>
        <dd className="my-2">
          3.2 Geppetto가 제공하는 기능과 콘텐츠에 대한 지적 재산권은
          Geppetto에게 속합니다.
        </dd>
        <dd className="my-2">
          3.3 사용자가 제공하는 콘텐츠에 대한 저작권 및 지적 재산권은 해당
          사용자에게 속합니다.
        </dd>
      </dl>
    </div>
  );
}

export default ServiceAgreement;
