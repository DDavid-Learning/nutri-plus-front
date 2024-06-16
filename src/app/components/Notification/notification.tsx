// Notification.tsx
import React, { useEffect, useState } from 'react';
import './notifications.scss'

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [show, setShow] = useState(true);
  const alertType = type === 'success' ? 'alert-success' : 'alert-danger';

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className={`alert ${alertType} alert-dismissible fade show notification`} role="alert">
      {message}
      <button type="button" className="btn-close" onClick={() => { setShow(false); onClose(); }} aria-label="Close"></button>
    </div>
  );
}

export default Notification;