import pb from '@/api/pocketbase';
import toast from 'react-hot-toast';

function CommentEditDelete({
  commentId,
  comments,
  editComment,
  editMode,
  setEditMode,
  setCommentList,
}) {
  // 수정 버튼 누를 시 editmode로 전환
  const handleEditRecord = async (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  // 댓글 수정
  const handleUpdateRecord = async (e) => {
    e.preventDefault();

    if (!editComment) {
      toast('내용을 입력해주세요!', {
        icon: '😉',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });

      return;
    }

    const editCommentData = { comment: editComment };

    try {
      await pb
        .collection('communityComment')
        .update(commentId, editCommentData);
      setEditMode(false);

      toast('수정되었습니다', {
        icon: '⚒',
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 댓글 삭제
  const handleDeleteRecord = async () => {
    const deleteConfirm = confirm('정말 삭제하시겠어요?');

    try {
      if (deleteConfirm) {
        await pb.collection('communityComment').delete(commentId);
        setCommentList(comments.filter((comment) => comment.id !== commentId));
        toast('삭제되었습니다', {
          icon: '🗑',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {editMode ? (
        <button
          onClick={handleUpdateRecord}
          className="mr-[8px] text-black text-[16px] font-[500]"
        >
          저장
        </button>
      ) : (
        <button
          onClick={handleEditRecord}
          className="mr-[8px] text-black text-[16px] font-[500]"
        >
          수정
        </button>
      )}
      <button
        onClick={handleDeleteRecord}
        className="text-error text-[16px] font-[500]"
      >
        삭제
      </button>
    </div>
  );
}

export default CommentEditDelete;
