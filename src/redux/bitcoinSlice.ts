import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BitcoinState {
  userMoney: number,
  userBitcoins: number,
  bitcoinPrice: number,
  isModalOpen: boolean,
  modalType: string
};

const initialState: BitcoinState = {
  userMoney: 200,
  userBitcoins: 7,
  bitcoinPrice: 1000,
  isModalOpen: false,
  modalType: ''
};

export const bitcoinSlice = createSlice({
  name: 'bitcoins',
  initialState, 
  reducers: {
    openModal: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
    changeModalType: (state, action: PayloadAction<string>) => {
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

export const { deposit, withdraw, openModal, changeModalType } = bitcoinSlice.actions;
export default bitcoinSlice.reducer;