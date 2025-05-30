import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { subscribeToTasks } from '../../services/supabase';
import useTaskStore from '../../store/taskStore';
import LoadingScreen from '../../components/LoadingScreen';
import ConfirmDialog from '../../components/ConfirmDialog';
import TaskCard from './TaskCard';

const TaskList = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    deleteTask,
    handleRealtimeUpdate,
  } = useTaskStore();
  
  useEffect(() => {
    fetchTasks();
    
    const subscription = subscribeToTasks(handleRealtimeUpdate);
    
    return () => {
      subscription.unsubscribe();
    };
  }, [fetchTasks, handleRealtimeUpdate]);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const filteredTasks = tasks.filter((task) => {
    return (
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  
  const handleOpenDeleteDialog = (task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };
  
  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete.id);
      handleCloseDeleteDialog();
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
  
  if (loading && tasks.length === 0) {
    return <LoadingScreen />;
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {t('tasks.title')}
          </Typography>
          <Button
            component={RouterLink}
            to="/tasks/create"
            variant="contained"
            startIcon={<AddIcon />}
          >
            {t('tasks.addNew')}
          </Button>
        </Box>
        
        <TextField
          fullWidth
          placeholder={t('tasks.search')}
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {isMobile && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredTasks.length === 0 ? (
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  {t('tasks.empty')}
                </Typography>
              </Card>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={() => handleOpenDeleteDialog(task)}
                />
              ))
            )}
          </Box>
        )}
        
        {!isMobile && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>{t('tasks.name')}</TableCell>
                  <TableCell>{t('tasks.description')}</TableCell>
                  <TableCell>{t('tasks.status')}</TableCell>
                  <TableCell>{t('tasks.priority')}</TableCell>
                  <TableCell>{t('tasks.dueDate')}</TableCell>
                  <TableCell align="right">{t('tasks.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography color="text.secondary" sx={{ py: 2 }}>
                        {t('tasks.empty')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell component="th" scope="row">
                        {task.name}
                      </TableCell>
                      <TableCell>
                        {task.description?.substring(0, 60) + (task.description?.length > 60 ? '...' : '') || '-'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={t(`status.${task.status}`)}
                          color={statusColors[task.status]}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={t(`priority.${task.priority}`)}
                          color={priorityColors[task.priority]}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <IconButton
                            component={RouterLink}
                            to={`/tasks/${task.id}`}
                            color="info"
                            size="small"
                          >
                            <ViewIcon />
                          </IconButton>
                          <IconButton
                            component={RouterLink}
                            to={`/tasks/${task.id}/edit`}
                            color="primary"
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleOpenDeleteDialog(task)}
                            color="error"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      
      <ConfirmDialog
        open={deleteDialogOpen}
        title={t('tasks.delete')}
        content={t('tasks.confirmDelete')}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteDialog}
        isLoading={loading}
      />
    </Container>
  );
};

export default TaskList;