import * as React from 'react';

import Header from '../../components/Header/Header';
import Menu from '../../components/Menu';
import HistorySection from '../../components/HistorySection';
import SellBitcoin from '../../components/SellBitcoin';

export default function SellBitcoinPage() {
  return (
        <>
    <Header />
    <div className='main'>
      <Menu />
      <SellBitcoin />
      <HistorySection />
    </div>
  </>
  )
};
