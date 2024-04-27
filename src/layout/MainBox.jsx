// import MoviesList from "@/components/MoviesList";
import MainNav from './MainNav';
import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <>
      <main className="bg-[#222223] font-suit">
        <MainNav />
        {/* <MoviesList/> */}
        <Outlet />
      </main>
    </>
  );
}

export default Main;
