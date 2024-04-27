import { motion } from 'framer-motion';

function Backdrop({ children, onClose }) {
  return (
    <motion.div
      onClick={onClose}
      className="fixed z-50 top-0 left-0 w-screen h-screen bg-gray-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.96 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export default Backdrop;
