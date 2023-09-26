import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGethotelbyIdQuery, useLazyGethotelbyIdQuery, useUpdateHotelMutation } from '../../services/Hotels'
import _ from 'lodash';

function Hoteldetails() {
    var { id } = useParams()
    var { data , isLoading } = useGethotelbyIdQuery(id)
    var [ rld ] = useLazyGethotelbyIdQuery()
    var [ updateHotel ] = useUpdateHotelMutation()
    //var [ roomsByCategory , setRoomsbycategory ] = useState(null)
    var roomsByCategory = {}
    if(!isLoading){
      //setRoomsbycategory(_.groupBy(data.rooms,'roomType'))
      roomsByCategory = _.groupBy(data.rooms,'roomType')
    }
    function changeStatus(rid){
      var newStatus = data.rooms.map((room)=>{
        if(room.roomId===rid){
          return {...room,status:'occupied'}
        }
        else{
          return {...room}
        }
      })
      updateHotel({...data,rooms:[...newStatus]}).then(()=>{rld(id)})
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
                <>
                  <h5>
                    {category}:
                  </h5>
                  {
                    data.rooms.map((room)=>{
                      if(room.roomType===category){
                        if(room.status==='open'){
                          return <i onClick={()=>{changeStatus(room.roomId)}} className='bi bi-clipboard m-1' style={{fontSize:'25px'}}></i>
                        }
                        else{
                          return <i onClick={()=>{changeStatus(room.roomId)}} className='bi bi-clipboard-fill m-1' style={{fontSize:'25px'}}></i>
                        }
                      }
                    })
                  }
                </>
              )
            })}
          </>
        }
    </div>
  )
}

export default Hoteldetails