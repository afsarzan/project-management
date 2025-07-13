import React from 'react';
import { useApp } from '../contexts/AppContext';
import TaskModal from './TaskModal';
import { 
  MoreHorizontal, 
  Calendar, 
  MessageSquare, 
  Paperclip,
  Flag,
  Flame,
  Edit3,
  UserPlus
} from 'lucide-react';
import { Task } from '../types';

const TaskTable = () => {
  const { tasks, updateTask, deleteTask, viewMode } = useApp();
  const [selectedTasks, setSelectedTasks] = React.useState<string[]>([]);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = React.useState(false);

  React.useEffect(() => {
    const handleOpenModal = () => setShowTaskModal(true);
    window.addEventListener('openNewTaskModal', handleOpenModal);
    return () => window.removeEventListener('openNewTaskModal', handleOpenModal);
  }, []);

  const handleSelectTask = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTasks(selectedTasks.length === tasks.length ? [] : tasks.map(t => t.id));
  };

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    updateTask(taskId, { status });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In progress':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'Complete':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'Pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'Blocked':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Flag className="h-4 w-4 text-red-500" />;
      case 'Medium':
        return <Flame className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (viewMode === 'grid') {
    return (
      <>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Tasks</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your team's work and track progress</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
                
                <h3 
                  className="font-medium text-gray-900 dark:text-white mb-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => handleEditTask(task)}
                >
                  {task.name}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>{task.project}</span>
                  <div className="flex items-center">
                    {getPriorityIcon(task.priority)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium leading-none">{task.assignee.initials}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {showTaskModal && (
          <TaskModal
            task={editingTask}
            onClose={() => {
              setShowTaskModal(false);
              setEditingTask(null);
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Tasks</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your team's work and track progress</p>
          </div>
          {selectedTasks.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">{selectedTasks.length} selected</span>
              <button 
                onClick={() => selectedTasks.forEach(id => deleteTask(id))}
                className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white w-8">
                <input 
                  type="checkbox" 
                  checked={selectedTasks.length === tasks.length && tasks.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" 
                />
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                Task Name
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                Status
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                Priority
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                Assignee
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                Due Date
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                Project
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white w-8">
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr 
                key={task.id} 
                className={`group hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors duration-150 ${
                  index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <td className="py-4 px-6">
                  <input 
                    type="checkbox" 
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => handleSelectTask(task.id)}
                    className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" 
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <span 
                      className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={() => handleEditTask(task)}
                    >
                      {task.name}
                    </span>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditTask(task)}
                        className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Edit3 className="h-3 w-3" />
                      </button>
                      {task.comments.length > 0 && (
                        <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-500">
                          <MessageSquare className="h-3 w-3" />
                          <span className="text-xs">{task.comments.length}</span>
                        </div>
                      )}
                      {task.attachments.length > 0 && (
                        <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-500">
                          <Paperclip className="h-3 w-3" />
                          <span className="text-xs">{task.attachments.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap border-0 bg-transparent cursor-pointer ${getStatusColor(task.status)}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In progress">In progress</option>
                    <option value="Complete">Complete</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    {getPriorityIcon(task.priority)}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{task.priority}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium leading-none">{task.assignee.initials}</span>
                    </div>
                    <span className="text-sm text-gray-900 dark:text-white">{task.assignee.name}</span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                      <UserPlus className="h-3 w-3" />
                    </button>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm text-gray-900 dark:text-white">{formatDate(task.dueDate)}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{task.project}</span>
                </td>
                <td className="py-4 px-6">
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      
      {showTaskModal && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }}
        />
      )}
    </>
  );
};

export default TaskTable;