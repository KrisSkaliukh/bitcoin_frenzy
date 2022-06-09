import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import './wallet.style.css';

export default function MyWallet() {
  const userBitcoins = useSelector((state: RootState) => state.bitcoins.userBitcoins);;

  return(
    <div className='walletWrap'>
      <p className='walletText'>Your Bitcoin wallet </p> 
      <p className='walletText styled'>You now own {userBitcoins} Bitcoins</p>
      <button className='walletBtn'>Deposit 100$</button>
      <button className='walletBtn'>Withdraw 100$</button>
    </div>
  );
};
