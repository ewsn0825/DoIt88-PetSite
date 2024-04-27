import useRegister from '@/store/registerStore';
import pb from '@/api/pocketbase';
import toast from 'react-hot-toast';

function FormInput({
  type = 'text',
  label,
  isNecessary = false,
  id,
  placeholder,
  isBtn = false,
  ...restProps
}) {
  const {
    email,
    nickname,
    isEmailValid,
    isNicknameValid,
    setIsEmailDataValid,
    setIsNicknameDateValid,
  } = useRegister();

  const handleEmailDataValid = async (e) => {
    e.preventDefault();
    if (isEmailValid) {
      try {
        
        const records = await pb.collection('users').getFullList({
          filter: `(email='${email}')`,
        });

        if (records.length === 0) {
          setIsEmailDataValid(true);
         
          toast.success('사용 가능한 아이디 입니다.', {
            duration: 2000,
          });
        } else {
          setIsEmailDataValid(false);
          toast.error('이미 사용 중인 아이디 입니다.', {
            duration: 2000,
          });      
        }
     
      } catch (error) {
        console.log('오류', error.response);
      }
    } else {
      toast.success('이메일을 형식에 맞게 입력해주세요', {
        icon: '🙏',
        duration: 2000,
      });
    }
  };

  const handleNicknameDataValid = async (e) => {
    e.preventDefault();
    if (isNicknameValid) {
      try {
        const records = await pb.collection('users').getFullList({
          filter: `(nickname='${nickname}')`,
        });

        if (records.length === 0) {
          setIsNicknameDateValid(true)
         
          toast.success('사용 가능한 닉네임 입니다.', {
            duration: 2000,
          });
        } else {
          setIsNicknameDateValid(false)
          toast.error('이미 사용 중인 닉네임 입니다.', {
            duration: 2000,
          });      
        }
        
      } catch (error) {
        console.log('오류', error.response);
      }
    }else {
      toast.success('닉네임을 형식에 맞게 입력해주세요', {
        icon: '🙏',
        duration: 2000,
      });
    }
  };

  return (
    <>
      <div
        className={`${
          isBtn
            ? 'my-6 flex flex-row justify-between items-center'
            : 'my-6 flex flex-row justify-start gap-2 items-center'
        }`}
      >
        <label htmlFor={id} className="w-[150px] py-3 inline-block">
          <span className="font-semibold text-lg relative">
            {label}
            {isNecessary ? (
              <span className="text-[#FF483D] inline-block absolute -top-3 -right-3">
                *
              </span>
            ) : (
              ''
            )}
          </span>
        </label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="border w-[400px] py-3 outline-none pl-4 border-[#A6A6A6] rounded-lg text-lg text-black focus:border focus:border-primary"
          {...(isNecessary && { required: true })}
          {...restProps}
        />
        {isBtn ? (
          <button
            type="button"
            className="rounded-xl  text-primary font-medium text-xl px-14 py-3 border-primary border hover:bg-primary hover:text-white"
            onClick={
              id === 'email' ? handleEmailDataValid : handleNicknameDataValid
            }
          >
            중복확인
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default FormInput;
