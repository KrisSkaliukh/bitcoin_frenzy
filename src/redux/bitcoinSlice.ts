import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = '' | 'deposit' | 'withdraw';
export type ModalTypeBitcoins = '' | 'buyBitcoin' | 'sellBitcoins';
export type ModalTypePrise = '' | 'Increase' | 'Decrease';

export interface BitcoinState {
  userId: number;
  userMoney: number,
  userBitcoins: number,
  bitcoinPrice: number,
  modalType: ModalType
  modalTypeBitcoins: ModalTypeBitcoins,
  modalTypePrice: ModalTypePrise,
  historyArr: { id: number, history: string, date: string }[]
};

const initialState: BitcoinState = {
  userId: 0,
  userMoney: 0,
  userBitcoins: 7,
  bitcoinPrice: 0,
  modalType: '',
  modalTypeBitcoins: '',
  modalTypePrice: '',
  historyArr: [{ id: 1, history: '', date: ''}]
};

export const bitcoinSlice = createSlice({
  name: 'bitcoins',
  initialState, 
  reducers: {
    changeModalTypeBitcoins: (state: BitcoinState, action: PayloadAction<ModalTypeBitcoins>) => {
      state.modalTypeBitcoins = action.payload
    },
    changeModalType: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload
    },
    changeModalTypePrice: (state, action: PayloadAction<ModalTypePrise>) => {
      state.modalTypePrice = action.payload
    },
    deposit: (state, action: PayloadAction<number>) => {
      state.userMoney += action.payload
    },
    withdraw: (state, action: PayloadAction<number> ) => {
      if(state.userMoney > 0){
        state.userMoney -= action.payload
      }
    },
    buyBitcoin: (state, action: PayloadAction<number>) => {
        state.userBitcoins += action.payload
    },
    sellBitcoin: (state, action: PayloadAction<number>) => {
      if(state.userBitcoins > 0 && state.userBitcoins >= action.payload){
        state.userBitcoins -= action.payload
      }
    },
    increaseBicoinPrice: (state, action: PayloadAction<number>) => {
      state.bitcoinPrice += action.payload
    }, 
    descreaseBicoinPrice: (state, action: PayloadAction<number>) => {
      if(state.bitcoinPrice > 0){
        state.bitcoinPrice -= action.payload
      }
    },
    setHistory: (state, action: PayloadAction<string>) => {
      let moment = require('moment');
      const date = moment().format('DD/MM/Y HH:mm');
  
      state.historyArr.push({ id: state.historyArr.length+1, history: action.payload, date: date });
    },
    setUserId: (state, action: PayloadAction<number> ) => {
      state.userId -= action.payload
    },
  }
});

export const {
  deposit,
  withdraw,
  changeModalType,
  buyBitcoin,
  sellBitcoin,
  changeModalTypeBitcoins,
  changeModalTypePrice,
  increaseBicoinPrice,
  descreaseBicoinPrice,
  setHistory, 
  setUserId
} = bitcoinSlice.actions;

export default bitcoinSlice.reducer;
