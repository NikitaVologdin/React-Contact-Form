import { createContext } from "react";

export interface INotification {
  status: "failure" | "success" | "none";
  message: string;
}

export interface INotificationContext {
  notification: INotification;
  setNotification: (notification: INotification) => void;
  isNotificationShown: boolean;
  setIsNotificationShown: (isNotificationShown: boolean) => void;
}

export const notificationContext = createContext<INotificationContext>({
  notification: { status: "none", message: "" },
  setNotification: () => {},
  isNotificationShown: false,
  setIsNotificationShown: () => {},
});
