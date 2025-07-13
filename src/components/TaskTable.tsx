import React from 'react';
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

interface Task {
  id: string;
  name: string;
  status: 'In progress' | 'Complete' | 'Pending' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High';
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
  dueDate: string;
  project: string;
  comments: number;
  attachments: number;
}

const TaskTable = () => {
  const tasks: Task[] = [
    {
      id: '1',
      name: 'Design new landing page hero section',
      status: 'In progress',
      priority: 'High',
      assignee: { name: 'Sarah Chen', avatar: '', initials: 'SC' },
      dueDate: 'Dec 15',
      project: 'Website Redesign',
      comments: 3,
      attachments: 2
    },
    {
      id: '2',
      name: 'Implement user authentication flow',
      status: 'Pending',
      priority: 'Medium',
      assignee: { name: 'Mike Johnson', avatar: '', initials: 'MJ' },
      dueDate: 'Dec 18',
      project: 'Auth System',
      comments: 1,
      attachments: 0
    },
    {
      id: '3',
      name: 'Write API documentation',
      status: 'Complete',
      priority: 'Low',
      assignee: { name: 'Alex Rodriguez', avatar: '', initials: 'AR' },
      dueDate: 'Dec 12',
      project: 'Documentation',
      comments: 5,
      attachments: 1
    },
    {
      id: '4',
      name: 'Set up CI/CD pipeline',
      status: 'Blocked',
      priority: 'High',
      assignee: { name: 'Emily Davis', avatar: '', initials: 'ED' },
      dueDate: 'Dec 20',
      project: 'DevOps',
      comments: 2,
      attachments: 3
    },
    {
      id: '5',
      name: 'Conduct user research interviews',
      status: 'In progress',
      priority: 'Medium',
      assignee: { name: 'John Smith', avatar: '', initials: 'JS' },
      dueDate: 'Dec 16',
      project: 'User Research',
      comments: 0,
      attachments: 0
    },
    {
      id: '6',
      name: 'Optimize database queries',
      status: 'Pending',
      priority: 'High',
      assignee: { name: 'Lisa Wang', avatar: '', initials: 'LW' },
      dueDate: 'Dec 22',
      project: 'Performance',
      comments: 1,
      attachments: 0
    }
  ];

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

  return (
    <div className="flex-1 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Tasks</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your team's work and track progress</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white w-8">
                <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
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
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{task.name}</span>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                        <Edit3 className="h-3 w-3" />
                      </button>
                      {task.comments > 0 && (
                        <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-500">
                          <MessageSquare className="h-3 w-3" />
                          <span className="text-xs">{task.comments}</span>
                        </div>
                      )}
                      {task.attachments > 0 && (
                        <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-500">
                          <Paperclip className="h-3 w-3" />
                          <span className="text-xs">{task.attachments}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
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
                    <span className="text-sm text-gray-900 dark:text-white">{task.dueDate}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{task.project}</span>
                </td>
                <td className="py-4 px-6">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;