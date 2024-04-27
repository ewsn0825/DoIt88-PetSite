// import { useState } from 'react';
import search from '@/assets/icon/search.svg';
import close from '@/assets/icon/close.svg';
import useSearch from '@/store/searchStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


function SearchForm() {
  const { searchText, setSearchText, setSearchStorage } =
    useSearch();
  // const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const handleSendData = (e) => {
    e.preventDefault();
    if (searchText !== '') {
      setSearchText(searchText.replace(/\s/g, ''));
      setSearchStorage(searchText.replace(/\s/g, ''));
      setSearchText('');
      navigate('/search');
    } else {
      toast.success(`검색어를 입력해주세요`, {
        icon: '🙏',
        duration: 1000,
      });
      return;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value; // 입력 값에서 모든 공백을 제거합니다
    setSearchText(value);
  };

 

  const clearInput = () => {
    // e.target.value = '';
    setSearchText('');
  };

 

  return (
    <>
      <form
        className="searchForm relative flex flex-shrink-0 flex-nowrap"
        onSubmit={handleSendData}
      >
        <label htmlFor="allSearch" className="sr-only">
          통합검색
        </label>
        <input
          type="search"
          name=""
          id="allSearch"
          placeholder="통합 검색"
          required
          value={searchText}
       
          onChange={handleInputChange}
        
          className="border border-[#5956E9] rounded-3xl w-[240px] px-16  py-2 outline-none text-lg"
        />

        {searchText && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute top-3 right-5"
          >
            <img src={close} alt="내용 초기화 버튼" className="w-5 h-5" />
          </button>
        )}

        <button type="submit" onClick={handleSendData}>
          <img
            src={search}
            alt="검색 버튼"
            className="w-[26px] h-[26px] absolute top-3 left-4"
          />
        </button>
      </form>
    </>
  );
}

export default SearchForm;
