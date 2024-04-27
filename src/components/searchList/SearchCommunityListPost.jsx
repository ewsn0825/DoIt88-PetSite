// import CommunityListContent from './SHCommunityComment';

import { useState, useEffect } from 'react';
import pb from '@/api/pocketbase';
import useSearch from '@/store/searchStore';
import SearchCommunityListContent from './SearchCommunityListContent';
import Spinner from '../home/Spinner';

function SearchCommunityListPost() {
  const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState(null);
  // const [check, setCheck] = useState('-created');
  const { communityData, setCommunityData, searchStorage } = useSearch();

  //검색된 리스트 가져옴
  useEffect(() => {
    async function getCommunity() {
      const keyword = searchStorage;
      setIsLoading(true);

      try {
        if (keyword !== '') {
          const record = await pb.collection('community').getList(1, 30, {
            filter: `(title ?~ "${keyword}" || content ?~ "${keyword}" )`,
            // filter: `'title ~ "${ddd}" || content ~ "${ddd}"'`,
            expand: 'user',
          });
          setCommunityData(record);
          setIsLoading(false);
          // setSearchText('');
        } else {
          setIsLoading(false);
          return;
        }
      } catch (error) {
        if (!(error in DOMException)) {
          setIsLoading(false);
        }
      }
    }

    getCommunity();
  }, [searchStorage, setCommunityData]);

  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading &&
        communityData?.items?.map((item) => (
          <div key={item.id}>
            <div className="border-b-2 border-[#747474] p-[20px]">
              <SearchCommunityListContent item={item} />
            </div>
          </div>
        ))}

      {isLoading === false && communityData.totalItems === 0 && (
        <div className='text-3xl my-16 text-center'>검색어와 관련된 커뮤니티 내용을 찾을 수 없습니다.</div>
      )}
    </>
  );
}

export default SearchCommunityListPost;
