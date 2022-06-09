import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import './sellBitcoin.style.css';

export default function SellBitcoin() {
  const bitcoinPrice = useSelector((state: RootState) => state.bitcoins.bitcoinPrice);
  const price = new Intl.NumberFormat('en').format(bitcoinPrice);
  
  return(
    <div className='sellBitcoinWrap'>
      <p className='sellBitcoinText'>Bitcoin price is {price}$ </p> 
      <p className='sellBitcoinText'>Price are high, sell now!</p>
      <button className='sellBtn'>Sell 1 Bitcoin</button>
    </div>
  );
};
