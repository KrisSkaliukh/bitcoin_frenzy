import { configureStore } from '@reduxjs/toolkit';

import bitcoinReducer from './bitcoinSlice';

import { api } from './services/bitcoinPrice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    bitcoins: bitcoinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;