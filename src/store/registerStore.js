import { create } from 'zustand';

const registerStore = (set) => ({
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  isEmailValid: false,
  isPasswordValid: false,
  isPasswordConfirmValid: false,
  isNicknameValid: false,
  isEmailDateValid: false,
  isNicknameDateValid: false,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setPasswordConfirm: (passwordConfirm) => set({ passwordConfirm }),
  setNickname: (nickname) => set({ nickname }),
  setIsEmailValid: (isEmailValid) => set({ isEmailValid }),
  setIsPasswordValid: (isPasswordValid) => set({ isPasswordValid }),
  setIsPasswordConfirmValid: (isPasswordConfirm) => set({ isPasswordConfirm }),
  setIsNicknameValid: (isNicknameValid) => set({ isNicknameValid }),
  setIsEmailDataValid: (isEmailDateValid) => set({ isEmailDateValid }),
  setIsNicknameDateValid: (isNicknameDateValid) => set({ isNicknameDateValid }),
});

const useRegister = create(registerStore);

export default useRegister;
