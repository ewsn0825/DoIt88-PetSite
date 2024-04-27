function CommentCount({ comments }) {
  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          aria-label="댓글"
          className="bg-comment w-8 h-8"
        ></button>
        <span>{comments?.length}</span>
      </div>
    </>
  );
}

export default CommentCount;
