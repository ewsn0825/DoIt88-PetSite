import prevRef from '@/assets/icon/mainbanner-left.svg';
import nextRef from '@/assets/icon/mainbanner-right.svg';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import { useState, useEffect, useRef } from 'react';
import pb from '@/api/pocketbase';
import RecommendItem from './RecommendItem';

function SwiperRecommend() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getContents() {
      setIsLoading(true);
      try {
        const record = await pb.collection('contents').getList(1, 30, {
          sort: '-created',
        });
        setData(record);
        setIsLoading(false);
      } catch (error) {
        if (!(error in DOMException)) {
          console.error();
          setIsLoading(false);
        }
      }
    }

    getContents();
  }, []);

  return (
    <>
      <div className="max-w-full min-w-[1120px] relative">
        <div className="absolute top-1/2 -translate-y-[45px] left-1/2 -translate-x-1/2 z-20 w-[1038px] flex items-center justify-between">
          <button className="w-[54px] h-[54px]" ref={leftRef} type="button">
            <img src={prevRef} />
          </button>
          <button className="w-[54px] h-[54px]" ref={rightRef} type="button">
            <img src={nextRef} />
          </button>
        </div>

        <Swiper
          slidesPerView={3}
          loop={true}
          spaceBetween={27}
          pagination={{
            type: 'fraction',
          }}
          modules={[Navigation]}
          navigation={{
            prevEl: leftRef.current, // 이전 버튼
            nextEl: rightRef.current, // 다음 버튼
          }}
          onBeforeInit={(swiper) => {
            // 초기 설정
            swiper.params.navigation.prevEl = leftRef.current;
            swiper.params.navigation.nextEl = rightRef.current;
            swiper.navigation.update();
          }}
          className="mySwiper max-w-[1000px]"
        >
          {!isLoading &&
            data?.items?.map((item) => (
              <SwiperSlide key={item.id}>
                <RecommendItem item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}

export default SwiperRecommend;
