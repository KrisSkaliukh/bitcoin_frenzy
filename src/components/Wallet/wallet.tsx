import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeModalType } from '../../redux/bitcoinSlice';
import { RootState } from '../../redux/store';
import WalletModal from '../WalletModal/WalletModal';

import './wallet.style.css';

export default function Wallet() {
  const dispatch = useDispatch();

  const userBitcoins = useSelector((state: RootState) => state.bitcoins.userBitcoins);

  const depositMoney = () => {
    dispatch(changeModalType('deposit'));
  };

  const withdrawMoney = () => {
    dispatch(changeModalType('withdraw'));
  };


  return(
    <div className='walletWrap'>
      <p className='walletText'>Your Bitcoin wallet </p> 
      <p className='walletText styled'>You now own {userBitcoins} Bitcoins</p>
      <button onClick={depositMoney} className='walletBtn'>Deposit</button>
      <button onClick={withdrawMoney} className='walletBtn'>Withdraw</button>
      <WalletModal />
    </div>
  );
};
