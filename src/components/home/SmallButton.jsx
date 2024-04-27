import { Link } from 'react-router-dom';

// 작은 버튼 생성
function SmallButton({ path, children }) {
  return (
    <Link
      to={path}
      type="button"
      className="bg-primary hover:bg-[#E2DFFF] px-10 py-4 rounded-10 text-white mt-6"
    >
      {children}
    </Link>
  );
}

export default SmallButton;
