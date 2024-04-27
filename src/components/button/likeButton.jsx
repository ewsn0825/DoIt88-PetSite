import pb from '@/api/pocketbase';
import { useEffect, useState } from 'react';

function LikeButton(props) {
  const {
    localStorage: storage,
    JSON: { parse: deserialize },
  } = globalThis;

  const getData = (key) => {
    return deserialize(storage.getItem(key));
  };

  const [click, setClick] = useState(false);
  const [like, setLike] = useState(0);

  // 컴포넌트 마운트 시 백엔드에서 좋아요 상태 복원
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const pocketbaseAuthData = getData('pocketbase_auth');
        if (!pocketbaseAuthData) return;

        // Fetch user information and update click state
        const user = await pb
          .collection('users')
          .getOne(pocketbaseAuthData.model.id);
        setClick(user.contentsLike.includes(props.contentId));
      } catch (err) {
        console.error();
      }
    };
    fetchLikeStatus();
  }, [props.contentId]);

  const handleLikeButton = async (e) => {
    e.preventDefault();
    setClick(!click);

    let updatedLike = click ? like - 1 : like + 1;
    let newClickState = !click;
    setLike(updatedLike);
    const data = {
      like: updatedLike,
    };
    try {
      await pb.collection(props.collectionName).update(props.contentId, data);

      if (newClickState) {
        await pb
          .collection('users')
          .update(getData('pocketbase_auth').model.id, {
            'contentsLike+': props.contentId,
          });
      } else {
        await pb
          .collection('users')
          .update(getData('pocketbase_auth').model.id, {
            'contentsLike-': props.contentId,
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="북마크"
        className={
          click
            ? 'bg-likeCheck ' + `${props.className}`
            : 'bg-like ' + `${props.className}`
        }
        onClick={handleLikeButton}
      ></button>
    </>
  );
}

export default LikeButton;
