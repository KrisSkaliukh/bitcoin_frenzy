import * as React from 'react';

import { useGetHistoryQuery } from '../../redux/services/history';

import './historySection.style.css'

export default function HistorySection() {

  const { data: history = [] } = useGetHistoryQuery();
  
  return(
    <div className='history'>
      {history.map((hist)  => (
        <React.Fragment key={hist.id}>
      <div>
        <p className='date'>{hist.date}</p>
        <p className='infoText'>{hist.text_history}</p>
      </div>
      <div className='line'></div>
      </React.Fragment>
  ))}
    </div>
  )
};