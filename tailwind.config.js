/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        // suit: ['SUIT Variable'],
        pre: ['Pretendard'],
      },
      colors: {
        primary: '#5956E9',
        primaryContainer: '#E2DFFF',
        secondary: '#FFDC60',
        tertiary: '#FFBAC7',
        content: '#747474',
        black: '#1E1E1E',
        error: '#FF483D',
      },
      backgroundImage: {
        prev: "url('/src/assets/icon/arrow_back.svg')",
        next: "url('/src/assets/icon/arrow_forward.svg')",
        bookmark: "url('/src/assets/icon/bookmark.svg')",
        bookmarkCheck: "url('/src/assets/icon/bookmark_check.svg')",
        like: "url('/src/assets/icon/like.svg')",
        likeCheck: "url('/src/assets/icon/like_check.svg')",
        comment: "url('/src/assets/icon/comment.svg')",
        share: "url('/src/assets/icon/share.svg')",
        mainBanner1_1: "url('/src/assets/banner/banner@1920w.png')",
        mainBanner1_2: "url('/src/assets/banner/banner@1720w.png')",
        mainBanner1_3: "url('/src/assets/banner/banner@1420w.png')",
        mainBanner1_4: "url('/src/assets/banner/banner@1120w.png')",
        mainBanner2_1: "url('/src/assets/banner/banner2@1920w.png')",
        mainBanner2_2: "url('/src/assets/banner/banner2@1720w.png')",
        mainBanner2_3: "url('/src/assets/banner/banner2@1420w.png')",
        mainBanner2_4: "url('/src/assets/banner/banner2@1120w.png')",
      },
      borderRadius: {
        10: '10px',
      },
      screens: {
        xl: { min: '1720px' },

        lg: { min: '1420px', max: '1720px' },

        md: { min: '1120px', max: '1420px' },

        sm: { max: '1120px' },
      },
    },
  },
  plugins: [],
};
