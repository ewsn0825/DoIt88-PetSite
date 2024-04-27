import { getPbImageURL } from '@/utils';
import { Link } from 'react-router-dom';

function CommunityListContent({ item }) {
  if (item) {
    return (
      <>
        <Link to={`/community/detail/${item.id}`}>
          <div className="flex gap-[28px] h-[120px]">
            <div className="py-[11px] w-[826px]">
              <h2 className="text-black text-[21px] font-[700] pb-[12px]">
                <p className="text-xl truncate">{item.title}</p>
              </h2>
              <div className="CommunityListText">{item.content}</div>
            </div>
            <div className="py-[11px]">
              {item.image && (
                <img
                  src={getPbImageURL(item, 'image')}
                  alt="첨부 이미지"
                  className="w-[120px] h-[120px] rounded-10 object-cover bg-center"
                />
              )}
            </div>
          </div>
        </Link>

        <div className="flex items-center">
          <div className="flex">
            <img
              src={getPbImageURL(item.expand.user, 'profile')}
              alt="프로필 사진"
              className="text-[12px] w-[30px] h-[30px] text-black font-[400] rounded-[50%]"
            />

            <div className="flex items-center text-[12px] text-black font-[400] ml-[8px]">
              {item?.expand?.user.nickname}
            </div>
          </div>
          <div className="ml-[44px] text-[12px] text-black font-[400]">
            댓글: {item?.comment.length}
          </div>
          <div className="ml-[44px] text-[12px] text-black font-[400]">
            {item.updated.substr(0, 10)}
          </div>
        </div>
      </>
    );
  }
}

export default CommunityListContent;
