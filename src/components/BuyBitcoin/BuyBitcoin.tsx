import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeModalTypeBitcoins, setError } from '../../redux/bitcoinSlice';

import { RootState } from '../../redux/store';

import './buyBitcoin.style.css';

export default function BuyBitcoin() {
  const dispatch = useDispatch();

  const { bitcoinPrice } = useSelector((state: RootState) => state.bitcoins);
  const price = useMemo(() => new Intl.NumberFormat('en').format(bitcoinPrice), [bitcoinPrice]);
  
  const buyBitcoin = () => {
    dispatch(changeModalTypeBitcoins('buyBitcoin'));
    dispatch(setError(''));
  };

  return(
    <div className='buyBitcoinWrap'>
      <p className='buyBitcoinText'>Bitcoin price is {price}$ </p> 
      <p className='buyBitcoinText'> {bitcoinPrice >= 10000 ? 'Prices are high, are you sure that you want to buy?' : 'Price are low, buy more'}</p>
      <button onClick={buyBitcoin} className='BuyBtn'>Buy Bitcoins</button>
    </div>
  );
};
