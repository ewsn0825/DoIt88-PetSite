import pb from '@/api/pocketbase';
import { useEffect, useState } from 'react';

function CommentEdit({ comment, commentId, setEditingCommentId, onUpdate }) {
  const [commentValue, setCommentValue] = useState(comment);

  useEffect(() => {
    async function getComment() {
      try {
        const comments = await pb
          .collection('contentComment')
          .getOne(commentId);
        const { comment } = comments;
        setCommentValue(comment);
      } catch (error) {
        if (!(error in DOMException)) {
          console.error();
        }
      }
    }
    getComment();
  }, [commentId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const newCommentValue = commentValue;

    const formData = new FormData();

    formData.append('comment', newCommentValue);

    try {
      await pb.collection('contentComment').update(commentId, formData);

      setEditingCommentId(null); // 편집모드 종료

      onUpdate(newCommentValue);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleUpdate} className="flex justify-between">
        <div className="flex gap-2 align-top items-start">
          <textarea
            type="text"
            className="w-[820px] focus:outline-primary resize-none"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button type="submit">저장</button>
          <button
            type="button"
            className="text-error"
            onClick={() => setEditingCommentId(null)}
          >
            취소
          </button>
        </div>
      </form>
    </>
  );
}
export default CommentEdit;
