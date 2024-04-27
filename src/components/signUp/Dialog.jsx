import { motion } from 'framer-motion';
import Backdrop from './Backdrop';
import { useLayoutEffect, useRef } from 'react';
import closeButton from '@/assets/icon/closeModal.svg';

const dropInOut = {
  from: { y: '-100vh' },
  to: { y: 0 },
  exit: { y: '100vh' },
};

const dropScaleInOut = {
  from: { y: '-100vh', scale: 0 },
  to: { y: 0, scale: 1 },
  exit: { y: '100vh', scale: 0 },
};

const dropRotateScaleInOut = {
  from: { y: '100vh', scale: 0 },
  to: { y: 0, scale: 1 },
  exit: {
    y: '-100vh',
    scale: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const animationConfig = {
  type: 'spring',
  mass: 6,
  stiffness: 700,
  damping: 100,
};

// /* COMPONENT ---------------------------------------------------------------- */

// function Dialog({
//   type = 'rotate' /* drop, scale, rotate */,
//   children,
//   isBackdropClickClose = true,
//   onClose,
// }) {
//   const dialogRef = useRef(null);

//   useLayoutEffect(() => {
//     const dialog = dialogRef.current;
//     const focusable = dialog.querySelectorAll(
//       'button:not([disabled]), input:not([disabled]), select:not([disabled]), div [tabindex]:not([tabindex="-1"])'
//     );
//     const firstFocusableElement = focusable[0];
//     const lastFocusableElement = focusable[focusable.length - 1];

//     const handleKeyDownTrap = (e) => {
//       if (e.key === 'Tab' || e.keyCode === 9) {
//         if (e.shiftKey) {
//           /* shift + tab */ if (
//             document.activeElement === firstFocusableElement
//           ) {
//             e.preventDefault();
//             lastFocusableElement.focus();
//           }
//         } /* tab */ else {
//           if (document.activeElement === lastFocusableElement) {
//             e.preventDefault();
//             firstFocusableElement.focus();
//           }
//         }
//       }

//       if (e.key === 'Escape' || e.keyCode === 27) {
//         onClose();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDownTrap);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDownTrap);
//     };
//   }, [onClose]);

//   const handleStopPropagation = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <Backdrop onClose={isBackdropClickClose ? onClose : null}>
//       <motion.div
//         ref={dialogRef}
//         className="box-border flex flex-col z-[100] fixed w-[750px] h-[500px] bg-white top-[25%] left-[30.5%] rounded-10"
//         // drag
//         // dragConstraints={{
//         // top:
//         //10,left:
//         //10,right:
//         //10,bottom:
//         //10}}
//         variants={
//           type === 'scale'
//             ? dropScaleInOut
//             : type === 'rotate'
//             ? dropRotateScaleInOut
//             : dropInOut
//         }
//         initial="from"
//         animate="to"
//         exit="exit"
//         transition={animationConfig}
//         whileTap={{ scale: 0.95 }}
//         onClick={handleStopPropagation}
//       >
//         {children}
//       </motion.div>
//     </Backdrop>
//   );
// }

// Dialog.Head = function DialogHead({ children }) {
//   return (
//     <div className="flex justify-start text-2xl font-bold m-6">{children}</div>
//   );
// };

// Dialog.Body = function DialogBody({ children }) {
//   return <div className="DialogBody">{children}</div>;
// };

// Dialog.CloseButton = function DialogCloseButton({ onClose, label = 'close' }) {
//   return (
//     <button
//       type="button"
//       className="DialogCloseButton absolute top-5 right-5"
//       aria-label={label}
//       title={label}
//       onClick={onClose}
//     >
//       <img src={closeButton} alt="닫기 버튼 이미지" />
//     </button>
//   );
// };
// export default Dialog;

/* COMPONENT ---------------------------------------------------------------- */

function Dialog({
  type = 'drop' /* drop, scale, rotate */,
  children,
  isBackdropClickClose = true,
  onClose,
}) {
  const dialogRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const focusableElements = dialog.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    const handleKeyboardTrap = (event) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          // Shift + Tab
          if (
            document.activeElement === firstFocusableElement ||
            !dialog.contains(document.activeElement)
          ) {
            event.preventDefault();
            if (lastFocusedElementRef.current) {
              lastFocusedElementRef.current.focus();
            } else {
              firstFocusableElement.focus();
            }
          }
        } else {
          // Tab
          if (
            document.activeElement === lastFocusableElement &&
            dialog.contains(document.activeElement)
          ) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      } else if (event.key === 'Escape') {
        // ESC key
        event.preventDefault();
        onClose(); // 모달 창 닫기
      }
    };

    document.addEventListener('keydown', handleKeyboardTrap);

    return () => {
      document.removeEventListener('keydown', handleKeyboardTrap);
    };
  }, []);

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Backdrop onClose={isBackdropClickClose ? onClose : null}>
      <motion.div
        ref={dialogRef}
        className="box-border fixed flex flex-col z-[100]  w-[750px] bg-white  top-[15%] left-[30%]  rounded-10"
        variants={
          type === 'scale'
            ? dropScaleInOut
            : type === 'rotate'
            ? dropRotateScaleInOut
            : dropInOut
        }
        initial="from"
        animate="to"
        exit="exit"
        transition={animationConfig}
        whileTap={{ scale: 0.95 }}
        onClick={handleStopPropagation}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
}

Dialog.Head = function DialogHead({ children }) {
  return (
    <div className="flex justify-start text-2xl font-bold m-6">{children}</div>
  );
};

Dialog.Body = function DialogBody({ children }) {
  return <div className="DialogBody">{children}</div>;
};

Dialog.CloseButton = function DialogCloseButton({ onClose, label = 'close' }) {
  return (
    <button
      type="button"
      className="DialogCloseButton absolute top-5 right-5"
      aria-label={label}
      title={label}
      onClick={onClose}
    >
      <img src={closeButton} alt="닫기 버튼 이미지" />
    </button>
  );
};

export default Dialog;
