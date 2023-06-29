import * as React from 'react';

import BitcoinPrice from '../../components/BitcoinPrice';
import PriceModal from '../../components/PriceModal';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu';
import HistorySection from '../../components/HistorySection';

export default function SellBitcoinPage() {
  return (
        <>
    <Header />
    <div className='main'>
      <Menu />
      <BitcoinPrice />
      <PriceModal />
      <HistorySection />
    </div>
  </>
  )
};
