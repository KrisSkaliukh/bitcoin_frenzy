import * as React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import SignUpImage  from '../../assets/signUpImage.svg';
import { Button, Box, TextField } from '@mui/material';

import './signUp.styles.css';
import { useSugnUpUserMutation } from '../../redux/services/auth';

const validationSchema = Yup.object().shape({
  mail: Yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  login: Yup
    .string()
    .email('Enter a valid login')
    .min(4, 'Logiin should be of minimum 4 characters length')
    .required('Email is required'),
  password: Yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  changepassword: Yup.string()
  .required('Заполните поле')
  .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
});

export default function SignUpPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      login: '',
      changepassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const user = useSugnUpUserMutation({ values });
      alert(user);
    },
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }} mt={8}>
      <Box>
        <img src={SignUpImage} alt='welcome' width="800px" height='750px' />
      </Box>
      <Box mr={3} sx={{ display: 'flex', flexDirection: 'column' }}>
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
            <TextField
              sx={{ width: 450, height: 60, color: '#6E6E6E' }}
              name="changepassword"
              type="password"
              value={formik.values.changepassword}
              onChange={formik.handleChange}
              error={formik.touched.changepassword && Boolean(formik.errors.changepassword)}
              helperText={formik.touched.changepassword && formik.errors.changepassword}
              label="Repeat password"
              onBlur={formik.handleBlur}
            />
            <Button className='openLoginPages' type='submit' sx={{ backgroundColor: '#407BFF', color: 'white' }}>Sign Up</Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
};
