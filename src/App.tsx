import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import MainContent from './components/MainContent';

import { AppProvider, useApp } from './contexts/AppContext';

const AppContent = () => {
  const { isSidebarCollapsed } = useApp();

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-60'}`}>
        <TopNavigation />
        <MainContent />
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;