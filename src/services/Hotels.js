// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const HotelsApi = createApi({
  reducerPath: 'HotelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/hotels/' }),
  endpoints: (builder) => ({
    getallhotels: builder.query({
      query: () => '',
    }),
    gethotelbyId: builder.query({
      query: (id)=> `${id}`
    }),
    addnewHotel: builder.mutation({
        query: (n) => {
            return {
                url:'',
                method:'POST',
                body:n
            }
        }
    }),
    updateHotel: builder.mutation({
      query: (uh)=>{
        return {
          url: `${uh.id}`,
          method:'PUT',
          body:uh
        }
      }
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetallhotelsQuery,
  useAddnewHotelMutation,
  useUpdateHotelMutation,
  useGethotelbyIdQuery,
  useLazyGetallhotelsQuery
} = HotelsApi