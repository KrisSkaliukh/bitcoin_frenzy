import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const moment = require('moment');
const date = moment().format('DD/MM/Y HH:mm');

export const api = createApi({
  reducerPath: 'HistoryReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/history' }),
  tagTypes: ['History'],
  endpoints: (build) => ({
    addHistory: build.mutation<string, { text_history: string}>({
      query: ({text_history}) => ({
        url: '/',
        method: 'POST',
        body: {
          text_history,
          date: date,
        }
      }),
    invalidatesTags: ['History'],    
    }),
    getHistory: build.query<{id: number, text_history: string, date: string}[], void>({
      query: () => '/userHist',
      providesTags: ['History'],
    }),
  })
})

export const {
  useAddHistoryMutation,
  useGetHistoryQuery
} = api
