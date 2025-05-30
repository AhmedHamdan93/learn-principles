import { create } from 'zustand';
import { createTask, updateTask, deleteTask, fetchTasks } from '../services/supabase';

const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await fetchTasks();
      if (error) throw error;
      set({ tasks: data || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error fetching tasks:', error);
    }
  },
  
  createTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await createTask(task);
      if (error) throw error;
      set({ loading: false });
      return data?.[0];
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error creating task:', error);
      return null;
    }
  },
  
  updateTask: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await updateTask(id, updates);
      if (error) throw error;
      set({ loading: false });
      return data?.[0];
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error updating task:', error);
      return null;
    }
  },
  
  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await deleteTask(id);
      if (error) throw error;
      set({ loading: false });
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error deleting task:', error);
      return false;
    }
  },
  
  setSelectedTask: (task) => {
    set({ selectedTask: task });
  },
  
  handleRealtimeUpdate: (payload) => {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    
    const tasks = get().tasks;
    
    switch (eventType) {
      case 'INSERT':
        set({ tasks: [newRecord, ...tasks] });
        break;
      case 'UPDATE':
        set({
          tasks: tasks.map((task) => 
            task.id === newRecord.id ? newRecord : task
          ),
        });
        break;
      case 'DELETE':
        set({
          tasks: tasks.filter((task) => task.id !== oldRecord.id),
        });
        break;
      default:
        break;
    }
  },
}));

export default useTaskStore;