import React from 'react'
import { useGetallhotelsQuery } from '../../services/Hotels'
import { Link } from 'react-router-dom'

function Hotels() {
    var { data:hotels , isLoading } = useGetallhotelsQuery()
  return (
    <div>
        {
            !isLoading?
            <div className='border border-2 border-warning m-2 p-2 d-flex flex-wrap'>
                {hotels.map((hotel)=>{
                    return (
                        <div className='w-25 border border-2 border-secondary m-2 p-2'>
                            <img className='w-100 rounded' src={hotel.image} />
                            <h4>{hotel.hotelName}</h4>
                            <i>{hotel.area}</i><br/>
                            <Link to={`details/${hotel.id}`}><i className='btn btn-primary m-0 p-0'>view more</i></Link>
                        </div>
                    )
                })}
            </div>
            :null
        }
    </div>
  )
}

export default Hotels