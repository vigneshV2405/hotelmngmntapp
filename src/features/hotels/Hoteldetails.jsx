import React from 'react'
import { useParams } from 'react-router-dom'
import { useGethotelbyIdQuery } from '../../services/Hotels'

function Hoteldetails() {
    var { id } = useParams()
    var { data , isLoading } = useGethotelbyIdQuery(id)
    console.log(data)
  return (
    <div>
        
    </div>
  )
}

export default Hoteldetails