export interface Task {
  id: string;
  name: string;
  description?: string;
  status: 'In progress' | 'Complete' | 'Pending' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High';
  assignee: {
    id: string;
    name: string;
    avatar: string;
    initials: string;
  };
  dueDate: string;
  project: string;
  comments: Comment[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  text: string;
  author: {
    id: string;
    name: string;
    initials: string;
  };
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Project {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  color: string;
  taskCount: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatar?: string;
  role: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: 'Active' | 'Completed' | 'Paused';
  tasks: string[];
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'specification' | 'meeting';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  type: 'meeting' | 'deadline' | 'reminder';
  attendees: string[];
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  isActive: boolean;
  createdAt: string;
}

export type ViewMode = 'list' | 'grid' | 'calendar';
export type NavigationItem = 'dashboard' | 'tasks' | 'goals' | 'docs' | 'calendar' | 'automations' | 'settings';