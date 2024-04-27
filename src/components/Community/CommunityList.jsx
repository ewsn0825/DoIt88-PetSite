import Pagination from '../home/Pagination';
import CommunityListPost from './CommunityListPost';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function CommunityList() {
  const navigate = useNavigate();

  const authDataString = localStorage.getItem('pocketbase_auth');
  const authData = JSON.parse(authDataString);

  const handlePage = () => {
    if (authData) {
      navigate('/community/new');
    } else {
      toast('로그인을 해주세요.', {
        icon: '🐾',
      });
      navigate('/signIn');
    }
  };

  return (
    <div className="flex justify-center">
      <div>
        <div className="w-[1015px] flex-col justify-center items-center py-[40px]">
          <h1 className="text-center text-black text-[28px] font-[700] mb-[50px]">
            커뮤니티
          </h1>
          <CommunityListPost />
          <div className="flex justify-end mt-[12px]">
            <button
              onClick={handlePage}
              className="w-[140px] h-[52px] bg-primary text-white text-[16px] font-[500] rounded-10"
            >
              글쓰기
            </button>
          </div>
        </div>
        <div className="flex justify-center py-[16px]">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default CommunityList;
