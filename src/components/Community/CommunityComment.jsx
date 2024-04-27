import { getPbImageURL } from '@/utils';
import { useState, useEffect } from 'react';
import CommentEditDelete from '../commentInput/CommentEditDelete';

function CommunityComment({
  profile,
  userId,
  nickname,
  comments: { id, comment, created },
  commentList,
  setCommentList,
}) {
  const authDataString = localStorage.getItem('pocketbase_auth');
  const authData = JSON.parse(authDataString);

  const [date, setDate] = useState('');
  const [editComment, setEditComment] = useState(comment);
  const [editMode, setEditMode] = useState(false);

  const commentProfile = getPbImageURL(profile, 'profile');

  // 댓글 날짜 설정
  useEffect(() => {
    if (created) {
      let dateTime = `${created.slice(5, 7)}월 ${created.slice(8, 10)}일`;
      setDate(dateTime);
    }
  }, [created]);

  return (
    <li className="border-b my-4 pb-4">
      <div className="w-full pb-[12px] flex items-start justify-between">
        <figure className="flex items-center">
          <img
            className="rounded-full w-9 h-9 mr-3 object-cover"
            src={commentProfile}
            alt="댓글 프로필 사진"
          />
          <figcaption className="text-[18px] text-black font-bold">
            {nickname}
          </figcaption>
        </figure>
        {authData && authData.model.id === userId && (
          <CommentEditDelete
            commentId={id}
            comments={commentList}
            editComment={editComment}
            editMode={editMode}
            setEditMode={setEditMode}
            setCommentList={setCommentList}
          />
        )}
      </div>
      {editMode ? (
        <textarea
          type="text"
          value={editComment}
          onChange={(e) => setEditComment(e.target.value)}
          className="w-full focus:outline-primary resize-none"
        />
      ) : (
        <p className="pb-2 text-base">{editComment}</p>
      )}
      <time className="text-sm text-content">{date}</time>
    </li>
  );
}

export default CommunityComment;
