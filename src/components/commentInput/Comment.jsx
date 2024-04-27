// import CommentInput from './CommentInput';
import pb from '@/api/pocketbase';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Comment({ dataId, comments, setCommentList }) {
  const navigate = useNavigate();

  const authDataString = localStorage.getItem('pocketbase_auth');
  const authData = JSON.parse(authDataString);

  const formRef = useRef(null);
  const commentRef = useRef(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!authData) {
      toast('로그인을 해주세요!', {
        icon: '🐾',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      navigate('/signIn');
    }

    const commentValue = commentRef.current.value;

    if (!commentValue) {
      toast('내용을 입력해주세요!', {
        icon: '😉',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });

      return;
    }

    // 새로운 댓글 등록
    const newComment = {
      comment: commentValue,
      user: authData.model.id,
    };

    try {
      const newCommentData = await pb
        .collection('communityComment')
        .create(newComment);
      if (newCommentData) {
        await pb.collection('community').update(dataId, {
          'comment+': newCommentData.id,
        });
      }

      const newCommentList = await pb
        .collection('communityComment')
        .getOne(newCommentData.id, {
          expand: 'user',
        });

      // 댓글 배열이 비었을 때 반복문 안되는 부분 조건 처리
      if (!comments) {
        setCommentList([newCommentList]);
      } else {
        setCommentList((comment) => [...comment, newCommentList]);
      }
      commentRef.current.value = '';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form
        encType="multipart/form-data"
        ref={formRef}
        onSubmit={handleSubmitComment}
        className="bg-[#f1f1f1] rounded-10 w-[988px] h-[100px] flex items-center align-middle"
      >
        <textarea
          type="text"
          className="bg-[#f1f1f1] w-[860px] h-[100px] rounded-10 p-5 mr-5 focus:outline-none resize-none"
          placeholder="댓글을 입력해주세요"
          name="comment"
          ref={commentRef}
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-9 rounded-10 right-0 h-5 items-center flex"
        >
          댓글 달기
        </button>
      </form>
    </>
  );
}
export default Comment;
