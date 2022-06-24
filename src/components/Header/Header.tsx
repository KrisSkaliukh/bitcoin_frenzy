import React, {useMemo} from 'react';

import HeaderLogo from '../../assets/logo.png';

import { useGetPriceQuery } from '../../redux/services/bitcoinPrice';
import { useGetUserBitcoinsQuery, useGetUserMoneyQuery } from '../../redux/services/user';

import './header.style.css'

export default function Header() {
  const { data = 0 } = useGetPriceQuery();
  const { data: bitcoins } = useGetUserBitcoinsQuery();
  const {data: money } = useGetUserMoneyQuery();

  const price = useMemo(() => new Intl.NumberFormat('en').format(data), [data] ) ;

  return(
    <div className='header'>
      <div className='logoAndTitle'>
      <img src={HeaderLogo} alt='header logo' className='headerLogo' />
      <h1 className='text'>BITCOIN FRENZY</h1>
      </div>
      <span className='text origin'>1 BITCOIN = {price}$  </span>
      <p className='text origin'>{money}$ <br /> {bitcoins} BITCOINS</p>
    </div>
  )
};
