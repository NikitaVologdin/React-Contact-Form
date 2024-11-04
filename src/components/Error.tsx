import { AnimatePresence, motion } from "framer-motion";

interface props {
  isValid: boolean | null;
  error: string | null;
  id: string;
}
export default function Error({ isValid, error, id }: props) {
  return (
    <div
      id={id}
      className={`form-control__error-message error-message ${
        isValid === false ? "shown" : ""
      }`}
    >
      <AnimatePresence>
        {!isValid && (
          <motion.span
            transition={{ duration: 0.3, type: "tween", stiffness: 100 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
