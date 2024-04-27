import CommunityListContent from './CommunityListContent';
import { useState, useEffect } from 'react';
import pb from '@/api/pocketbase';
import Spinner from '../home/Spinner';

function CommunityListPost() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [check, setCheck] = useState('-created');

  useEffect(() => {
    async function getCommunity() {
      setIsLoading(true);
      try {
        const record = await pb.collection('community').getList(1, 30, {
          sort: check,
          expand: 'user',
        });
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
  }, [check]);

  return (
    <>
      <fieldset className="CommunityListProcedure flex">
        <input
          id="radio1"
          type="radio"
          name="radio"
          className="hidden"
          checked={check === '-created'}
          onChange={() => setCheck('-created')}
        />
        <label htmlFor="radio1" className="flex items-center cursor-pointer">
          <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey ml-[20px]"></span>
          최신순
        </label>

        <input
          id="radio2"
          type="radio"
          name="radio"
          className="hidden"
          checked={check === '-like'}
          onChange={() => setCheck('-like')}
        />
        <label htmlFor="radio2" className="flex items-center cursor-pointer">
          <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey ml-[20px]"></span>
          인기순
        </label>
      </fieldset>

      {isLoading && (
        <p className="flex justify-center items-center">
          <Spinner className="text-center" />
        </p>
      )}

      {!isLoading &&
        data?.items?.map((item) => (
          <div key={item.id}>
            <div className="border-b-2 border-[#747474] p-[20px]">
              <CommunityListContent item={item} />
            </div>
          </div>
        ))}
    </>
  );
}

export default CommunityListPost;
