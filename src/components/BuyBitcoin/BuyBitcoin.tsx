import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { changeModalTypeBitcoins } from '../../redux/bitcoinSlice';
import { useGetPriceQuery } from '../../redux/services/bitcoinPrice';

import './buyBitcoin.style.css';

export default function BuyBitcoin() {
  const dispatch = useDispatch();

  const { data: bitcoinPrice = 0 } = useGetPriceQuery();
  const price = useMemo(() => new Intl.NumberFormat('en').format(bitcoinPrice), [bitcoinPrice]);
  
  const buyBitcoin = () => {
    dispatch(changeModalTypeBitcoins('buyBitcoin'));
  };

  return(
    <div className='buyBitcoinWrap'>
      <p className='buyBitcoinText'>Bitcoin price is {price}$ </p> 
      <p className='buyBitcoinText'> {bitcoinPrice >= 10000 ? 'Prices are high, are you sure that you want to buy?' : 'Price are low, buy more'}</p>
      <button onClick={buyBitcoin} className='BuyBtn'>Buy Bitcoins</button>
    </div>
  );
};
