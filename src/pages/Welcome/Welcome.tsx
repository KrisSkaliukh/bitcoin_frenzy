import * as React from 'react';
import WelcomeImage from '../../assets/welcomeImage.svg';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './welcome.style.css'

export default function WelcomePage() {
  const navigate = useNavigate();

  const openSignUpPage = () => {
    navigate('/sign-up', { replace: true});
  };  
  
  const openLoginPage = () => {
    navigate('/login', { replace: true});
  };
  return (
    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} mt={4.5}>
      <Box sx={{ width: '100%', height: '75%' }}>
        <img src={WelcomeImage} alt='welcome' width="100%" height='100%' />
      </Box>
      <Box mt={8} mr={3} style={{ display: 'flex', flexDirection: 'column', gap: 35, width: '50%' }}>
        <p className='headerText'>Welcome to Bitcoin Frenzy</p>
        <p className='welcomeText'>This site is a bitcoin wallet.
          The owner and creator of this site Glazunova Ekaterina, a 4th year student of the Taganrog Institute named after A.P. Chekhov, branch of the Russian State Economic University (RINH).  </p>
        <p className='buttonsText'>Choose your login method and enjoy</p>
        <Box style={{ display: 'flex', flexDirection: 'row', gap: 51 }}>
          <Button className='openLoginPages' style={{ backgroundColor: '#407BFF', color: 'white' }} onClick={openSignUpPage}>Sign Up</Button>
          <Button className='openLoginPages' style={{ backgroundColor: '#407BFF', color: 'white' }} onClick={openLoginPage}>Login</Button>
        </Box>
      </Box>
    </Box>
  )
};

