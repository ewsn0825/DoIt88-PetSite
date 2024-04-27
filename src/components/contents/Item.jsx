import { getPbImageURL } from '@/utils';
import { Link } from 'react-router-dom';

function Item({ item }) {
  if (item) {
    return (
      <>
        <Link to={`/contents/detail/${item.id}`}>
          <figure className="flex flex-col gap-20 w-[310px] h-[210px] overflow-hidden relative rounded-10">
            <img
              src={getPbImageURL(item, 'image')}
              className="-translate-y-1/4"
            />
            <figcaption className="truncate" aria-readonly>
              {item.imageAlt}
            </figcaption>
          </figure>
          <p className="text-xl truncate">{item.title}</p>
        </Link>
      </>
    );
  }
}

export default Item;
