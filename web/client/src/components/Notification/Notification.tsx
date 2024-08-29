import React from "react";
import "./notification.scss";

interface NotificationProps {
  message: string;
  type: string;
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
