import * as React from 'react';
import { useSelector } from 'react-redux'; 
import { RootState } from '../../redux/store';

import HeaderLogo from '../../assets/logo.png';

import './header.style.css'

export default function Header() {
  const { userMoney, userBitcoins, bitcoinPrice } = useSelector((state: RootState) => state.bitcoins);
  const price = new Intl.NumberFormat('en').format(bitcoinPrice);
  
  return(
    <div className='header'>
      <div className='logoAndTitle'>
      <img src={HeaderLogo} alt='header logo' className='headerLogo' />
      <h1 className='text'>BITCOIN FRENZY</h1>
      </div>
      <span className='text origin'>1 BITCOIN = {price}$  </span>
      <p className='text origin'>{userMoney}$ <br /> {userBitcoins} BITCOINS</p>
    </div>
  )
};
