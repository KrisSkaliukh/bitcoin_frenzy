import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import HistorySection from './components/HistorySection';
import Menu from './components/Menu';
import BitcoinPricePage from './pages/BitcoinPricePage';
import BuyBitcoinPage from './pages/BuyBitcoinPage';
import MyWalletPage from './pages/MyWalletPage';
import SellBitcoinPage from './pages/SellBitcoinPage';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='main'>
      <Menu />
      <Routes>
        <Route path='/wallet' element={<MyWalletPage />}/>
        <Route path='/buy' element={<BuyBitcoinPage />}/>
        <Route path='/sell' element={<SellBitcoinPage />}/>
        <Route path='/bitcoin' element={<BitcoinPricePage />}/>
      </Routes>
      <HistorySection />
      </div>
    </BrowserRouter>
  );
}
