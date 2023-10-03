import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGethotelbyIdQuery, useLazyGethotelbyIdQuery, useUpdateHotelMutation } from '../../services/Hotels';
import _, { result } from 'lodash';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
const provider = new GoogleAuthProvider();

function Hoteldetails() {
  var {id} = useParams()
  var { data,isLoading } = useGethotelbyIdQuery(id)
  var [ lazy ] = useLazyGethotelbyIdQuery()
  var [ updt ] = useUpdateHotelMutation()
  var [ rooms , setRooms ] = useState(null)
  var [ categories , setCategories ] = useState(null)
  var [ roomId , setRoomid ] = useState('')
  useEffect(()=>{
    if(data){
      setRooms([...data.rooms])
      setCategories([...Object.keys(_.groupBy(data.rooms,'roomType'))])
      
    }
  },[data])
  function tempChange(rid){
    var temp = data.rooms.map((room)=>{
      if(room.roomId===rid){
        return {...room,status:'occupied'}
      }
      else{
        return room
      }
    })
    console.log(temp)
    setRoomid(rid)
    setRooms([...temp])
  }
  function bookit(){
    const auth = getAuth();
    signInWithPopup(auth,provider)
    .then((result)=>{
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = result.accessToken;
      const user = result.user;
      console.log(user);
      var patient = {
        guestName:user.displayName,
        email:user.email
      }
      var temp = rooms.map((room)=>{
        if(room.roomId===roomId){
          return {...room,patients:[...room.patients,patient]}
        }
        else{
          return room
        }
      })
      updt({...data,rooms:[...temp]}).then(()=>{lazy(id)})
    }).catch((error)=>{
      console.log(error)
    });
  }
  return (
    <div>
      {
        data &&
        <>
          <h1>{data.hotelName}</h1>
          <i>{data.area}</i>
          <div>
            <h3>Rooms:</h3>
            {
              categories &&
              <>
                <ul>
                  {categories.map((category)=>{
                    return (
                      <>
                        <li>{category}</li>
                        <br/>
                        {rooms.map((room)=>{
                          if(room.roomType===category){
                            if(room.status==='open'){
                              return <span onClick={()=>{tempChange(room.roomId)}} className='bi bi-clipboard m-1'></span>
                            }
                            else{
                              return <span onClick={()=>{tempChange(room.roomId)}} className='bi bi-clipboard-fill m-1'></span>
                            }
                          }
                        })}
                      </>
                    )
                  })}
                </ul>
              </>
            }
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Book it
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Confirm booking</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  click ok to book 
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button onClick={()=>{bookit()}} type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </>
      }
    </div>
  )
}

export default Hoteldetails