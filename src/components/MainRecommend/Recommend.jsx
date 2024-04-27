import SwiperRecommend from '@/components/MainRecommend/SwiperRecommend';
import BannerRecommend from '@/components/MainRecommend/BannerRecommend';

function Recommend() {
  return (
    <>
      <div className="flex-col items-center bg-white py-[40px]">
        <h2 className="text-center text-[28px] font-[700] mb-[38px] text-[#1E1E1E]">
          추천 콘텐츠
        </h2>
        <div>
          <SwiperRecommend />
        </div>
      </div>
      <div className="flex justify-center bg-white">
        <BannerRecommend />
      </div>
    </>
  );
}

export default Recommend;
