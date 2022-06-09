import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../../assets/menuLogo.png';

import './menu.style.css';

export default function Menu() {
  const navigate = useNavigate();

  const goToWallet = () => {
    navigate('/wallet', { replace: true});
  };

  const goToBuyPage = () => {
    navigate('/buy', { replace: true});
  };

  const goToSellPage = () => {
    navigate('/sell', { replace: true});
  };
  
  const goToPricePage = () => {
    navigate('/bitcoin', { replace: true});
  };

  return(
    <div className='menu'>
      <ul className='menuList'>
        <li onClick={goToWallet} className='text origin li'> <img src={LogoIcon} alt='menu logo' className='menuLogo' />MY WALLET</li>
        <li onClick={goToBuyPage} className='text origin li'> <img src={LogoIcon} alt='menu logo' className='menuLogo'/>BUY BITCOIN</li>
        <li onClick={goToSellPage} className='text origin li'> <img src={LogoIcon} alt='menu logo' className='menuLogo' />SELL BITCOIN</li>
        <li onClick={goToPricePage} className='text origin li'> <img src={LogoIcon} alt='menu logo' className='menuLogo' />BITCOIN PRICE</li>
      </ul>
    </div>
  )
};