import * as React from 'react';
import LogoIcon from '../../assets/menuLogo.png';

import './menu.style.css';

export default function Menu() {
  return(
    <div className='menu'>
      <ul className='menuList'>
        <li className='text origin li'> <img src={LogoIcon} alt='menu logo' className='menuLogo' />MY WALLET</li>
        <li className='text origin li'> <img src={LogoIcon} alt='menu logo' className='menuLogo'/>BUY BITCOIN</li>
        <li className='text origin li'> <img src={LogoIcon} alt='menu logo' className='menuLogo' />SELL BITCOIN</li>
        <li className='text origin li'> <img src={LogoIcon} alt='menu logo' className='menuLogo' />BITCOIN PRICE</li>
      </ul>
    </div>
  )
};