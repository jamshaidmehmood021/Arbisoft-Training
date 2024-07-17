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
        >
            <span className="logo">POST APP</span>
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