import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">The GEO App</Link>
                    </div>
                </div>
            </nav>    

            <br/>     
        </div>
    )
}

export default Navbar;
