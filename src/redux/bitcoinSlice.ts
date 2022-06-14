import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = '' | 'deposit' | 'withdraw'
export interface BitcoinState {
  userMoney: number,
  userBitcoins: number,
  bitcoinPrice: number,
  modalType: ModalType
};

const initialState: BitcoinState = {
  userMoney: 200,
  userBitcoins: 7,
  bitcoinPrice: 1000,
  modalType: ''
};

export const bitcoinSlice = createSlice({
  name: 'bitcoins',
  initialState, 
  reducers: {
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
  }
});

export const { deposit, withdraw, changeModalType } = bitcoinSlice.actions;
export default bitcoinSlice.reducer;