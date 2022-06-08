import * as React from 'react';

import './myWallet.style.css';

export default function MyWallet() {
  return(
    <div className='walletWrap'>
    <p className='walletText'>Your Bitcoin wallet <br /> You now own 7 Bitcoins</p>
    <button className='walletBtn'>Deposit 100$</button>
    <button className='walletBtn'>Withdraw 100$</button>
    </div>
  );
};
