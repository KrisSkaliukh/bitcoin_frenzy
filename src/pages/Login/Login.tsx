import * as React from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';
import LoginImage from '../../assets/loginImage.svg';
import { Button, Box, TextField } from '@mui/material';

import './login.style.css'

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }} mt={8}>
      <Box>
        <img src={LoginImage} alt='welcome' width="800px" height='750px' />
      </Box>
      <Box mt={8} mr={3} sx={{ display: 'flex', flexDirection: 'column' }}>
        <p className='headerText'>Log In</p>
        <p className='welcomeText'>Welcome Back.<br />Please Enter Your Details.</p>
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
            <Button className='openLoginPages' type='submit' sx={{ backgroundColor: '#407BFF', color: 'white' }}>Login</Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
};

