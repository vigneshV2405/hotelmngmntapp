import React, { useState } from 'react'
import { useGetallhotelsQuery } from '../../services/Hotels'

function Addrooms() {
    var { data:hotels , isLoading } = useGetallhotelsQuery()
    var [ selectedHotel , setSelectedhotel ] = useState(null)
  return (
    <div className='border border-2 border-success m-2 p-2'>
        <h3>Addrooms</h3>
        {
            !isLoading?
            <select onChange={(e)=>{setSelectedhotel(e.target.value)}}>
                <option disabled selected >select a hotel</option>
                {
                    hotels.map((hotel)=>{
                        return <option value={JSON.stringify(hotel)}>{hotel.hotelName}</option>
                    })
                }
            </select>
            :<b>wait...</b>
        }
        {
            selectedHotel?
            <select>
                <option disabled selected>select a room type</option>
                {
                    JSON.parse(selectedHotel).roomTypes.map((tp)=>{
                        return <option value={tp.roomType} >{tp.roomType}</option>
                    })
                }
            </select>
            :null
        }

    </div>
  )
}

export default Addrooms