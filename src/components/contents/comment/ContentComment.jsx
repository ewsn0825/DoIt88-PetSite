import pb from '@/api/pocketbase';
import { useState } from 'react';
import { getPbImageURL } from '@/utils';
import ContentCommentForm from './ContentCommentForm';
import CommentEdit from './CommentEdit';
import toast from 'react-hot-toast';
function ContentComment({ comments, id, setComment }) {
  const [editingCommentId, setEditingCommentId] = useState(null);

  const {
    localStorage: storage,
    JSON: { parse: deserialize },
  } = globalThis;

  const getData = (key) => {
    return deserialize(storage.getItem(key));
  };

  const handleDelete = async (commentId) => {
    toast((t) => (
      <div className="flex w-48 justify-between">
        <span>삭제하시겠습니까?</span>
        <button
          onClick={async () => {
            try {
              await pb.collection('contentComment').delete(commentId);
              toast.remove(t.id);

              setComment(
                comments.filter((comment) => comment.id !== commentId)
              );
            } catch (err) {
              console.error(err);
            }
          }}
          className="text-primary"
        >
          삭제
        </button>
      </div>
    ));
    try {
      if (editingCommentId === commentId)
        await pb.collection('contentComment').delete(commentId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {comments?.map((item) => {
        return (
          <div className="flex gap-6 w-[988px] h-20 align-middle" key={item.id}>
            <figure className="w-14">
              <img
                src={getPbImageURL(item.expand.user, 'profile')}
                alt="유저 프로필 사진"
                className="w-auto h-14 m-auto rounded-full"
              />
            </figure>
            <div>
              <div className="flex gap-6 items-baseline">
                <p className="font-semibold text-lg">
                  {item.expand.user.nickname}
                </p>
                <span className="text-sm h-fit">{`${item.created.slice(
                  0,
                  4
                )}년 ${item.created.slice(5, 7)}월 ${item.created.slice(
                  8,
                  10
                )}일`}</span>
              </div>

              {editingCommentId === item.id ? (
                <CommentEdit
                  comment={item.comment}
                  commentId={item.id}
                  setEditingCommentId={setEditingCommentId}
                  onUpdate={(updatedContent) => {
                    // 현재 렌더링 중인 댓글의 내용 업데이트
                    setComment(
                      comments.map((comment) =>
                        comment.id === item.id
                          ? { ...comment, comment: updatedContent }
                          : comment
                      )
                    );
                  }}
                />
              ) : (
                <p className="w-[820px]">{item.comment}</p>
              )}
            </div>
            {getData('pocketbase_auth') &&
              pb.authStore.model.id == item.expand.user.id && (
                <div className="flex gap-2 pt-7 align-middle items-center right-0">
                  {editingCommentId === item.id ? null : (
                    <>
                      <button
                        type="button"
                        onClick={() => setEditingCommentId(item.id)}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        className="text-error"
                        onClick={() => handleDelete(item.id)}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              )}
          </div>
        );
      })}
      <ContentCommentForm comments={comments} id={id} setComment={setComment} />
    </div>
  );
}
export default ContentComment;
