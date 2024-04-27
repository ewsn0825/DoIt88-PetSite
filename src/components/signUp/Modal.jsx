import Dialog from './Dialog';
import arrow from '@/assets/icon/arrow.svg';
import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ServiceAgreement from './Agreement/ServiceAgreement';
import MarketingAgreement from './Agreement/MarketingAgreement';
import PrivacyPolicy from './Agreement/PrivacyPolicy';

function Modal({ headline, id }) {
  //모달
  const opennerRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    opennerRef.current.focus();
  };
  return (
    <div>
      <motion.button
        type="button"
        ref={opennerRef}
        whileHover={{ scale: 1.04 }}
        onClick={handleOpen}
        className="text-primary flex"
      >
        <span>내용보기</span>
        <span>
          <img src={arrow} alt="화살표 이미지" className="inline-block ml-1" />
        </span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <Dialog type="rotate" onClose={handleClose}>
            <Dialog.Head>
              <h3 className="DialogHeadline">{headline}</h3>
            </Dialog.Head>
            <Dialog.Body>
              <div className="border border-[#C4C4C4] rounded-10 m-6 p-5">
                {id === 'service' ? (
                  <ServiceAgreement />
                ) : id === 'privacy' ? (
                  <PrivacyPolicy />
                ) : (
                  <MarketingAgreement />
                )}
              </div>
            </Dialog.Body>
            <Dialog.CloseButton onClose={handleClose} />
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Modal;
