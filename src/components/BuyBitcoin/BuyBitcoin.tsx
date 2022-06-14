import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeModalTypeBitcoins } from '../../redux/bitcoinSlice';

import { RootState } from '../../redux/store';

import './buyBitcoin.style.css';

export default function BuyBitcoin() {
  const dispatch = useDispatch();

  const { bitcoinPrice, userMoney } = useSelector((state: RootState) => state.bitcoins);
  const price = useMemo(() => new Intl.NumberFormat('en').format(bitcoinPrice), [bitcoinPrice]);
  
  const buyBitcoin = () => {
    if(userMoney >= bitcoinPrice){
      dispatch(changeModalTypeBitcoins('buyBitcoin'));
    }else{
      alert("You can`t buy bitcoins!!!")
    }
  };

  return(
    <div className='buyBitcoinWrap'>
      <p className='buyBitcoinText'>Bitcoin price is {price}$ </p> 
      <p className='buyBitcoinText'>Price are low, buy more </p>
      <button onClick={buyBitcoin} className='BuyBtn'>Buy Bitcoins</button>
    </div>
  );
};
