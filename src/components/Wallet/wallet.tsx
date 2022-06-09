import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { openModal, withdraw } from '../../redux/bitcoinSlice';
import { RootState } from '../../redux/store';
import WalletModal from '../WalletModal/WalletModal';

import './wallet.style.css';

export default function Wallet() {
  const dispatch = useDispatch();

  const userBitcoins = useSelector((state: RootState) => state.bitcoins.userBitcoins);;

  const depositMoney = () => {
    dispatch(openModal(true));
  };

  const withdrawMoney = () => {
    dispatch(withdraw());
  };


  return(
    <div className='walletWrap'>
      <p className='walletText'>Your Bitcoin wallet </p> 
      <p className='walletText styled'>You now own {userBitcoins} Bitcoins</p>
      <button onClick={depositMoney} className='walletBtn'>Deposit 100$</button>
      <button onClick={withdrawMoney} className='walletBtn'>Withdraw 100$</button>
      <WalletModal />
    </div>
  );
};
