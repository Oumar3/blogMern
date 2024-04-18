import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminMain from './AdminMain';
import './admindash.css'

const AdminDashboard = () => {
    return (
        <section className='admin-dashbord'>
            <AdminSidebar />
            <AdminMain />
        </section>
    );
}

export default AdminDashboard;
