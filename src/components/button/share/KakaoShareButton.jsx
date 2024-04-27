import { useEffect } from 'react';

export default function KakaoShare(props) {
  useEffect(() => {
    kakaoButton();
  }, []);

  const kakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(`${import.meta.env.VITE_KAKAO_KEY}`);
      }

      kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title: `${props.title}`,
          imageUrl: `${props.image}`,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      });
    }
  };

  return (
    <button id="kakaotalk-sharing-btn" className="w-14 h-14">
      <img
        src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="카카오톡 공유 보내기 버튼"
        className="rounded-full w-14 h-14 flex justify-center align-middle"
        onClick={() => kakaoButton()}
      />
    </button>
  );
}
