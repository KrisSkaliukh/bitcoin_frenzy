import * as React from 'react';

import './buyBitcoin.style.css';

export default function BuyBitcoin() {
  return(
    <div className='buyBitcoinWrap'>
      <p className='buyBitcoinText'>Bitcoin price is 1,000$ </p> 
      <p className='buyBitcoinText'>Price are low, buy more </p>
      <button className='BuyBtn'>Buy 1 Bitcoin</button>
    </div>
  );
};
