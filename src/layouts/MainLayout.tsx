import NavBar from '@/components/layout/NavBar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="min-h-dvh pt-[200px] xl:pt-[100px] 2xl:pt-[150px]">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
