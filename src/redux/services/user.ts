import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'userInfo',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/users' }),
  tagTypes: ['UserMoney', 'UserBitcoins' ],
  endpoints: (build) => ({
    getUserMoney: build.query<number, void>({
      query: () => '/money/1',
      transformResponse: (response: { count_money: number } ) => {
        if(!response) return 1
        return response.count_money
      },
    providesTags: ['UserMoney'],
    }),
    getUserBitcoins: build.query<any, void>({
      query: () => '/bitcoins/1',
      transformResponse: (response: { count_bitcoins: number } ) => {
        if(!response) return 0
        return response.count_bitcoins
      },
    providesTags: ['UserBitcoins'],
    }),
    changeMoneyCount: build.mutation<any, { count_money: any }>({
      query: ({count_money}) => ({
        url: '/updateMoneyCount/1',
        method: 'PATCH',
        body: {
          count_money,
        }
      }),
    invalidatesTags: ['UserMoney'],    
    }),
    changeBitcoinsCount: build.mutation<any, { count_bitcoins: number }>({
      query: ({count_bitcoins}) => ({
        url: '/updateBitcoinsCount/1',
        method: 'PATCH',
        body: {
          count_bitcoins,
        }
      }),
    invalidatesTags: ['UserBitcoins'],
    }),
  })
})

export const {
  useGetUserBitcoinsQuery,
  useGetUserMoneyQuery,
  useChangeMoneyCountMutation,
  useChangeBitcoinsCountMutation
} = api
