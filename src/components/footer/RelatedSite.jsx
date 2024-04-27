import instagram from '@/assets/icon/instagram.svg';
import facebook from '@/assets/icon/facebook.svg';
import github from '@/assets/icon/github.svg';
import kakao from '@/assets/icon/kakao.svg';

function RelatedSite() {
  return (
    <>
      <ul className="flex justify-center gap-5">
        <li>
          <a href="/">
            <img src={instagram} alt="인스타그램" />
          </a>
        </li>
        <li>
          <a href="/">
            <img src={facebook} alt="페이스북" />
          </a>
        </li>
        <li>
          <a href="https://github.com/FRONTENDSCHOOL6/DoIt88-PetSite">
            <img src={github} alt="깃허브" />
          </a>
        </li>
        <li>
          <a href="/">
            <img src={kakao} alt="카카오톡" />
          </a>
        </li>
      </ul>
    </>
  );
}

export default RelatedSite;
