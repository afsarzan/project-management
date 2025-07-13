import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Zap, Plus, Play, Pause, Settings, Trash2, ArrowRight } from 'lucide-react';

const Automations = () => {
  const { automations, addAutomation, updateAutomation, deleteAutomation } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    trigger: '',
    action: '',
    isActive: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAutomation(formData);
    setFormData({
      name: '',
      description: '',
      trigger: '',
      action: '',
      isActive: true,
    });
    setShowForm(false);
  };

  const toggleAutomation = (id: string, isActive: boolean) => {
    updateAutomation(id, { isActive: !isActive });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this automation?')) {
      deleteAutomation(id);
    }
  };

  const triggerOptions = [
    'Task status changed to Complete',
    'Task is overdue',
    'New task assigned to me',
    'Goal progress reaches 100%',
    'Document is created',
    'Event is scheduled',
    'Daily at 9:00 AM',
    'Weekly on Monday',
  ];

  const actionOptions = [
    'Send email notification',
    'Create new task',
    'Update task status',
    'Add comment to task',
    'Move task to project',
    'Set task priority',
    'Schedule follow-up',
    'Generate report',
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Automations</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Automate your workflow with custom rules</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Automation</span>
        </button>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <div key={automation.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Zap className={`h-5 w-5 ${automation.isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{automation.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    automation.isActive 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                  }`}>
                    {automation.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">{automation.description}</p>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">When:</span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                      {automation.trigger}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Then:</span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
                      {automation.action}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => toggleAutomation(automation.id, automation.isActive)}
                  className={`p-2 rounded-lg transition-colors ${
                    automation.isActive
                      ? 'text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                      : 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                  }`}
                  title={automation.isActive ? 'Pause automation' : 'Activate automation'}
                >
                  {automation.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  title="Edit automation"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(automation.id)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  title="Delete automation"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {automations.length === 0 && (
          <div className="text-center py-12">
            <Zap className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No automations yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first automation to streamline your workflow</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Create Automation</span>
            </button>
          </div>
        )}
      </div>

      {/* Automation Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Automation</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Automation Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter automation name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Describe what this automation does..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Trigger (When)
                </label>
                <select
                  required
                  value={formData.trigger}
                  onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select a trigger...</option>
                  {triggerOptions.map((trigger, index) => (
                    <option key={index} value={trigger}>{trigger}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Action (Then)
                </label>
                <select
                  required
                  value={formData.action}
                  onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select an action...</option>
                  {actionOptions.map((action, index) => (
                    <option key={index} value={action}>{action}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Activate immediately
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Create Automation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Automations;