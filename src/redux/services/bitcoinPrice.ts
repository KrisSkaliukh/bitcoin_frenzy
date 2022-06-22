import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'bitcoinPrice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/price' }),
  endpoints: (build) => ({
    getPrice: build.query<any, void>({
      query: () => '/',
      transformResponse: (response: { bitcoin_price: number }[] ) => {
        if(!response || response.length === 0) return 0
        return response[0].bitcoin_price
      }
    }),
    changePrice: build.mutation<any, {bitcoin_price: number}>({
      query: ({bitcoin_price}) => ({
        url: '/update',
        method: 'PATCH',
        body: {
          bitcoin_price,
        }
      })
    }),
  })
})

export const {
  useGetPriceQuery,
  useChangePriceMutation,
} = api