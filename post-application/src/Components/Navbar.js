import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '50px'
            }}
            className='navbar'
        >
            <h1><span className="logo"><Link className="navLink" to="/">
                POST APP
            </Link></span></h1>
            <div>
                <Link className="navLink" to="/">
                    Home
                </Link>
                <Link className="navLink" to="/add">
                    Add Post
                </Link>
            </div>
        </div>
    );
};

export default Navbar;