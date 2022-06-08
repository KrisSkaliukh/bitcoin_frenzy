import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import BitcoinPricePage from './pages/BitcoinPricePage';
import BuyBitcoinPage from './pages/BuyBitcoinPage';
import MyWalletPage from './pages/MyWalletPage';
import SellBitcoinPage from './pages/SellBitcoinPage';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/wallet' element={<MyWalletPage />}/>
        <Route path='/buy' element={<BuyBitcoinPage />}/>
        <Route path='/sell' element={<SellBitcoinPage />}/>
        <Route path='/bitcoin' element={<BitcoinPricePage />}/>
      </Routes>
    </BrowserRouter>
  );
}
