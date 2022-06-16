import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = '' | 'deposit' | 'withdraw';
export type ModalTypeBitcoins = '' | 'buyBitcoin' | 'sellBitcoins';
export type Error = '' | 'not money' | 'not bitcoins';

export interface BitcoinState {
  userMoney: number,
  userBitcoins: number,
  bitcoinPrice: number,
  modalType: ModalType
  modalTypeBitcoins: ModalTypeBitcoins,
  error: Error
};

const initialState: BitcoinState = {
  userMoney: 200,
  userBitcoins: 7,
  bitcoinPrice: 1000,
  modalType: '',
  modalTypeBitcoins: '',
  error: ''
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
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload
    },
  }
});

export const { deposit, withdraw, changeModalType, buyBitcoin, sellBitcoin, changeModalTypeBitcoins, setError } = bitcoinSlice.actions;
export default bitcoinSlice.reducer;