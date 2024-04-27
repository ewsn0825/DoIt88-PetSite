import { getPbImageURL } from '@/utils';
import { Link } from 'react-router-dom';

function RecommendItem({ item }) {
  return (
    <Link to={`/contents/detail/${item.id}`}>
      {item.image && (
        <img
          src={getPbImageURL(item, 'image')}
          alt={item.imageAlt}
          className="w-[310px] h-[210px] mb-[16px] rounded-10 object-cover bg-center"
        />
      )}
      <span className="text-[20px] font-[500] text-[#1E1E1E]">
        {item.title}
      </span>
    </Link>
  );
}

export default RecommendItem;
