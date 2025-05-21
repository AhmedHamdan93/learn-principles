// import { useState } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import {
//   Alert,
//   Box,
//   Button,
//   Card,
//   Container,
//   Link,
//   Snackbar,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { signIn } from '../../services/supabase';

// const Login = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setError('');

//     try {
//       const { error } = await signIn(data.email, data.password);

//       if (error) {
//         throw error;
//       }

//       navigate('/dashboard');
//     } catch (error) {
//       setError(error.message || t('auth.errorLogin'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//       }}
//     >
//       <Box
//         sx={{
//           width: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           py: 4,
//         }}
//       >
//         <Typography
//           component="h1"
//           variant="h3"
//           sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}
//         >
//           {t('app.title')}
//         </Typography>

//         <Typography variant="h5" sx={{ mb: 4 }}>
//           {t('auth.login')}
//         </Typography>

//         <Card sx={{ width: '100%', p: 4 }}>
//           <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label={t('auth.email')}
//               autoComplete="email"
//               autoFocus
//               {...register('email', {
//                 required: t('validation.required'),
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: t('validation.email'),
//                 },
//               })}
//               error={!!errors.email}
//               helperText={errors.email?.message}
//               sx={{ mb: 2 }}
//             />

//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="password"
//               label={t('auth.password')}
//               type="password"
//               autoComplete="current-password"
//               {...register('password', {
//                 required: t('validation.required'),
//                 minLength: {
//                   value: 6,
//                   message: t('validation.minLength', { count: 6 }),
//                 },
//               })}
//               error={!!errors.password}
//               helperText={errors.password?.message}
//               sx={{ mb: 3 }}
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               size="large"
//               disabled={loading}
//               sx={{ py: 1.5 }}
//             >
//               {loading ? t('common.loading') : t('auth.login')}
//             </Button>

//             <Box sx={{ mt: 2, textAlign: 'center' }}>
//               <Typography variant="body2">
//                 {t('auth.needAccount')}{' '}
//                 <Link component={RouterLink} to="/signup" variant="body2">
//                   {t('auth.signup')}
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Card>
//       </Box>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError('')}
//       >
//         <Alert severity="error" onClose={() => setError('')} sx={{ width: '100%' }}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </Container>


//   );
// };

// export default Login;


import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { signIn } from '../../services/supabase';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(data.email, data.password);

      if (error) {
        throw error;
      }

      navigate('/dashboard');
    } catch (error) {
      setError(error.message || t('auth.errorLogin'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
    
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginLeft:'80%'
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{ mb: 2, fontWeight: 700, color: 'primary.main', textAlign: 'center' }}
        >
          {t('app.title')}
        </Typography>

        <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
          {t('auth.login')}
        </Typography>

        <Card
          sx={{
            width: '100%',
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('auth.email')}
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: t('validation.required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('validation.email'),
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label={t('auth.password')}
              type="password"
              autoComplete="current-password"
              {...register('password', {
                required: t('validation.required'),
                minLength: {
                  value: 6,
                  message: t('validation.minLength', { count: 6 }),
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? t('common.loading') : t('auth.login')}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                {t('auth.needAccount')}{' '}
                <Link component={RouterLink} to="/signup" variant="body2">
                  {t('auth.signup')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
