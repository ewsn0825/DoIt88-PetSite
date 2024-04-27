import { getPbImageURL } from '@/utils';

function EventBannerImage({ item }) {
  return (
    <>
      <figure>
        <img
          src={getPbImageURL(item, 'image')}
          alt={item.imageAlt}
          className="w-[984px]"
        />
      </figure>
    </>
  );
}

export default EventBannerImage;
