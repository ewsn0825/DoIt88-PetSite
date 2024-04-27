import link from '@/assets/icon/link.svg';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

function UrlShare() {
  const currentUrl = window.location.href;

  return (
    <CopyToClipboard
      text={`${currentUrl}`}
      onCopy={() => toast.success('클립보드에 복사되었습니다!')}
    >
      <button
        type="button"
        className="w-14 h-14 rounded-full border flex justify-center align-middle bg-primary fill-white"
        aria-label="주소 복사하기"
      >
        <img src={link} className=" m-auto fill-white" aria-hidden />
      </button>
    </CopyToClipboard>
  );
}

export default UrlShare;
