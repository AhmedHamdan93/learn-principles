import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Container, Snackbar, Typography } from '@mui/material';
import useTaskStore from '../../store/taskStore';
import TaskForm from './TaskForm';
import LoadingScreen from '../../components/LoadingScreen';

const EditTask = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, fetchTasks, updateTask, loading, error } = useTaskStore();
  const [message, setMessage] = useState('');
  
  // Find the task to edit
  const task = tasks.find((task) => task.id === id);
  
  // Fetch tasks if not already loaded
  useEffect(() => {
    if (!tasks.length) {
      fetchTasks();
    }
  }, [fetchTasks, tasks.length]);
  
  // Handle form submission
  const handleSubmit = async (taskData) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      
      if (updatedTask) {
        setMessage(t('tasks.saveSuccess'));
        // Navigate to task details after short delay
        setTimeout(() => {
          navigate(`/tasks/${id}`);
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  // Show loading screen if task not loaded yet
  if (loading || !task) {
    return <LoadingScreen />;
  }
  
  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('tasks.edit')}
        </Typography>
      </Box>
      
      <TaskForm task={task} onSubmit={handleSubmit} isLoading={loading} />
      
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setMessage('')}>
          {message}
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => {}}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error">
          {error || t('tasks.errorSave')}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditTask;