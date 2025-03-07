import NavBar from '@/components/layout/NavBar';
import { ToastProvider } from '@/components/ui/toast';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <ToastProvider>
      <header>
        <NavBar />
      </header>

      <main className="min-h-dvh pt-[200px] xl:pt-[100px] 2xl:pt-[150px]">
        <Outlet />
      </main>
    </ToastProvider>
  );
};

export default AuthLayout;
