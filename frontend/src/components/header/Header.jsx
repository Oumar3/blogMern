import React, { useState } from 'react';
import './header.css'
import HeaderLeft from './HeaderLef'
import Navbar from './Navbar'
import HeaderRight from './HeaderRight'
const Header = () => {
    const [toggle, setToggle] = useState(false)

    return (
        <div className="header">
            <HeaderLeft toggle={toggle} setToggle={setToggle} />
            <Navbar toggle={toggle} setToggle={setToggle} />
            < HeaderRight />
        </div >
    );
}

export default Header;
