import { create } from 'zustand';

const imageStore = (set) => ({
  selectedImageURL: null,
  selectedImageFile: null,
  isChangeImage: false,

  setSelectedImageURL: (selectedImageURL) => set({ selectedImageURL }),
  setSelectedImageFile: (selectedImageFile) => set({ selectedImageFile }),
  setIsChangeImage: (isChangeImage) => set({ isChangeImage }),
});

const useImage = create(imageStore);

export default useImage;
