import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeSelector from './ThemeSelector';
import { User, Bell, Palette, Shield, Database, Save, Download, Upload, Trash2 } from 'lucide-react';

const Settings = () => {
  const { currentUser, tasks, projects, goals, documents, events, automations } = useApp();
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'data', label: 'Data Management', icon: Database },
  ];

  const exportData = () => {
    const data = {
      tasks,
      projects,
      goals,
      documents,
      events,
      automations,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projectflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={currentUser.name}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              defaultValue={currentUser.email}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Role
            </label>
            <input
              type="text"
              defaultValue={currentUser.role}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { label: 'Task assignments', description: 'Get notified when tasks are assigned to you' },
            { label: 'Due date reminders', description: 'Receive reminders before tasks are due' },
            { label: 'Project updates', description: 'Stay informed about project changes' },
            { label: 'Goal progress', description: 'Get updates on goal completion' },
            { label: 'Comments and mentions', description: 'Be notified when someone mentions you' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{item.label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <ThemeSelector />
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy & Security</h3>
        <div className="space-y-4">
          {[
            { label: 'Two-factor authentication', description: 'Add an extra layer of security', enabled: false },
            { label: 'Activity logging', description: 'Keep track of account activity', enabled: true },
            { label: 'Data sharing', description: 'Share anonymous usage data to improve the app', enabled: true },
            { label: 'Email notifications', description: 'Receive security alerts via email', enabled: true },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{item.label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked={item.enabled}
                className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDataSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Export Data</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Download all your data in JSON format for backup or migration purposes.
            </p>
            <button
              onClick={exportData}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </button>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Import Data</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Import data from a previously exported backup file.
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <Upload className="h-4 w-4" />
              <span>Import Data</span>
            </button>
          </div>

          <div className="p-4 border border-red-200 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20">
            <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">Clear All Data</h4>
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              Permanently delete all your data. This action cannot be undone.
            </p>
            <button
              onClick={clearAllData}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 dark:bg-red-500 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All Data</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Storage Usage</h3>
        <div className="space-y-3">
          {[
            { label: 'Tasks', count: tasks.length },
            { label: 'Projects', count: projects.length },
            { label: 'Goals', count: goals.length },
            { label: 'Documents', count: documents.length },
            { label: 'Events', count: events.length },
            { label: 'Automations', count: automations.length },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.count} items</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection();
      case 'notifications': return renderNotificationsSection();
      case 'appearance': return renderAppearanceSection();
      case 'privacy': return renderPrivacySection();
      case 'data': return renderDataSection();
      default: return renderProfileSection();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <section.icon className="h-5 w-5" />
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;