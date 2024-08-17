import React, { useEffect, useState } from 'react';
import '../styles/DialogBox.css';

const DialogBox = ({ message, show, onClose }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose(); 
      }, 5000);  

      return () => clearTimeout(timer); 
    }
  }, [show, onClose]);

  if (!isVisible) return null;

  return (
    <div className="dialog-box">
      <p>{message}</p>
    </div>
  );
};

export default DialogBox;
