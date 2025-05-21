import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Alert, Box, Container, Snackbar, Typography } from '@mui/material';
import useTaskStore from '../../store/taskStore';
import TaskForm from './TaskForm';

const CreateTask = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createTask, loading, error } = useTaskStore();
  const [message, setMessage] = useState('');
  
  // Handle form submission
  const handleSubmit = async (taskData) => {
    try {
      const createdTask = await createTask(taskData);
      
      if (createdTask) {
        setMessage(t('tasks.saveSuccess'));
        // Navigate to task list after short delay
        setTimeout(() => {
          navigate('/tasks');
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  
  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('tasks.create')}
        </Typography>
      </Box>
      
      <TaskForm onSubmit={handleSubmit} isLoading={loading} />
      
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

export default CreateTask;