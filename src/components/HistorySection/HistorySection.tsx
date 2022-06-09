import * as React from 'react';

import './historySection.style.css'

export default function History() {
  return(
    <div className='history'>
      <div>
        <p className='date'> 09/06/2022 12:15</p>
        <p className='infoText'>Purchased 1 Bitcoin</p>
      </div>
      <div className='line'></div>
      <div>
        <p className='date'> 09/06/2022 10:45</p>
        <p className='infoText'>Increased Bitcoin price by 1,000$</p>
      </div>
      <div className='line'></div>
      <div>
        <p className='date'> 09/06/2022 10:34</p>
        <p className='infoText'>Increased Bitcoin price by 1,000$</p>
      </div>
      <div className='line'></div>
    </div>
  )
};