import * as React from 'react';

import MyWallet from '../../components/Wallet';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu';
import HistorySection from '../../components/HistorySection';

export default function MyWalletPage() {
  return (
    <>
      <Header />
      <div className='main'>
        <Menu />
        <MyWallet />
        <HistorySection />
      </div>
    </>
  )
}
