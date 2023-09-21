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
      query: ({updatedHotel,id})=>{
        return {
          url: `${id}`,
          method:'PUT',
          body:updatedHotel
        }
      }
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetallhotelsQuery , useAddnewHotelMutation , useUpdateHotelMutation } = HotelsApi