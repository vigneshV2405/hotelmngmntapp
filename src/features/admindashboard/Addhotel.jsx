import React, { useState } from 'react';
import { Formik } from 'formik';
import { useAddnewHotelMutation } from '../../services/Hotels';

function Addhotel(){
  var [ newHotel , setNewHotel ] = useState({})
  const [ Rtypes  ] = useState(['Non A/C','A/C','Luxurious'])
  var [ rtype , setRtype ] = useState({})
  var [ SelectedRoomtypes , setSelectedrtypes ] = useState([])
  var [ addH ] = useAddnewHotelMutation()
  return (
    <div className='border border-2 border-danger p-2 m-2'>
      <h1>Enter hotel details</h1>
      <Formik
        initialValues={
          {
            hotelName: '',
            image: '',
            area:'',
            reviews:[],
            roomTypes:[],
            rooms:[]
          }
        }
        onSubmit={(values) => {
          addH({...values,roomTypes:SelectedRoomtypes})
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="hotelName"
              placeholder='enter hotel name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.hotelName}
            /><br/>
            <input
              type="text"
              name="image"
              placeholder='image address'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.image}
            /><br/>
            <input
              type="text"
              name="area"
              placeholder='enter hotel location'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.area}
            /><br/>

            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Add a room type
            </button><br/>
            {
              SelectedRoomtypes.length>0?
              <>
                <span>Added room types</span><br/>
                {
                  <ol>
                    {SelectedRoomtypes.map((tp)=>{
                      return <li><i>{tp.roomType}</i> - {tp.price}</li>
                    })}
                  </ol>
                }
              </>
              :null
            }

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <select onChange={(e)=>{setRtype({...rtype,roomType:e.target.value})}}>
                      <option disabled selected>select room type</option>
                      {
                        Rtypes.map((type)=>{
                          return <option value={type}>{type}</option>
                        })
                      }
                    </select>
                    <input type="number" onChange={(e)=>{setRtype({...rtype,price:e.target.value})}}></input>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{setSelectedrtypes([...SelectedRoomtypes,rtype])}}>Save changes</button>
                  </div>
                </div>
              </div>
            </div><br/><br/>
            
            <button type="submit" className='btn btn-primary'>
              Submit
            </button>
          </form>
        )}
      </Formik>
      
    </div>
  );
}

export default Addhotel;