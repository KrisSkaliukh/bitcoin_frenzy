import { configureStore } from '@reduxjs/toolkit';

import bitcoinReducer from './bitcoinSlice';

import { api } from './services/bitcoinPrice';
import { api as userApi } from './services/user';
import { api as historyApi } from './services/history';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    bitcoins: bitcoinReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(userApi.middleware)
      .concat(historyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;