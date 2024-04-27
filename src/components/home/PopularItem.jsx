import { Link } from 'react-router-dom';

function PopularItem({ item }) {
  return (
    <div className="flex flex-col gap-4 w-[640px]">
      <div className="flex justify-between h-[94px] border-b border-black">
        <Link to={`/community/detail/${item.id}`}>
          <ul className="max-w-lg">
            <li className="font-bold text-lg truncate">{item.title}</li>
            <li className="pt-2 truncate">{item.content}</li>
          </ul>
        </Link>
        <Link
          to={`/community/detail/${item.id}`}
          className="more w-16 h-fit py-4 text-[#747474]"
        >
          {/* <a href="/" className="more w-16 h-fit py-4 text-[#747474]"> */}
          <span>더보기</span>
        </Link>
      </div>
    </div>
  );
}

export default PopularItem;
