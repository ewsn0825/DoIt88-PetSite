import CommunityListPost from './SearchCommunityListPost';


function SearchCommunityList() {
 

  return (
    <div className="flex justify-center">
      <div>
        <div className="w-[1015px] flex-col justify-center items-center py-[40px]">
          <h1 className="text-center text-black text-[28px] font-[700] mb-[50px]">
            커뮤니티
          </h1>
          <CommunityListPost />
        </div>
      </div>
    </div>
  );
}

export default SearchCommunityList;
