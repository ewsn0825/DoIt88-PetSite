import Recommend from '@/components/MainRecommend/Recommend';
import MainBanner from '@/components/home/MainBanner';
import PopularPosts from '@/components/home/Posts';

function Home() {
  return (
    <div>
      <MainBanner />
      <Recommend />
      <PopularPosts />
    </div>
  );
}

export default Home;
