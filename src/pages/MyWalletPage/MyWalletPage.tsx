import * as React from 'react';

import MyWallet from '../../components/MyWallet';
import Menu from '../../components/Menu';
import HistorySection from '../../components/HistorySection';

import './myWalletPage.style.css'

export default function MyWalletPage() {
  return (
    <div className='walletPageWrap'>
    <Menu />
    <MyWallet />
    <HistorySection />
    </div>
  )
}
