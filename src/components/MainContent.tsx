import React from 'react';
import { useApp } from '../contexts/AppContext';
import TaskTable from './TaskTable';
import Dashboard from './Dashboard';
import Goals from './Goals';
import Documents from './Documents';
import CalendarView from './CalendarView';
import Automations from './Automations';
import Settings from './Settings';

const MainContent = () => {
  const { activeTab } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TaskTable />;
      case 'goals':
        return <Goals />;
      case 'docs':
        return <Documents />;
      case 'calendar':
        return <CalendarView />;
      case 'automations':
        return <Automations />;
      case 'settings':
        return <Settings />;
      default:
        return <TaskTable />;
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default MainContent;