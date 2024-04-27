import Item from './Item';
import { useEffect, useState } from 'react';
import pb from '@/api/pocketbase';
import Spinner from '../home/Spinner';

function ContentPost() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getContents() {
      setIsLoading(true);
      try {
        await pb
          .collection('contents')
          .getList(1, 30, {
            sort: '-created',
          })
          .then((res) => setData(res));
        setIsLoading(false);
      } catch (error) {
        if (!(error in DOMException)) {
          console.error();
          setIsLoading(false);
        }
      }
    }
    getContents();
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading &&
        data?.items?.map((item) => <Item key={item.id} item={item} />)}
    </>
  );
}

export default ContentPost;
