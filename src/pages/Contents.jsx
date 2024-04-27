import ContentPost from '@/components/contents/ContentPost';
import Pagination from '@/components/home/Pagination';

function Contents() {
  return (
    <div className="flex flex-col m-auto items-center gap-11 my-10">
      <h2 className="text-black text-[28px] font-bold">콘텐츠</h2>
      <div className="flex gap-8 max-w-5xl flex-wrap">
        <ContentPost />
      </div>
      <Pagination />
    </div>
  );
}

export default Contents;
