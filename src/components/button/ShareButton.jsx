import { useState } from 'react';
import KakaoShare from './share/KakaoShareButton';
import UrlShare from './share/UrlShareButton';

function ShareButton(props) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="float-right ">
      <button
        type="button"
        aria-label="공유하기"
        onClick={toggleModal}
        className={'bg-share bg-no-repeat ' + `${props.className}`}
      ></button>
      {showModal ? (
        <div className="absolute w-44 h-20 bg-primaryContainer arrow-up rounded-10">
          <div className="flex gap-7 justify-center align-middle py-3">
            <UrlShare />
            <KakaoShare id={props.id} title={props.title} image={props.image} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ShareButton;
