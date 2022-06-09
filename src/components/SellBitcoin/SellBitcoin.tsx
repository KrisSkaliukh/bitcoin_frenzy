import * as React from 'react';

import './sellBitcoin.style.css';

export default function SellBitcoin() {
  return(
    <div className='sellBitcoinWrap'>
      <p className='sellBitcoinText'>Bitcoin price is 1,000$ </p> 
      <p className='sellBitcoinText'>Price are high, sell now!</p>
      <button className='sellBtn'>Sell 1 Bitcoin</button>
    </div>
  );
};
