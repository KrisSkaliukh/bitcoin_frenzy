import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BitcoinPricePage from './pages/BitcoinPricePage';
import BuyBitcoinPage from './pages/BuyBitcoinPage';
import MyWalletPage from './pages/MyWalletPage';
import SellBitcoinPage from './pages/SellBitcoinPage';
import BuyAnsSellModal from './components/BuyAndSellModalWindow/BuyAndSellModal';
import SignUpPage from './pages/SignUp/SignUp';
import WelcomePage from './pages/Welcome/Welcome';
import LoginPage from './pages/Login/Login';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage />}/>
        <Route path='/sign-up' element={<SignUpPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/wallet' element={<MyWalletPage />}/>
        <Route path='/buy' element={<BuyBitcoinPage />}/>
        <Route path='/sell' element={<SellBitcoinPage />}/>
        <Route path='/bitcoin' element={<BitcoinPricePage />}/>
      </Routes>
      <BuyAnsSellModal />
    </BrowserRouter>
  );
}
