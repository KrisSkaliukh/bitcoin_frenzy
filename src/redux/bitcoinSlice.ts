import { createSlice } from "@reduxjs/toolkit";

export interface BitcoinState {
  userMoney: number,
  userBitcoins: number,
  bitcoinPrice: number
};

const initialState: BitcoinState = {
  userMoney: 10400,
  userBitcoins: 7,
  bitcoinPrice: 1000
};

export const bitcoinSlice = createSlice({
  name: 'bitcoins',
  initialState, 
  reducers: {

  }
});

export default bitcoinSlice.reducer;