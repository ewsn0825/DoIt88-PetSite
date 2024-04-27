function Pagination() {
  return (
    <nav className="flex flex-row gap-5">
      <button
        type="button"
        aria-label="이전페이지"
        className="bg-prev bg-center bg-cover w-6 h-6"
      ></button>
      <ol className="flex flex-row gap-5">
        <li>
          <a href="" className="pageActive">
            1
          </a>
        </li>
        <li>
          <a href="">2</a>
        </li>
        <li>
          <a href="">3</a>
        </li>
        <li>
          <a href="">4</a>
        </li>
        <li>
          <a href="">5</a>
        </li>
      </ol>
      <button
        type="button"
        aria-label="다음페이지"
        className="bg-next bg-center bg-cover w-6 h-6"
      ></button>
    </nav>
  );
}
export default Pagination;
