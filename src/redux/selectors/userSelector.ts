import { BitcoinState } from "../bitcoinSlice";

export const selectUserId = (state: BitcoinState) => state.userId;
