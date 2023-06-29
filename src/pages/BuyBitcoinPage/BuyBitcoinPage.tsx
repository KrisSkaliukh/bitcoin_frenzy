import * as React from 'react';

import Header from '../../components/Header/Header';
import Menu from '../../components/Menu';
import HistorySection from '../../components/HistorySection';
import BuyBitcoin from '../../components/BuyBitcoin';

export default function BuyBitcoinPage() {
  return (
    <>
    <Header />
    <div className='main'>
      <Menu />
      <BuyBitcoin />
      <HistorySection />
    </div>
  </>
  )
};
