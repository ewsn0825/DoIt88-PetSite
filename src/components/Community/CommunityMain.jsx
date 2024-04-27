import CommunityComment from './CommunityComment';
import BookMark from '@/components/button/Bookmark';
import LikeButton from '@/components/button/likeButton';
import ShareButton from '@/components/button/ShareButton';
import EditDelete from '@/components/button/EditDelete';
import pb from '@/api/pocketbase';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPbImageURL } from '@/utils';
import Comment from '../commentInput/Comment';
import Spinner from '../home/Spinner';

function CommunityMain() {
  const { dataId } = useParams();

  const authDataString = localStorage.getItem('pocketbase_auth');
  const authData = JSON.parse(authDataString);

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [profile, setProfile] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [user, setUser] = useState('');
  const [data, setData] = useState(null);
  const [created, setCreated] = useState('');

  // 데이터 가져오기
  useEffect(() => {
    const getCommunityItem = async () => {
      try {
        const data = await pb
          .collection('community')
          .getOne(dataId, { expand: 'user, comment, comment.user' });
        setData(data);
        const { title, content, created, expand, image } = data;
        setTitle(title);
        setContent(content);
        {
          image && setImage(getPbImageURL(data, 'image'));
        }
        setCreated(created);
        if (expand) {
          setProfile(getPbImageURL(expand.user, 'profile'));
          setCommentList(expand.comment);
          setUser(expand.user);
        }
        setIsLoading(true);
      } catch (error) {
        console.error(error);
      }
    };
    getCommunityItem();
  }, [dataId]);

  // 글 날짜 설정
  const [date, setDate] = useState();

  useEffect(() => {
    if (created) {
      let datetime = created.slice(0, 10);
      setDate(datetime);
    }
  }, [created]);

  return (
    <>
      <h2 className="sr-only">커뮤니티</h2>

      <div className="flex justify-center max-w-full my-10">
        <div className="flex-col max-w-[988px]">
          {!isLoading && (
            <div className="mx-auto">
              <Spinner />
            </div>
          )}
          {/* 작성자 */}
          {isLoading && data && (
            <div className="flex items-end justify-between">
              <figure className="flex items-center">
                <img
                  className="rounded-full w-[60px] h-[60px] mr-2 object-cover"
                  src={profile}
                  alt="프로필 사진"
                />
                <figcaption className="font-medium text-2xl text-primary">
                  {user.nickname}
                </figcaption>
              </figure>
              {authData && user.id === authData.model.id && (
                <EditDelete item={commentList} />
              )}
            </div>
          )}

          {/* 본문 */}
          {isLoading && data && (
            <div className="flex flex-col items-center border-b border-[#A6A6A6]">
              <div className="flex justify-between items-end py-6 w-full">
                <h3 className="text-black text-[32px] font-bold">{title}</h3>
                <time>{date}</time>
              </div>
              <div className="flex flex-col justify-center w-full gap-[22px] pb-[44px]">
                <p className="pt-6">{content}</p>
                {image && (
                  <img
                    src={image}
                    alt="첨부 이미지"
                    className="w-1/3 mx-auto"
                  />
                )}
              </div>

              {/* 아이콘 */}
              <div className="flex gap-11 mb-11">
                <BookMark className="bg-[#E6E6E6] rounded-full w-11 h-11 bg-cover bg-center bg-no-repeat bg-origin-content p-[7px]" />
                <LikeButton className="bg-[#E6E6E6] rounded-full w-11 h-11 bg-cover bg-center bg-no-repeat bg-origin-content p-[7px]" />
                <ShareButton
                  className="bg-[#E6E6E6] rounded-full w-11 h-11 bg-cover bg-center bg-no-repeat bg-origin-content p-[11px] pl-[7px] mb-1 title={title}
image={image}"
                />
              </div>
            </div>
          )}

          {/* 댓글 */}
          {isLoading && data && (
            <ul className="py-8">
              {commentList &&
                commentList?.map((item) => {
                  return (
                    <CommunityComment
                      key={item.id}
                      profile={item.expand.user}
                      userId={item.expand.user.id}
                      nickname={item.expand.user.nickname}
                      comments={item}
                      commentList={commentList}
                      setCommentList={setCommentList}
                    />
                  );
                })}
            </ul>
          )}

          {/* 댓글 작성 */}
          {isLoading && data && (
            <Comment
              dataId={dataId}
              comments={commentList}
              setCommentList={setCommentList}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CommunityMain;
