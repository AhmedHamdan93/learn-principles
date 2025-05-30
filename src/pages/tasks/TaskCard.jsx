import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

const TaskCard = ({ task, onDelete }) => {
  const { t } = useTranslation();
  
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
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom noWrap>
          {task.name}
        </Typography>
        
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 2,
          }}
        >
          {task.description || t('tasks.noDescription')}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
          <Chip
            label={t(`status.${task.status}`)}
            color={statusColors[task.status]}
            size="small"
          />
          <Chip
            label={t(`priority.${task.priority}`)}
            color={priorityColors[task.priority]}
            size="small"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          {task.dueDate
            ? `${t('tasks.dueDate')}: ${new Date(task.dueDate).toLocaleDateString()}`
            : t('tasks.noDueDate')}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'flex-end' }}>
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
          onClick={() => onDelete(task)}
          color="error"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;