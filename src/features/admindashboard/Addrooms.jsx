import React, { useState } from 'react'
import { useGetallhotelsQuery, useLazyGetallhotelsQuery, useUpdateHotelMutation } from '../../services/Hotels';
import axios from 'axios';

function Addrooms() {
    var { data:hotels , isLoading } = useGetallhotelsQuery()
    var [ updateHotel ] = useUpdateHotelMutation()

    var [ selectedHotel , setSelectedhotel ] = useState(null)
    var [ selectedRoomtype , setSelectedroomtype ] = useState(null)
    var [ roomCount , setRoomcount ] = useState(0)
    var [ roomPrice , setRoomprice ] = useState(0)

    function add(){
        var rooms = []
        axios.get(`http://localhost:4000/hotels/${JSON.parse(selectedHotel).id}`).then((resp)=>{
            rooms = [...resp.data.rooms]
            var count = 0
            rooms.forEach((room)=>{
                if(room.roomType===selectedRoomtype){
                    count++
                }
            })
            for(var i=+count;i<=+count+(+roomCount)-1;i++){
                var newRoom = {
                    status:'open',
                    roomType:selectedRoomtype,
                    roomPrice,
                    patients:[],
                    roomId:`${selectedRoomtype}${i+1}`
                }
                rooms.push(newRoom)
            }
            var updatedHotel = {...JSON.parse(selectedHotel),rooms:[...rooms]}
            console.log(rooms)
            updateHotel(updatedHotel)
        })        
    }
    function xyz(e){
        setSelectedhotel(e)
    }

  return (
    <div className='border border-2 border-success m-2 p-2'>
        <h3>Addrooms</h3>
        {
            !isLoading?
            <select onChange={(e)=>{xyz(e.target.value)}}>
                <option disabled selected >select a hotel</option>
                {
                    hotels.map((hotel)=>{
                        return <option value={JSON.stringify(hotel)}>{hotel.hotelName}</option>
                    })
                }
            </select>
            :<b>wait...</b>
        }<br/>
        {
            selectedHotel?
            <select onChange={(e)=>{setSelectedroomtype(e.target.value)}}>
                <option disabled selected>select a room type</option>
                {
                    JSON.parse(selectedHotel).roomTypes.map((tp)=>{
                        return <option value={tp.roomType} >{tp.roomType}</option>
                    })
                }
            </select>
            :null
        }<br/>
        {
            selectedRoomtype?
            <>
                <input onChange={(e)=>{setRoomcount(e.target.value)}} placeholder='no.of rooms to add' type='number'/>
                <input onChange={(e)=>{setRoomprice(e.target.value)}} placeholder='price' type='number'/><br/>
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    +add rooms
                </button>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Verify room details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <span>do you want to add <b>{roomCount}</b> rooms of type <b>{selectedRoomtype}</b> of price Rs.<b>{roomPrice}</b> to <b>{JSON.parse(selectedHotel).hotelName}</b> hotel? </span><br/>
                        <b>Click ok add</b>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"  onClick={()=>{add()}}>OK</button>
                    </div>
                    </div>
                </div>
                </div>
            </>
            :null
        }


    </div>
  )
}

export default Addrooms