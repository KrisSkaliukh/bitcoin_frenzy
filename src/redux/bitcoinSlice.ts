import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = '' | 'deposit' | 'withdraw';
export type ModalTypeBitcoins = '' | 'buyBitcoin' | 'sellBitcoins';
export type ModalTypePrise = '' | 'Increase' | 'Decrease';

export interface BitcoinState {
  userMoney: number,
  userBitcoins: number,
  bitcoinPrice: number,
  modalType: ModalType
  modalTypeBitcoins: ModalTypeBitcoins,
  modalTypePrice: ModalTypePrise,
  historyArr: [{ id: number, history: string, date: string }]
};

const initialState: BitcoinState = {
  userMoney: 200,
  userBitcoins: 7,
  bitcoinPrice: 1000,
  modalType: '',
  modalTypeBitcoins: '',
  modalTypePrice: '',
  historyArr: [{ id: 0, history: '', date: ''}]
};

export const bitcoinSlice = createSlice({
  name: 'bitcoins',
  initialState, 
  reducers: {
    changeModalTypeBitcoins: (state, action: PayloadAction<ModalTypeBitcoins>) => {
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
      state.historyArr.history = state.historyArr.push(action.payload)
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
  setHistory
} = bitcoinSlice.actions;

export default bitcoinSlice.reducer;