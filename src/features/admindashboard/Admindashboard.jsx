import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Admindashboard() {
  return (
    <div className='m-2 p-2'>
        <Link to="/admindashboard/addhotel"><button className='btn btn-success'>+Add hotel</button></Link>&nbsp;&nbsp;
        <Link to="/admindashboard/addrooms"><button className='btn btn-success'>+Add rooms</button></Link>
        <br/>
        <Outlet></Outlet>
    </div>
  )
}

export default Admindashboard