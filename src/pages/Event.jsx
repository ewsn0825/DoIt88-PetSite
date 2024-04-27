import EventBanner from '@/components/event/EventBanner';

function Event() {
  return (
    <div className="flex flex-col m-auto items-center gap-11 my-10">
      <h2 className="text-black text-[28px] font-bold">이벤트</h2>

      <EventBanner />
    </div>
  );
}

export default Event;
