import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import './historySection.style.css'

export default function HistorySection() {
  let moment = require('moment');
  const date = moment().format('DD/MM/Y HH:mm');

  const { historyArr } = useSelector((state: RootState) => state.bitcoins);
console.log(historyArr)
  return(
    <div className='history'>
      <div>
        <p className='date'>{date}</p>
        {/* <p className='infoText'>{history}</p> */}
      </div>
      <div className='line'></div>
    </div>
  )
};