import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'bitcoinPrice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/price' }),
  tagTypes: ['Bitcoins'],
  endpoints: (build) => ({
    getPrice: build.query<number, void>({
      query: () => `/`,
      transformResponse: (response: { bitcoin_price: number }[] ) => {
        if(!response || response.length === 0) return 0
        return response[0].bitcoin_price
      },
      providesTags: ['Bitcoins'],
    }),
    changePrice: build.mutation<number, {bitcoin_price: number}>({
      query: ({ bitcoin_price }) => ({
        url: '/updatePrice',
        method: 'PATCH',
        body: {
          bitcoin_price,
          id: 1
        }
      }),
      invalidatesTags: ['Bitcoins'],
    }),
  })
})

export const {
  useGetPriceQuery,
  useChangePriceMutation,
} = api