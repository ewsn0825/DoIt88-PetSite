import { create } from 'zustand';

const searchStore = (set) => ({
  searchText: '',
  communityData: '',
  contentData: '',
  isLoading: false,
  setSearchText: (searchText) => set({ searchText }),
  setCommunityData: (communityData) => set({ communityData }),
  setContentData: (contentData) => set({ contentData }),
  setIsLoading: (isLoading) => set({ isLoading }),

  searchStorage: localStorage.getItem('searchStorage'),

  setSearchStorage: (searchText) => {
    set({ searchStorage: searchText });
    localStorage.setItem('searchStorage', searchText);
  },
  clearSearchStorage: () => {
    set({ searchStorage: '' });
    localStorage.removeItem('searchStorage');
  },
});

const useSearch = create(searchStore);

export default useSearch;
