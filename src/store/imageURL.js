import { create } from 'zustand';

const imageURL = (set) => ({
  profileURL: localStorage.getItem('profileURL') || '',

  setProfileURL: (url) => {
    set({ profileURL: url });
    localStorage.setItem('profileURL', url);
  },
  clearProfileURL: () => {
    set({ profileURL: '' });
    localStorage.removeItem('profileURL');
  },
});

const useImageURL = create(imageURL);

export default useImageURL;
