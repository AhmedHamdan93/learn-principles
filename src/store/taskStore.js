import { create } from 'zustand';
import { createTask, updateTask, deleteTask, fetchTasks } from '../services/supabase';

const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,
  
  // Fetch all tasks
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
  
  // Create a new task
  createTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await createTask(task);
      if (error) throw error;
      // We don't need to update the state here as the subscription will handle it
      set({ loading: false });
      return data?.[0];
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error creating task:', error);
      return null;
    }
  },
  
  // Update an existing task
  updateTask: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await updateTask(id, updates);
      if (error) throw error;
      // We don't need to update the state here as the subscription will handle it
      set({ loading: false });
      return data?.[0];
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error updating task:', error);
      return null;
    }
  },
  
  // Delete a task
  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await deleteTask(id);
      if (error) throw error;
      // We don't need to update the state here as the subscription will handle it
      set({ loading: false });
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error deleting task:', error);
      return false;
    }
  },
  
  // Set the selected task for editing
  setSelectedTask: (task) => {
    set({ selectedTask: task });
  },
  
  // Handle real-time updates
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