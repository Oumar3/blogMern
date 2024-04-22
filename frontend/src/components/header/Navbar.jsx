import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggle, setToggle }) => {
    return (
        <nav onClick={() => setToggle(false)} style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} className="navbar">
            <ul className="nav-links">
                <Link to="/" onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-house"></i>Home
                </Link>
                <Link to="/posts" onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-journal"></i>Post
                </Link>
                <Link to="/post/createPost" onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-journal"></i>Create
                </Link>
                <Link to="/admin-dashbord" onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-person-check"></i>Admin
                </Link>
            </ul>
        </nav>
    );
}

export default Navbar;
