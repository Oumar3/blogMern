import React from 'react';

const Navbar = ({ toggle, setToggle }) => {
    return (
        <nav onClick={() => setToggle(false)} style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} className="navbar">
            <ul className="nav-links">
                <li onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-house"></i>Home
                </li>
                <li onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-journal"></i>Post
                </li>
                <li onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-journal"></i>Create
                </li>
                <li onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-person-check"></i>Admin-Dashboard
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
