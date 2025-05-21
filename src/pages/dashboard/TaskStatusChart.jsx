import { useTranslation } from 'react-i18next';
import { Box, useTheme } from '@mui/material';

// A placeholder for a chart component
// In a real application, you would use a library like Chart.js or Recharts
const TaskStatusChart = ({ tasks }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  // Calculate task counts by status
  const todoCount = tasks.filter(task => task.status === 'todo').length;
  const inProgressCount = tasks.filter(task => task.status === 'inProgress').length;
  const reviewCount = tasks.filter(task => task.status === 'review').length;
  const doneCount = tasks.filter(task => task.status === 'done').length;
  
  // If no tasks, show empty state
  if (tasks.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '200px',
        color: 'text.secondary',
        fontSize: '0.875rem'
      }}>
        {t('dashboard.noTasksToShow')}
      </Box>
    );
  }
  
  // Colors for different statuses
  const colors = {
    todo: theme.palette.error.main,
    inProgress: theme.palette.warning.main,
    review: theme.palette.info.main,
    done: theme.palette.success.main,
  };
  
  // Total tasks
  const total = tasks.length;
  
  return (
    <Box sx={{ width: '100%', height: '200px', position: 'relative' }}>
      {/* Simple bar chart */}
      <Box sx={{ 
        display: 'flex', 
        height: '160px', 
        alignItems: 'flex-end', 
        justifyContent: 'space-around',
        px: 3
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '20%' 
        }}>
          <Box sx={{ 
            width: '100%', 
            bgcolor: colors.todo, 
            height: `${(todoCount / total) * 160}px`,
            minHeight: todoCount ? '20px' : '0',
            borderRadius: '4px 4px 0 0'
          }} />
          <Box sx={{ mt: 1, fontSize: '0.75rem', textAlign: 'center' }}>
            {t('status.todo')}
          </Box>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '20%' 
        }}>
          <Box sx={{ 
            width: '100%', 
            bgcolor: colors.inProgress, 
            height: `${(inProgressCount / total) * 160}px`,
            minHeight: inProgressCount ? '20px' : '0',
            borderRadius: '4px 4px 0 0'
          }} />
          <Box sx={{ mt: 1, fontSize: '0.75rem', textAlign: 'center' }}>
            {t('status.inProgress')}
          </Box>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '20%' 
        }}>
          <Box sx={{ 
            width: '100%', 
            bgcolor: colors.review, 
            height: `${(reviewCount / total) * 160}px`,
            minHeight: reviewCount ? '20px' : '0',
            borderRadius: '4px 4px 0 0'
          }} />
          <Box sx={{ mt: 1, fontSize: '0.75rem', textAlign: 'center' }}>
            {t('status.review')}
          </Box>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '20%' 
        }}>
          <Box sx={{ 
            width: '100%', 
            bgcolor: colors.done, 
            height: `${(doneCount / total) * 160}px`,
            minHeight: doneCount ? '20px' : '0',
            borderRadius: '4px 4px 0 0'
          }} />
          <Box sx={{ mt: 1, fontSize: '0.75rem', textAlign: 'center' }}>
            {t('status.done')}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskStatusChart;