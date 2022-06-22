import React, {useMemo} from 'react';
import { useSelector } from 'react-redux'; 
import { RootState } from '../../redux/store';

import HeaderLogo from '../../assets/logo.png';

import './header.style.css'
import { useGetPriceQuery } from '../../redux/services/bitcoinPrice';

export default function Header() {
  const { userMoney, userBitcoins } = useSelector((state: RootState) => state.bitcoins);
  const { data } = useGetPriceQuery();
  const price = useMemo(() => new Intl.NumberFormat('en').format(data), [data] ) ;
  
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
