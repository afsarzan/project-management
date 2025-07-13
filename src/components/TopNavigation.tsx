import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Search, 
  Filter, 
  Plus, 
  Bell, 
  ChevronDown,
  MoreHorizontal,
  Grid3X3,
  List,
  Calendar,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';

const TopNavigation = () => {
  const { viewMode, setViewMode, activeTab } = useApp();
  const { theme, setTheme, isDark } = useTheme();

  const handleNewTask = () => {
    // This will be handled by a modal in the main content area
    const event = new CustomEvent('openNewTaskModal');
    window.dispatchEvent(event);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return Sun;
      case 'dark': return Moon;
      default: return Monitor;
    }
  };

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search tasks, projects, or people..."
              className="pl-10 pr-4 py-2 w-80 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* New Task Button */}
          <button 
            onClick={handleNewTask}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New {activeTab === 'tasks' ? 'Task' : activeTab === 'goals' ? 'Goal' : activeTab === 'docs' ? 'Document' : 'Item'}</span>
          </button>

          {/* View Toggle */}
          {(activeTab === 'tasks' || activeTab === 'calendar') && (
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700'
              }`}
            >
              <Calendar className="h-4 w-4" />
            </button>
          </div>
          )}

          {/* Theme Toggle */}
          <button 
            onClick={cycleTheme}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            title={`Current theme: ${theme}`}
          >
            {React.createElement(getThemeIcon(), { className: "h-5 w-5" })}
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium leading-none">JD</span>
            </button>
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;