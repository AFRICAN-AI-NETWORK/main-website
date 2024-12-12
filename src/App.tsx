import React from 'react';

import { ToastProvider } from '@/components/ui/toast';
import AppRouter from './router';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  );
};

export default App;
