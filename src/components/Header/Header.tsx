import * as React from 'react';
import HeaderLogo from '../../assets/logo.png';

import './header.style.css'

export default function Header() {
  return(
    <div className='header'>
      <div className='logoAndTitle'>
      <img src={HeaderLogo} alt='header logo' className='headerLogo' />
      <h1 className='text'>BITCOIN FRENZY</h1>
      </div>
      <span className='text origin'>1 BITCOIN = 1,000$  </span>
      <p className='text origin'>10 400$ <br /> 7 BITCOINS</p>
    </div>
  )
};
