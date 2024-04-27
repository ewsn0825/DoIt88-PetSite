import SmallButton from './SmallButton';

function SwiperMainBanner({ title1, title2 = '', descript, bg }) {
  return (
    <div
      className={`w-full relative flex flex-col justify-center items-center ${bg} h-[500px] bg-no-repeat z-20`}
    >
      <div className="absolute w-[1120px] px-7">
        <p className="flex flex-col gap-2">
          <strong className="font-extrabold text-6xl">
            {title1}
            <br />
            {title2}
          </strong>
          {descript}
        </p>
        <SmallButton path="/event">상세보기</SmallButton>
      </div>
    </div>
  );
}

export default SwiperMainBanner;
