import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';

// Default form values
const defaultValues = {
  name: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: null,
};

const TaskForm = ({ task, onSubmit, isLoading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Initialize form with react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: task || defaultValues,
  });
  
  // Update form when editing an existing task
  useEffect(() => {
    if (task) {
      // Format date properly if it exists
      const formattedTask = {
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
      };
      reset(formattedTask);
    }
  }, [task, reset]);
  
  // Handle form submission
  const handleFormSubmit = (data) => {
    // Format the due date if it exists
    const formattedData = {
      ...data,
      dueDate: data.dueDate ? format(new Date(data.dueDate), 'yyyy-MM-dd') : null,
    };
    onSubmit(formattedData);
  };
  
  // Handle cancel button
  const handleCancel = () => {
    navigate('/tasks');
  };
  
  return (
    <Card>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <Grid container spacing={3}>
            {/* Task name */}
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: t('validation.required'),
                  maxLength: {
                    value: 100,
                    message: t('validation.maxLength', { count: 100 }),
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('tasks.name')}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>
            
            {/* Description */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{
                  maxLength: {
                    value: 500,
                    message: t('validation.maxLength', { count: 500 }),
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('tasks.description')}
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>
            
            {/* Status */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="status"
                control={control}
                rules={{ required: t('validation.required') }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.status}>
                    <InputLabel id="status-label">{t('tasks.status')}</InputLabel>
                    <Select
                      {...field}
                      labelId="status-label"
                      label={t('tasks.status')}
                      disabled={isLoading}
                    >
                      <MenuItem value="todo">{t('status.todo')}</MenuItem>
                      <MenuItem value="inProgress">{t('status.inProgress')}</MenuItem>
                      <MenuItem value="review">{t('status.review')}</MenuItem>
                      <MenuItem value="done">{t('status.done')}</MenuItem>
                    </Select>
                    {errors.status && (
                      <FormHelperText>{errors.status.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            
            {/* Priority */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="priority"
                control={control}
                rules={{ required: t('validation.required') }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.priority}>
                    <InputLabel id="priority-label">{t('tasks.priority')}</InputLabel>
                    <Select
                      {...field}
                      labelId="priority-label"
                      label={t('tasks.priority')}
                      disabled={isLoading}
                    >
                      <MenuItem value="low">{t('priority.low')}</MenuItem>
                      <MenuItem value="medium">{t('priority.medium')}</MenuItem>
                      <MenuItem value="high">{t('priority.high')}</MenuItem>
                      <MenuItem value="urgent">{t('priority.urgent')}</MenuItem>
                    </Select>
                    {errors.priority && (
                      <FormHelperText>{errors.priority.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            
            {/* Due date */}
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="dueDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label={t('tasks.dueDate')}
                      value={field.value}
                      onChange={field.onChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          disabled: isLoading,
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            
            {/* Form actions */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                >
                  {isLoading ? t('common.saving') : t('common.save')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskForm;