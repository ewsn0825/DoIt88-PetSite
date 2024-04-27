import pb from '@/api/pocketbase';
import { getPbImageURL } from '@/utils';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import photo from '@/assets/icon/photo.svg';

const resetData = {
  title: '',
  content: '',
  image: null,
};

function CommunityEdit() {
  const { dataId } = useParams();
  const navigate = useNavigate();

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    async function getCommunity() {
      // 등록되어있던 정보 가져오기
      try {
        const community = await pb.collection('community').getOne(dataId);
        const { title, content, image } = community;
        resetData.title = titleRef.current.value = title;
        resetData.content = contentRef.current.value = content;

        const imageUrl = (resetData.image = getPbImageURL(community, 'image'));
        if (image) {
          setFileImage({ image: imageUrl, label: imageUrl });
        } else {
          setFileImage(null);
        }

        console.log(image);
      } catch (error) {
        if (!(error in DOMException)) {
          console.error();
        }
      }
    }

    getCommunity();
  }, [dataId]);

  // 업로드
  const handleUpdateRecord = async (e) => {
    e.preventDefault();

    const titleValue = titleRef.current.value;
    const contentValue = contentRef.current.value;
    const imageValue = imageRef.current.files;

    if (!titleValue || !contentValue) {
      toast('제목과 내용을 입력해주세요!', {
        icon: '😉',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });

      return;
    }

    // 수정된 데이터를 폼 데이터에 추가
    const formData = new FormData();

    formData.append('title', titleValue);
    formData.append('content', contentValue);
    if (imageValue.length > 0) {
      formData.append('image', imageValue[0]);
    }

    try {
      await pb.collection('community').update(dataId, formData);
      toast('수정되었습니다', {
        icon: '⚒',
      });
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  // 취소 시 뒤로 가기
  const handleReset = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // 이미지 업로드하기
  const [fileImage, setFileImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const fileImage = { image: URL.createObjectURL(file), label: file.name };
    setFileImage(fileImage);
  };

  return (
    <div className="mx-auto max-w-[750px] flex-col my-10">
      <h2 className="text-center font-bold text-[28px] pb-14">글 수정</h2>

      <form
        encType="multipart/form-data"
        className="flex flex-col"
        ref={formRef}
        onSubmit={handleUpdateRecord}
        onReset={handleReset}
      >
        <div className="border-b border-t-2 border-[#E6E6E6]">
          <div className="my-6 flex flex-row justify-start gap-2 items-start">
            <label htmlFor="title" className="w-[85px] py-3 inline-block">
              <span className="font-semibold text-lg relative">제목</span>
            </label>
            <input
              type="text"
              id="title"
              placeholder="제목을 입력해주세요"
              name="title"
              ref={titleRef}
              className={`border w-[720px] py-3 outline-none pl-4 border-[#A6A6A6] rounded-lg text-lg text-black focus:border focus:border-primary`}
            />
          </div>
          <div className="my-6 flex flex-row justify-start gap-2 items-start">
            <label htmlFor="detail" className="w-[85px] py-3 inline-block">
              <span className="font-semibold text-lg relative">내용</span>
            </label>
            <textarea
              type="text"
              id="detail"
              placeholder="본문을 입력해주세요"
              name="content"
              ref={contentRef}
              className="border w-[720px] p-3 outline-none border-[#A6A6A6] rounded-lg text-lg text-black focus:border focus:border-primary h-[510px] resize-none"
            ></textarea>
          </div>
          <div className="my-6 flex flex-row justify-start items-start">
            <p htmlFor="detail" className="w-[85px] py-3 inline-block">
              <span className="font-semibold text-lg relative">사진 첨부</span>
            </p>
            <div className="flex flex-row-reverse gap-2">
              {fileImage ? (
                <img
                  src={fileImage.image}
                  alt="Selected"
                  className="h-[110px] w-[110px] object-contain"
                />
              ) : (
                <div className="h-[110px] w-[110px] bg-[#D9D9D9] rounded-xl" />
              )}
              <label
                htmlFor="image"
                className="rounded-xl border-primary border h-[110px] w-[110px] flex justify-center items-center"
              >
                <img src={photo} className="w-14 h-14" />
              </label>
              <input
                type="file"
                id="image"
                accept="*.jpg,*.png,*.jpeg,*.webp,*.avif"
                name="image"
                className="hidden"
                ref={imageRef}
                onChange={handleUpload}
              />
            </div>
          </div>
        </div>

        <div className="flex mx-auto gap-7">
          <button
            type="reset"
            className="w-[186px] h-[50px] text-white font-medium rounded-xl text-lg block mt-14 bg-primaryContainer"
          >
            취소
          </button>
          <button
            type="submit"
            className="w-[186px] h-[50px] text-white font-medium rounded-xl text-lg block mt-14 bg-primary"
          >
            수정
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommunityEdit;
