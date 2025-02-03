import { motion } from 'framer-motion';

const Shake = ({ children }) => {
  const shakeVariants = {
    shake: {
      x: [-10, 10, -10, 10, 0], // Lắc qua lại
      transition: { duration: 0.5 }, // Thời gian của hiệu ứng
    },
  };

  return (
    <motion.div animate="shake" variants={shakeVariants}>
      {children}
    </motion.div>
  );
};

export default Shake;
