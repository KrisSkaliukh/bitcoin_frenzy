import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import './bitcoinPrice.style.css';

export default function BitcoinPrice() {
  const bitcoinPrice = useSelector((state: RootState) => state.bitcoins.bitcoinPrice);
  const price = new Intl.NumberFormat('en').format(bitcoinPrice);

  return(
    <div className='bitcoinWrap'>
      <p className='bitcoinText'>Bitcoin price is {price}$ </p> 
      <button className='priceBtn'>Increase Bitcoin Price (+1000)</button>
      <button className='priceBtn'>Decrease Bitcoin Price (+1000)</button>
    </div>
  );
};
