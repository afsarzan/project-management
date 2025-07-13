import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Task, Project, User, Goal, Document, CalendarEvent, Automation, NavigationItem, ViewMode } from '../types';

interface AppContextType {
  // Navigation
  activeTab: NavigationItem;
  setActiveTab: (tab: NavigationItem) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  
  // Tasks
  tasks: Task[];
  setTasks: (tasks: Task[] | ((prev: Task[]) => Task[])) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // Projects
  projects: Project[];
  setProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'taskCount'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Users
  users: User[];
  setUsers: (users: User[] | ((prev: User[]) => User[])) => void;
  currentUser: User;
  
  // Goals
  goals: Goal[];
  setGoals: (goals: Goal[] | ((prev: Goal[]) => Goal[])) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  
  // Documents
  documents: Document[];
  setDocuments: (docs: Document[] | ((prev: Document[]) => Document[])) => void;
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  
  // Calendar
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[] | ((prev: CalendarEvent[]) => CalendarEvent[])) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  
  // Automations
  automations: Automation[];
  setAutomations: (automations: Automation[] | ((prev: Automation[]) => Automation[])) => void;
  addAutomation: (automation: Omit<Automation, 'id' | 'createdAt'>) => void;
  updateAutomation: (id: string, updates: Partial<Automation>) => void;
  deleteAutomation: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', initials: 'JD', role: 'Admin' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', initials: 'SC', role: 'Designer' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', initials: 'MJ', role: 'Developer' },
  { id: '4', name: 'Alex Rodriguez', email: 'alex@example.com', initials: 'AR', role: 'Developer' },
  { id: '5', name: 'Emily Davis', email: 'emily@example.com', initials: 'ED', role: 'DevOps' },
  { id: '6', name: 'Lisa Wang', email: 'lisa@example.com', initials: 'LW', role: 'Developer' },
];

const defaultProjects: Project[] = [
  { id: '1', name: 'My Focus', emoji: '🧠', color: 'blue', taskCount: 0, createdAt: new Date().toISOString() },
  { id: '2', name: 'Product Launch', emoji: '🚀', color: 'purple', taskCount: 0, createdAt: new Date().toISOString() },
  { id: '3', name: 'Marketing', emoji: '📈', color: 'green', taskCount: 0, createdAt: new Date().toISOString() },
  { id: '4', name: 'Ideas', emoji: '💡', color: 'yellow', taskCount: 0, createdAt: new Date().toISOString() },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useLocalStorage<NavigationItem>('activeTab', 'tasks');
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('viewMode', 'list');
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', defaultProjects);
  const [users, setUsers] = useLocalStorage<User[]>('users', defaultUsers);
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', []);
  const [documents, setDocuments] = useLocalStorage<Document[]>('documents', []);
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('events', []);
  const [automations, setAutomations] = useLocalStorage<Automation[]>('automations', []);

  const currentUser = users[0]; // John Doe as current user

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
    
    // Update project task count
    setProjects(prev => prev.map(project => 
      project.name === newTask.project 
        ? { ...project, taskCount: project.taskCount + 1 }
        : project
    ));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setTasks(prev => prev.filter(t => t.id !== id));
      setProjects(prev => prev.map(project => 
        project.name === task.project 
          ? { ...project, taskCount: Math.max(0, project.taskCount - 1) }
          : project
      ));
    }
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'taskCount'>) => {
    const newProject: Project = {
      ...projectData,
      id: generateId(),
      taskCount: 0,
      createdAt: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const deleteProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      // Delete all tasks in this project
      setTasks(prev => prev.filter(task => task.project !== project.name));
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const addGoal = (goalData: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const addDocument = (docData: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDoc: Document = {
      ...docData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id 
        ? { ...doc, ...updates, updatedAt: new Date().toISOString() }
        : doc
    ));
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: generateId(),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const addAutomation = (automationData: Omit<Automation, 'id' | 'createdAt'>) => {
    const newAutomation: Automation = {
      ...automationData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setAutomations(prev => [...prev, newAutomation]);
  };

  const updateAutomation = (id: string, updates: Partial<Automation>) => {
    setAutomations(prev => prev.map(automation => 
      automation.id === id ? { ...automation, ...updates } : automation
    ));
  };

  const deleteAutomation = (id: string) => {
    setAutomations(prev => prev.filter(automation => automation.id !== id));
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      viewMode,
      setViewMode,
      tasks,
      setTasks,
      addTask,
      updateTask,
      deleteTask,
      projects,
      setProjects,
      addProject,
      updateProject,
      deleteProject,
      users,
      setUsers,
      currentUser,
      goals,
      setGoals,
      addGoal,
      updateGoal,
      deleteGoal,
      documents,
      setDocuments,
      addDocument,
      updateDocument,
      deleteDocument,
      events,
      setEvents,
      addEvent,
      updateEvent,
      deleteEvent,
      automations,
      setAutomations,
      addAutomation,
      updateAutomation,
      deleteAutomation,
    }}>
      {children}
    </AppContext.Provider>
  );
};