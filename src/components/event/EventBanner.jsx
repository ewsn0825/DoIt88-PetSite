import pb from '@/api/pocketbase';
import { useEffect, useState } from 'react';
import EventBannerImage from './EventBannerImage';

function EventBanner() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    async function getCommunity() {
      setIsLoading(true);
      try {
        const record = await pb.collection('bannerImage').getList(1, 30);
        setData(record);
        setIsLoading(false);
      } catch (error) {
        if (!(error in DOMException)) {
          console.error();
          setIsLoading(false);
        }
      }
    }

    getCommunity();
  }, []);

  return (
    <>
      {!isLoading &&
        data?.items?.map((item) => {
          <div key={item.id} className="flex flex-col gap-10">
            <EventBannerImage item={item} />
          </div>;
        })}
    </>
  );
}

export default EventBanner;
