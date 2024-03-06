import React from 'react';

import { Link } from 'react-router-dom';

const HeaderLef = ({ toggle, setToggle }) => {
    return (
        <div className="header-left">
            <div className="header-menu" onClick={() => setToggle(prev => !prev)}>
                {
                    toggle ? <i className='bi bi-x-lg'></i> : <i className='bi bi-list'></i>
                }
            </div>
            <Link to='/'>
                <div className="header-logo">
                    <strong>BlogNa</strong>
                    <i className='bi bi-pencil'></i>
                </div>
            </Link>

        </div>
    );
}

export default HeaderLef;
