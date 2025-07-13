import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import TaskTable from './components/TaskTable';

function App() {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-white dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNavigation />
          <TaskTable />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;