import { motion } from "framer-motion";

interface NotificationProps {
  status: "failure" | "success" | "none";
  message: string;
}

const successIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    fill="none"
    viewBox="0 0 20 21"
  >
    <path
      fill="#fff"
      d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z"
    />
  </svg>
);

export default function Notification({ status, message }: NotificationProps) {
  return (
    <motion.div
      className="notification"
      transition={{ duration: 0.5, type: "tween", stiffness: 100 }}
      initial={{ opacity: 0, y: -100, x: "50%" }}
      animate={{ opacity: 1, y: 0, x: "50%" }}
      exit={{ opacity: 0, y: -100, x: "50%" }}
    >
      <div className="notification__title">
        <div className="notification__icon">{successIcon}</div>
        <h2 className="notification__heading">
          {status === "success" ? "Message Sent!" : "Error occurred"}
        </h2>
      </div>
      <p className="notification__message">{message}</p>
    </motion.div>
  );
}
