import * as React from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { changeModalTypePrice } from '../../redux/bitcoinSlice';
import { RootState } from '../../redux/store';

import './bitcoinPrice.style.css';

export default function BitcoinPrice() {
  const dispatch = useDispatch()
  
  const bitcoinPrice = useSelector((state: RootState) => state.bitcoins.bitcoinPrice);
  const price = React.useMemo(() => new Intl.NumberFormat('en').format(bitcoinPrice), [bitcoinPrice]);

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
