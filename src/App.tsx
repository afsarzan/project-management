import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import MainContent from './components/MainContent';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <div className="flex h-screen bg-white dark:bg-gray-900">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNavigation />
            <MainContent />
          </div>
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;