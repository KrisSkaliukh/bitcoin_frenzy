import * as React from 'react';
import { useDispatch } from 'react-redux';
import { changeModalTypeBitcoins } from '../../redux/bitcoinSlice';

import './sellBitcoin.style.css';
import { useGetPriceQuery } from '../../redux/services/bitcoinPrice';

export default function SellBitcoin() {
  const dispatch = useDispatch();

  const { data: bitcoinPrice = 0 } = useGetPriceQuery();
  const price = new Intl.NumberFormat('en').format(bitcoinPrice);
  
  const sellBitcoins = () => {
    dispatch(changeModalTypeBitcoins('sellBitcoins'));
  };  

  return(
    <div className='sellBitcoinWrap'>
      <p className='sellBitcoinText'>Bitcoin price is {price}$ </p> 
      <p className='sellBitcoinText'>{bitcoinPrice >= 10000 ? 'Prices are high, sell now!' : 'Prices are low, are you sure you want to sell?'}</p>
      <button onClick={sellBitcoins} className='sellBtn'>Sell Bitcoins</button>
    </div>
  );
};
