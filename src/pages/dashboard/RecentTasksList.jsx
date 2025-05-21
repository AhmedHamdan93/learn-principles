import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

const RecentTasksList = ({ tasks, loading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleTaskClick = (id) => {
    navigate(`/tasks/${id}`);
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
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }
  
  if (tasks.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {t('Empty')}
        </Typography>
      </Box>
    );
  }
  
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          disablePadding
          divider
          secondaryAction={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label={t(`status.${task.status}`)}
                color={statusColors[task.status]}
                size="small"
                variant="outlined"
              />
              <Chip
                label={t(`priority.${task.priority}`)}
                color={priorityColors[task.priority]}
                size="small"
                variant="outlined"
              />
            </Box>
          }
        >
          <ListItemButton onClick={() => handleTaskClick(task.id)}>
            <ListItemText
              primary={task.name}
              primaryTypographyProps={{
                fontWeight: 500,
                sx: { mr: 10 },
              }}
              secondary={task.description?.substring(0, 60) + (task.description?.length > 60 ? '...' : '')}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default RecentTasksList;