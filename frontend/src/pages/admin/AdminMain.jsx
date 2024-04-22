import React from 'react';
import { Link } from 'react-router-dom';
import AddCategoryForm from './AddCategoryForm';
const AdminMain = () => {
    return (
        <div className='admin-main'>
            <div className="admin-main-header">
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Users</h5>
                    <div className="admin-card-count">120</div>
                    <div className="admin-card-link-wrapper">
                        <Link className="admin-card-link" to="/admin-dashbord/users-table">See all users</Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-person"></i>
                        </div>
                    </div>
                </div>

                <div className="admin-main-card">
                    <h5 className="admin-card-title">Pots</h5>
                    <div className="admin-card-count">430</div>
                    <div className="admin-card-link-wrapper">
                        <Link className="admin-card-link" to="/admin-dashbord/posts-table">See all posts</Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-file-post"></i>
                        </div>
                    </div>
                </div>

                <div className="admin-main-card">
                    <h5 className="admin-card-title">Categories</h5>
                    <div className="admin-card-count">8</div>
                    <div className="admin-card-link-wrapper">
                        <Link className="admin-card-link" to="/admin-dashboard/categories-table">See all categories</Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-tag-fill"></i>
                        </div>
                    </div>
                </div>

                <div className="admin-main-card">
                    <h5 className="admin-card-title">Comments</h5>
                    <div className="admin-card-count">74</div>
                    <div className="admin-card-link-wrapper">
                        <Link className="admin-card-link" to="/admin-dashboard/comments-table">See all comments</Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-chat-left-text"></i>
                        </div>
                    </div>
                </div>


            </div>
            <AddCategoryForm />
        </div>
    );
}

export default AdminMain;
