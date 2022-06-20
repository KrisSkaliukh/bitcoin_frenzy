import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import './historySection.style.css'

export default function HistorySection() {
  const { historyArr } = useSelector((state: RootState) => state.bitcoins);
  
  return(
    <div className='history'>
      {historyArr.map((hist)  => (
        <React.Fragment key={hist.id}>
      <div>
        <p className='date'>{hist.date}</p>
        <p className='infoText'>{hist.history}</p>
      </div>
      <div className='line'></div>
      </React.Fragment>
  ))}
    </div>
  )
};