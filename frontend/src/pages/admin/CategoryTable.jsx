import React from 'react';
import './admin-table.css'
import AdminSidebar from './AdminSidebar'
// import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { categories } from '../../dummyData';

const CategoryTable = () => {

    const ondelete = () => {
        swal({
            title: "Etes vous sur de supprimer ?",
            text: "Once deleted, you will not be able to recover this Category",
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
                    swal("Your Category is safe!");
                }
            });
    }

    return (
        <section className='table-conatiner'>
            <AdminSidebar />
            <div className="table-wrapper">
                <div className="table-title">Category</div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.title}</td>
                                    <td>
                                        <div className="table-btn-group">
                                            {/* <button>
                                                <Link to={`/posts/categories/${item.title}`}>View Profile</Link>
                                            </button> */}
                                            <button onClick={ondelete}>Detele category</button>
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

export default CategoryTable;
