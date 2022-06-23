import * as React from 'react';
import { useDispatch } from 'react-redux';

import { changeModalType } from '../../redux/bitcoinSlice';
import { useGetUserBitcoinsQuery } from '../../redux/services/user';
import WalletModal from '../WalletModal/WalletModal';

import './wallet.style.css';

export default function Wallet() {
  const dispatch = useDispatch();

  const { data: userBitcoins } = useGetUserBitcoinsQuery();

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
