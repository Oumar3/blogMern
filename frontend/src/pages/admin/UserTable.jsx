import React from 'react';
import './admin-table.css'
import AdminSidebar from './AdminSidebar'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const UserTable = () => {

    const ondelete = () => {
        swal({
            title: "Etes vous sur de supprimer ?",
            text: "Once deleted, you will not be able to recover this user",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Votre post a ete supprime avec success!", {
                        icon: "success",
                    });
                } else {
                    swal("Your User is safe!");
                }
            });
    }

    return (
        <section className='table-conatiner'>
            <AdminSidebar />
            <div className="table-wrapper">
                <div className="table-title">Users</div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [1, 2, 3, 4].map(item => (
                                <tr key={item}>
                                    <td>{item}</td>
                                    <td>
                                        <div className="table-image">
                                            <img src="/images/user-avatar.png" className='table-user-image' alt="" />
                                            <span className='table-username'>ToriDev</span>
                                        </div>
                                    </td>
                                    <td>contact@toridev.tech</td>
                                    <td>
                                        <div className="table-btn-group">
                                            <button>
                                                <Link to={`/profile/1`}>View Profile</Link>
                                            </button>
                                            <button onClick={ondelete}>Detele User</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default UserTable;
