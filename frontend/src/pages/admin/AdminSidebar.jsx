import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className='admin-sidebar'>
            <Link to='/admin-dashbord' className='admin-sidebar-title'>
                <i className="bi bi-columns"></i>
                Dashboard
            </Link>
            <ul className="admin-dashboard-list">
                <Link className='admin-sidebar-link' to="/admin-dashbord/users-table">
                    <i className="bi bi-person"></i>
                    Users
                </Link>
                <Link className='admin-sidebar-link' to="/admin-dashbord/posts-table">
                    <i className="bi bi-phone"></i>
                    Posts
                </Link>
                <Link className='admin-sidebar-link' to="/admin-dashboard/categories-table">
                    <i className="bi bi-tag-fill"></i>
                    Categories
                </Link>
                <Link className='admin-sidebar-link' to="/admin-dashboard/comments-table">
                    <i className="bi bi-chat-left-text"></i>
                    Comments
                </Link>
            </ul>
        </div>
    );
}

export default AdminSidebar;
