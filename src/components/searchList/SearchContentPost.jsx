import Item from './SearchItem';
import { useState } from 'react';
import { useEffect } from 'react';
import pb from '@/api/pocketbase';
import Spinner from '../home/Spinner';
import useSearch from '@/store/searchStore';

function SearchContentPost() {

  const [isLoading, setIsLoading] = useState(false);
  const { contentData, setContentData, searchStorage } = useSearch();
  useEffect(() => {
    async function getContents() {
      setIsLoading(true);
      try {
        if (searchStorage !== '') {
          await pb
            .collection('contents')
            .getList(1, 30, {
              filter: `(title ?~ "${searchStorage}" || content ?~ "${searchStorage}" )`,
            })
            .then((res) => setContentData(res));
          setIsLoading(false);
        } else {
          setIsLoading(false);
          return;
        }
      } catch (error) {
        if (!(error in DOMException)) {
          console.error();
          setIsLoading(false);
        }
      }
    }
    getContents();
  }, [searchStorage, setContentData]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading &&
        contentData?.items?.map((item) => (
          <div key={item.id}>
            <Item key={item.id} item={item} />
          </div>
        ))}
      {isLoading === false && contentData.totalItems === 0 && (
        <div className='text-3xl my-16'>검색어와 관련된 콘텐츠를 찾을 수 없습니다.</div>
      )}
    </>
  );
}

export default SearchContentPost;
