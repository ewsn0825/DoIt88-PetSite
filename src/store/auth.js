import pb from '@/api/pocketbase';
import { uploadPngFile } from '@/utils/setFiles';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
// import useImage from './imageUploadStore';

const USER_COLLECTION = 'users';

// const { selectedImageFile } = useImage();

const initialAuthState = {
  isAuth: false,
  user: null,
  token: '',
};

const authStore = (set) => ({
  ...initialAuthState,

  /* Pb SDK를 사용한 회원가입 */
  signUp: async (registerUser) => {
    return await pb.collection(USER_COLLECTION).create(registerUser);
  },

  /* Pb SDK를 사용한 로그인 */
  signIn: async (userID, password) => {
    const authData = await pb
      .collection(USER_COLLECTION)
      .authWithPassword(userID, password);

    const { isValid, model, token } = pb.authStore;

    set(
      (state) => ({
        ...state,
        isAuth: isValid,
        user: model,
        token,
      }),
      false,
      '/singIn'
    );

    return authData;
  },

  signInGoogle: async () => {
    const authData = await pb
      .collection(USER_COLLECTION)
      .authWithOAuth2({ provider: 'google' });

    const { isValid, model, token } = pb.authStore;

    set(
      (state) => ({
        ...state,
        isAuth: isValid,
        user: model,
        token,
      }),
      false,
      '/singIn'
    );

    if (authData.meta.isNew === true) {
      const formData = new FormData();

      await uploadPngFile().then(({ baseImage, baseImageFile }) => {
        formData.append('profile', baseImageFile);
      });

      if (authData.record.nickname === '') {
        formData.append('nickname', authData.meta.name);
      }

      formData.append('emailVisibility', true);

      formData.append('serviceCheck', true);
      formData.append('privacyCheck', true);
      formData.append('ageCheck', true);
      formData.append('marketingCheck', false);

   

      await pb.collection('users').update(authData.record.id, formData);
    }

    return authData;
  },

  kakaoLogin: async () => {
    try {
      const authData = await pb.collection(USER_COLLECTION).authWithOAuth2({
        provider: 'kakao',
      });

    
      if (authData.meta.isNew === true) {
        const formData = new FormData();

        if (authData.record.nickname === '') {
          formData.append('nickname', authData.meta.username);
        }

        await uploadPngFile().then(({ baseImage, baseImageFile }) => {
          formData.append('profile', baseImageFile);
        });

        formData.append('emailVisibility', true);

        formData.append('serviceCheck', true);
        formData.append('privacyCheck', true);
        formData.append('ageCheck', true);
        formData.append('marketingCheck', false);

        await pb.collection('users').update(authData.record.id, formData);
      }

      return authData;
    } catch (error) {
      console.log(error.response);
      throw new Error(error.message);
    }
  },

  /* Pb SDK를 사용한 로그아웃 */
  signOut: async () => {
    const response = await pb.authStore.clear();

    set(
      (state) => ({
        ...state,
        ...initialAuthState,
      }),
      false,
      '/signOut'
    );

    return response;
  },

  signOutGoogle: async () => {
  
    const response = await pb.authStore.clear();



    return response;
  },

  /* Pb SDK를 사용한 회원탈퇴 */
  // withDrawal: async (recordId) => {
  //   const response = await pb.collection(USER_COLLECTION).delete(recordId);

  //   set(
  //     (state) => ({
  //       ...state,
  //       ...initialAuthState,
  //     }),
  //     false,
  //     'auth/withDrawal'
  //   );

  //   return response;
  // },
});

const useAuthStore = create(devtools(authStore));

export default useAuthStore;
