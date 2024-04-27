import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperMainBanner from './SwiperMainBanner';
import leftButton from '@/assets/icon/mainbanner-left.svg';
import rightButton from '@/assets/icon/mainbanner-right.svg';
import useSwiperRef from '@/hooks/useSwiperRef';

function MainBanner() {
  const [prevEl, prevElRef] = useSwiperRef(null);
  const [nextEl, nextElRef] = useSwiperRef(null);

  return (
    <div className="max-w-full min-w-[1120px] relative">
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        navigation={{
          prevEl,
          nextEl,
        }}
        className="flex justify-center items-center"
      >
        <SwiperSlide>
          <SwiperMainBanner
            title1="지금은 내 친구"
            title2="자랑하는 시간!"
            descript="나만 보기 아까운 귀엽고 재미있는 반려동물 사진이 있다면 자랑하고 선물 받아가자"
            bg="xl:bg-mainBanner1_1 lg:bg-mainBanner1_2 md:bg-mainBanner1_3 sm:bg-mainBanner1_4"
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperMainBanner
            title1="같이 놀러 가자"
            descript="반려동물과 같이 가고 싶은 장소를 공유하자"
            bg="xl:bg-mainBanner2_1 lg:bg-mainBanner2_2 md:bg-mainBanner2_3 sm:bg-mainBanner2_4"
          />
        </SwiperSlide>
      </Swiper>

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 w-[1250px] flex items-center justify-between">
        <button ref={prevElRef} type="button">
          <img src={leftButton} />
        </button>
        <button ref={nextElRef} type="button">
          <img src={rightButton} />
        </button>
      </div>
    </div>
  );
}

export default MainBanner;
