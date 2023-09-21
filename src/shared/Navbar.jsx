import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" aria-current="page" to="/admindashboard">Admin dashboard</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <Outlet></Outlet>
    </div>
  )
}

export default Navbar