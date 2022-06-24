import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { changeModalTypePrice } from '../../redux/bitcoinSlice';
import { useGetPriceQuery } from '../../redux/services/bitcoinPrice';

import './bitcoinPrice.style.css';

export default function BitcoinPrice() {
  const dispatch = useDispatch()
  
  const { data: bitcoinPrice = 0} = useGetPriceQuery();
  const price = useMemo(() => new Intl.NumberFormat('en').format(bitcoinPrice), [bitcoinPrice]);

  const openIncrease = () => {
    dispatch(changeModalTypePrice('Increase'));
  };

  const openDecrease = () => {
    dispatch(changeModalTypePrice('Decrease'));
  };

  return(
    <div className='bitcoinWrap'>
      <p className='bitcoinText'>Bitcoin price is {price}$ </p> 
      <button onClick={openIncrease} className='priceBtn'>Increase Bitcoin Price</button>
      <button onClick={openDecrease} className='priceBtn'>Decrease Bitcoin Price</button>
    </div>
  );
};
