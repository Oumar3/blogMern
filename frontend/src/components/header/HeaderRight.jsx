import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const HeaderRight = () => {
    const { user } = useSelector(state => state.auth)
    const [dropdown, setDropdow] = useState(false)
    return (
        <div className="header-right">
            {user ?
                <>
                    <div className="header-right-user-info">
                        <span onClick={() => setDropdow(prev => !prev)} className='header-right-username'>{user.username}</span>
                        <img onClick={() => setDropdow(prev => !prev)} className='header-right-user-photo' src={user?.profilePhoto.url} alt="" />
                        {
                            dropdown && (
                                <div className="header-dropdown">
                                    <Link onClick={() => setDropdow(false)} className="header-dropdown-item" to={`/profile/${user?._id}`}>
                                        <i className="bi bi-file-person"></i>
                                        <span>Profile</span>
                                    </Link>
                                    <div className="header-dropdown-item">
                                        <i className="bi bi-box-arrow-in-left"></i>
                                        <span>Logout</span>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </>
                : (
                    <>
                        <Link to="/login" className="header-right-link">
                            <i className="bi bi-box-arrow-in-right"></i>
                            <span>Login</span>
                        </Link>
                        <Link to="/register" className="header-right-link">
                            <i className="bi bi-person-plus"></i>
                            <span>Register</span>
                        </Link>
                    </>
                )}
        </div>
    );
}

export default HeaderRight;
