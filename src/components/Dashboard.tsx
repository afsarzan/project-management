import React from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  CheckSquare, 
  Target, 
  FileText, 
  Calendar,
  TrendingUp,
  Clock,
  Users,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const { tasks, goals, documents, events, projects } = useApp();

  const completedTasks = tasks.filter(task => task.status === 'Complete').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In progress').length;
  const blockedTasks = tasks.filter(task => task.status === 'Blocked').length;
  const completedGoals = goals.filter(goal => goal.status === 'Completed').length;

  const stats = [
    {
      title: 'Total Tasks',
      value: tasks.length,
      icon: CheckSquare,
      color: 'blue',
      change: '+12%',
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: TrendingUp,
      color: 'green',
      change: '+8%',
    },
    {
      title: 'Active Goals',
      value: goals.length,
      icon: Target,
      color: 'purple',
      change: '+3%',
    },
    {
      title: 'Documents',
      value: documents.length,
      icon: FileText,
      color: 'orange',
      change: '+15%',
    },
  ];

  const recentTasks = tasks
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const upcomingEvents = events
    .filter(event => new Date(event.start) > new Date())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-600 dark:text-green-400">{stat.change}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tasks</h3>
          </div>
          <div className="p-6 space-y-4">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    task.status === 'Complete' ? 'bg-green-500' :
                    task.status === 'In progress' ? 'bg-blue-500' :
                    task.status === 'Blocked' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{task.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{task.project}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    task.status === 'Complete' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                    task.status === 'In progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                    task.status === 'Blocked' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                    'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks yet</p>
            )}
          </div>
        </div>

        {/* Project Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h3>
          </div>
          <div className="p-6 space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{project.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{project.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{project.taskCount} tasks</p>
                  </div>
                </div>
                <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-${project.color}-500`}
                    style={{ width: `${Math.min(100, (project.taskCount / 10) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 text-center rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <CheckSquare className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">New Task</span>
          </button>
          <button className="flex flex-col items-center p-4 text-center rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Target className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">New Goal</span>
          </button>
          <button className="flex flex-col items-center p-4 text-center rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <FileText className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">New Document</span>
          </button>
          <button className="flex flex-col items-center p-4 text-center rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Calendar className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">New Event</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;