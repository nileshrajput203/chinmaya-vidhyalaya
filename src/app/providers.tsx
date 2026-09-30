import React from 'react';
import { ToastProvider } from '../context/ToastContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <React.StrictMode>
      <ToastProvider>
        {children}
      </ToastProvider>
    </React.StrictMode>
  );
};

