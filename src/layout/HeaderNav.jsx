// import Logo from '@/components/Logo';
import Logo from '@/components/header/Logo';
import { NavLink } from 'react-router-dom';

function HeaderNav() {
  return (
    <nav className="flex flex-nowrap justify-between">
      <ul className="flex flex-nowrap gap-12 font-semibold justify-start items-center text-black">
        {/* <li>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </li> */}
        <li className="flex-nowrap flex-shrink-0 flex-grow-0">
          <Logo />
        </li>
        <li className="flex-nowrap flex-shrink-0">
          <NavLink to="/contents">콘텐츠</NavLink>
        </li>
        <li className="flex-nowrap flex-shrink-0">
          <NavLink to="/community">커뮤니티</NavLink>
        </li>
        {/* <li className="flex-nowrap flex-shrink-0">
          <NavLink to="/place">나들이</NavLink>
        </li> */}
        <li className="flex-shrink-0">
          <NavLink to="/event">이벤트</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
