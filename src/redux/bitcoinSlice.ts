import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BitcoinState {
  userMoney: number,
  userBitcoins: number,
  bitcoinPrice: number,
  isModalOpen: boolean,
};

const initialState: BitcoinState = {
  userMoney: 200,
  userBitcoins: 7,
  bitcoinPrice: 1000,
  isModalOpen: false,
};

export const bitcoinSlice = createSlice({
  name: 'bitcoins',
  initialState, 
  reducers: {
    openModal: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
    deposit: (state) => {
      state.userMoney += 100
    },
    withdraw: (state) => {
      if(state.userMoney > 0){
        state.userMoney -= 100
      }
    },
  }
});

export const { deposit, withdraw, openModal } = bitcoinSlice.actions;
export default bitcoinSlice.reducer;