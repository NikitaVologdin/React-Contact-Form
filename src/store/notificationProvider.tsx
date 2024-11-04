import { ReactNode, useState, useEffect } from "react";
import { type INotification, notificationContext } from "./notificationContext";

interface props {
  children: ReactNode;
}

export default function NotificationProvider({ children }: props) {
  const [notification, setNotification] = useState<INotification>({
    status: "none",
    message: "",
  });
  const [isNotificationShown, setIsNotificationShown] = useState(false);

  useEffect(() => {
    if (notification.status !== "none") {
      setIsNotificationShown(true);
      const timeOut = setTimeout(() => {
        setIsNotificationShown(false);
        setNotification({ status: "none", message: "" });
      }, 3500);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [notification]);

  return (
    <notificationContext.Provider
      value={{
        notification,
        setNotification,
        isNotificationShown,
        setIsNotificationShown,
      }}
    >
      {children}
    </notificationContext.Provider>
  );
}
