import { useEffect, useState } from 'react';
import pb from '@/api/pocketbase';
import PopularItem from './PopularItem';

function PopularPosts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getPopularCommunity() {
      try {
        await pb
          .collection('community')
          .getList(1, 3, {
            sort: '-like',
          })
          .then((res) => setData(res));
      } catch (error) {
        if (!(error in DOMException)) {
          console.error();
        }
      }
    }
    getPopularCommunity();
  }, []);

  return (
    <div className="flex flex-col m-auto items-center py-10">
      <h2 className="text-[28px] font-bold">커뮤니티 인기글</h2>
      <div className="flex flex-col gap-8 mt-8">
        {data?.items?.map((item) => (
          <PopularItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default PopularPosts;
