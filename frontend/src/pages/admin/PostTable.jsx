import React from 'react';
import './admin-table.css'
import AdminSidebar from './AdminSidebar'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { posts } from '../../dummyData';

const PostTable = () => {

    const ondelete = () => {
        swal({
            title: "Etes vous sur de supprimer ?",
            text: "Once deleted, you will not be able to recover this Post",
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
                    swal("Your Post is safe!");
                }
            });
    }

    return (
        <section className='table-conatiner'>
            <AdminSidebar />
            <div className="table-wrapper">
                <div className="table-title">Post</div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Post Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="table-image">
                                            <img src="/images/user-avatar.png" className='table-user-image' alt="" />
                                            <span className='table-username'>{item.user.username}</span>
                                        </div>
                                    </td>
                                    <td>{item.title}</td>
                                    <td>
                                        <div className="table-btn-group">
                                            <button>
                                                <Link to={`/profile/details/${item._id}`}>View Profile</Link>
                                            </button>
                                            <button onClick={ondelete}>Detele Post</button>
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

export default PostTable;
