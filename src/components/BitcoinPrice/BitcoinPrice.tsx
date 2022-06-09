import * as React from 'react';

import './bitcoinPrice.style.css';

export default function BitcoinPrice() {
  return(
    <div className='bitcoinWrap'>
      <p className='bitcoinText'>Bitcoin price is 1,000$ </p> 
      <button className='priceBtn'>Increase Bitcoin Price (+1000)</button>
      <button className='priceBtn'>Decrease Bitcoin Price (+1000)</button>
    </div>
  );
};
