import * as React from 'react';

import './wallet.style.css';

export default function MyWallet() {
  return(
    <div className='walletWrap'>
      <p className='walletText'>Your Bitcoin wallet </p> 
      <p className='walletText styled'>You now own 7 Bitcoins</p>
      <button className='walletBtn'>Deposit 100$</button>
      <button className='walletBtn'>Withdraw 100$</button>
    </div>
  );
};
