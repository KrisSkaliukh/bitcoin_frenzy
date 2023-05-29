import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOKEN_KEY } from '../constants/localStorageKeys';

export const api = createApi({
  reducerPath: 'AuthReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/auth' }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    sugnUpUser: build.mutation<string, { email: string, login: string, password: string }>({
      query: ({email, login, password}) => ({
        url: '/signUp',
        method: 'POST',
        body: {
            email,
            login,
            password,
        }
      }),
    transformResponse: (response: { user: any }) => {
        if(!response) return null;
        return response.user
    },
    invalidatesTags: ['Auth'],    
    }),
    loginUser: build.mutation<string, { email: string, password: string }>({
        query: ({email, password}) => ({
          url: '/login',
          method: 'POST',
          body: {
              email,
              password,
          }
        }),
    transformResponse: (response: { user: any }) => {
        if(!response) return null;
        localStorage.setItem(TOKEN_KEY, response.user.token);
        return response.user
    },
      invalidatesTags: ['Auth'],    
      }),
  })
})

export const {
  useSugnUpUserMutation,
  useLoginUserMutation
} = api