import * as React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import SignUpImage  from '../../assets/signUpImage.svg';
import { Button, Box, TextField } from '@mui/material';
import { useLoginUserMutation, useSugnUpUserMutation } from '../../redux/services/auth';
import { useNavigate } from 'react-router-dom';

import './signUp.styles.css';

const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  login: Yup
    .string()
    .min(4, 'Logiin should be of minimum 4 characters length')
    .required('Login is required'),
  password: Yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function SignUpPage() {
  const navigate = useNavigate();

  const [ signUp ] = useSugnUpUserMutation();
  const [ loginUser ] = useLoginUserMutation();

  const backToWelcomePage = () => navigate('/', { replace: true});

  const handleSubmit = (values: {email: string, password: string, login: string }) => {
    signUp({ ...values, countMoney: 200, countBitcoins: 0 });
    loginUser({ email: values.email, password: values.password })
    navigate('/wallet', { replace: true});
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      login: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} mt={4.5}>
      <Box sx={{ width: '50%', maxHeight: '700px' }}>
        <img src={SignUpImage} alt='signUp' width="100%" height='100%' />
      </Box>
      <Box mr={3} sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <p className='headerText'>Create account</p>
        <p className='welcomeText'>Welcome. Create your account</p>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <TextField 
              sx={{ width: 450, height: 60, color: '#6E6E6E' }}
              label="Email" 
              variant="outlined"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField 
              sx={{ width: 450, height: 60, color: '#6E6E6E' }}
              label="Login" 
              variant="outlined"
              id="login"
              name="login"
              value={formik.values.login}
              onChange={formik.handleChange}
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
            />
            <TextField
              sx={{ width: 450, height: 60, color: '#6E6E6E' }}
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              onBlur={formik.handleBlur}
            />
            <Button className='openLoginPages' type='submit' variant='contained' sx={{ backgroundColor: '#407BFF', color: 'white' }}>Sign Up</Button>
          </Box>
        </form>
        <Button type='submit' variant='text' onClick={backToWelcomePage} sx={{ alignSelf: 'flex-start', width: '300px', marginLeft: '65px' }}>Back to welcome page</Button>
      </Box>
    </Box>
  )
};
