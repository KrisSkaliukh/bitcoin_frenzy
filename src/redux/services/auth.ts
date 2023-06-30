import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOKEN_KEY } from '../constants/localStorageKeys';

export const api = createApi({
  reducerPath: 'AuthReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/auth' }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    sugnUpUser: build.mutation<string, { email: string, login: string, password: string, countBitcoins: number, countMoney: number }>({
      query: ({ email, login, password, countBitcoins, countMoney }) => ({
        url: '/signUp',
        method: 'POST',
        body: {
            email,
            login,
            password,
            countBitcoins,
            countMoney
        }
      }),
    transformResponse: (response: { data: any }) => {
        if(!response) return null;
        return response.data
    },
    invalidatesTags: ['Auth'],    
    }),
  
    loginUser: build.mutation<{ token: any, user: { email: string, login: string, id: number } }, { email: string, password: string }>({
        query: ({email, password}) => ({
          url: '/login',
          method: 'POST',
          body: {
              email,
              password,
          }
        }),
    transformResponse: (response: any ) => {
        if(!response) return null;
        localStorage.setItem(TOKEN_KEY, response.token);
        return response.data
    },
      invalidatesTags: ['Auth'],
      }),
  })
})

export const {
  useSugnUpUserMutation,
  useLoginUserMutation
} = api
