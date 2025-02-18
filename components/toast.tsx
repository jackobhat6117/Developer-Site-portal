import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
  status: string;
  message: string;
}

export const ToastHandler = ({ status, message }: ToastProps) => {
  if (status === "success") {
    toast.success(message);
  } else if (status === "error") {
    toast.error(message);
  }

  return <ToastContainer />;
};
