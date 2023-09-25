import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGethotelbyIdQuery } from '../../services/Hotels'
import _ from 'lodash';

function Hoteldetails() {
    var { id } = useParams()
    var { data , isLoading } = useGethotelbyIdQuery(id)
    //var [ roomsByCategory , setRoomsbycategory ] = useState(null)
    var roomsByCategory = {}
    if(!isLoading){
      //setRoomsbycategory(_.groupBy(data.rooms,'roomType'))
      roomsByCategory = _.groupBy(data.rooms,'roomType')
    }
    
  return (
    <div>
        {
          !isLoading && 
          <>
            <h1>{data.hotelName}</h1>
            <i>Location: {data.area}</i>
            <h4>Rooms:</h4>
            {Object.keys(roomsByCategory).map((category)=>{
              return (
                <h5>
                  {category}:
                  {
                    data.rooms.map((room)=>{
                      if(room.roomType===category){
                        return <i>{room.roomId}</i>
                      }
                    })
                  }
                </h5>
              )
            })}
          </>
        }
    </div>
  )
}

export default Hoteldetails