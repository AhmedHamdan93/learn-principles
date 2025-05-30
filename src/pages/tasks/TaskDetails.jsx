import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Snackbar,
  Typography,
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { subscribeToTasks } from '../../services/supabase';
import useTaskStore from '../../store/taskStore';
import LoadingScreen from '../../components/LoadingScreen';
import ConfirmDialog from '../../components/ConfirmDialog';

const TaskDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    tasks,
    fetchTasks,
    deleteTask,
    loading,
    error,
    handleRealtimeUpdate,
  } = useTaskStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const task = tasks.find((task) => task.id === id);
  
  useEffect(() => {
    if (!tasks.length) {
      fetchTasks();
    }
    
    const subscription = subscribeToTasks(handleRealtimeUpdate);
    
    return () => {
      subscription.unsubscribe();
    };
  }, [fetchTasks, tasks.length, handleRealtimeUpdate]);
  
  const handleConfirmDelete = async () => {
    try {
      const success = await deleteTask(id);
      
      if (success) {
        setMessage(t('tasks.deleteSuccess'));
        setDeleteDialogOpen(false);
        
        setTimeout(() => {
          navigate('/tasks');
        }, 1500);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  const statusColors = {
    todo: 'error',
    inProgress: 'warning',
    review: 'info',
    done: 'success',
  };
  
  const priorityColors = {
    low: 'success',
    medium: 'info',
    high: 'warning',
    urgent: 'error',
  };
  
  if (loading || !task) {
    return <LoadingScreen />;
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Button
          component={RouterLink}
          to="/tasks"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          {t('common.back')}
        </Button>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {task.name}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={RouterLink}
              to={`/tasks/${id}/edit`}
              variant="outlined"
              startIcon={<EditIcon />}
            >
              {t('common.edit')}
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialogOpen(true)}
            >
              {t('common.delete')}
            </Button>
          </Box>
        </Box>
        
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Chip
                    label={t(`status.${task.status}`)}
                    color={statusColors[task.status]}
                  />
                  <Chip
                    label={t(`priority.${task.priority}`)}
                    color={priorityColors[task.priority]}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                {task.dueDate && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TimeIcon color="action" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {t('tasks.dueDate')}:{' '}
                      {format(new Date(task.dueDate), 'PPP')}
                    </Typography>
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {t('tasks.description')}
                </Typography>
                <Typography variant="body1" paragraph>
                  {task.description || t('tasks.noDescription')}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
                  {task.created_at && (
                    <Typography variant="body2">
                      {t('common.created')}: {format(new Date(task.created_at), 'PPp')}
                    </Typography>
                  )}
                  {task.updated_at && (
                    <Typography variant="body2">
                      {t('common.updated')}: {format(new Date(task.updated_at), 'PPp')}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <ConfirmDialog
        open={deleteDialogOpen}
        title={t('tasks.delete')}
        content={t('tasks.confirmDelete')}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
        isLoading={loading}
      />
      
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
          {error || t('tasks.errorDelete')}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TaskDetails;