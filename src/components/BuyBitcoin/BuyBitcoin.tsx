import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import './buyBitcoin.style.css';

export default function BuyBitcoin() {
  const bitcoinPrice = useSelector((state: RootState) => state.bitcoins.bitcoinPrice);
  const price = new Intl.NumberFormat('en').format(bitcoinPrice);
  
  return(
    <div className='buyBitcoinWrap'>
      <p className='buyBitcoinText'>Bitcoin price is {price}$ </p> 
      <p className='buyBitcoinText'>Price are low, buy more </p>
      <button className='BuyBtn'>Buy 1 Bitcoin</button>
    </div>
  );
};
