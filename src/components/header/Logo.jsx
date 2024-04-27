import logo from '@/assets/icon/logo.svg';
import { NavLink } from 'react-router-dom';

function Logo() {
  return (
    <div>
      <h1 className="sr-only">geppetto</h1>
      <NavLink to="/">
        <img src={logo} alt="로고 이미지" className="w-[184px] h-[42px]" />
      </NavLink>
    </div>
  );
}

export default Logo;
