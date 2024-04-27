import pb from '@/api/pocketbase';
import { useState } from 'react';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import photo from '@/assets/icon/photo.svg';

function CommunityNew() {
  const navigate = useNavigate();

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const titleValue = titleRef.current.value;
    const contentValue = contentRef.current.value;
    const imageValue = imageRef.current.files;

    const formData = new FormData();

    formData.append('title', titleValue);
    formData.append('content', contentValue);
    formData.set('user', pb.authStore.model.id);
    if (imageValue.length > 0) {
      formData.append('image', imageValue[0]);
    }

    try {
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

      const newFeed = await pb.collection('community').create(formData);
      await pb.collection('community').getOne(newFeed.id);
      navigate(`/community/detail/${newFeed.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    titleRef.current.value = '';
    contentRef.current.value = '';
    imageRef.current.value = '';
    setFileImage(null);
  };

  const [fileImage, setFileImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const fileImage = { image: URL.createObjectURL(file), label: file.name };
    setFileImage(fileImage);
  };

  return (
    <div className="mx-auto max-w-[750px] flex-col my-10">
      <h2 className="text-center font-bold text-[28px] pb-14">글쓰기</h2>

      <form
        encType="multipart/form-data"
        className="flex flex-col"
        ref={formRef}
        onSubmit={handleRegister}
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
                  className="h-[110px] w-[110px]"
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
            등록
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommunityNew;
