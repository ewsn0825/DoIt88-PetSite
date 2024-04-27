import RelatedSite from '@/components/footer/RelatedSite';

function Footer() {
  // 현재(오늘) 년도를 화면에 출력하는 상태를 설정
  // const [currentYear] = useState(() => new Date().getFullYear());

  return (
    <footer className="bg-[#F4F4F4] text-black px-3 flex flex-col gap-4 font-pre text-center font-semibold py-8">
      <small>
        &copy;
        <a href="/" className="hover:underline decoration-solid">
          GEPPETTO
        </a>
        &nbsp; | &nbsp;ALL RIGHT RESERVED.
      </small>

      <RelatedSite />
    </footer>
  );
}

export default Footer;
