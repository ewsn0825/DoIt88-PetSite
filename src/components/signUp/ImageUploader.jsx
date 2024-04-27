import useImage from '@/store/imageUploadStore';
import { uploadPngFile } from '@/utils/setFiles';
import { useEffect } from 'react';

function ImageUploader() {
  const {
    selectedImageURL,
    isChangeImage,
    setSelectedImageURL,
    setSelectedImageFile,
    setIsChangeImage,
  } = useImage();

  useEffect(() => {
    uploadPngFile().then(({ baseImage, baseImageFile }) => {
      
      setSelectedImageURL(baseImage);
      setSelectedImageFile(baseImageFile);
     
    });


  }, []);

  const handleImageUpload = async (e) => {
    setIsChangeImage(true);
    const file = e.target.files[0];

    setSelectedImageURL(URL.createObjectURL(file));

    setSelectedImageFile(file);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.click();
    }
  };

  return (
    <div className="flex gap-2 my-6">
      <p className="w-[150px] py-3 inline-block">
        <span className="font-semibold text-lg relative">
          프로필 사진
          {/* <span className="text-[#FF483D] inline-block absolute -top-3 -right-3">
            *
          </span> */}
        </span>
      </p>
      {selectedImageURL ? (
        <img
       
          src={selectedImageURL}
          alt="선택된 이미지"
          className="h-[130px] w-[130px]"
        />
      ) : (
        <div className="h-[130px] w-[130px] bg-[#D9D9D9] rounded-md" />
      )}

      {/* type이 file인 input은 label을 커스텀 하여 접근 */}
      <label
        htmlFor="profile"
        className={`rounded-xl text-primary font-medium text-xl px-14 py-3 border-primary border h-[55px]
        ${
          selectedImageURL
            ? 'hover:bg-primary hover:text-white'
            : 'hover:bg-primary hover:text-white focus:bg-primary focus:text-white'
        }`}
        tabIndex={0}
        onKeyPress={handleEnterPress}
      >
        {isChangeImage ? '사진 변경' : '사진 첨부'}
      </label>
      <input
        type="file"
        id="profile"
        accept="*.jpg,*.png,*.jpeg,*.webp,*.avi"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default ImageUploader;
