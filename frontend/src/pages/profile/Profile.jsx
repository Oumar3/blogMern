import React, { useState } from 'react';
import PostList from '../../components/posts/PostList';
import { posts } from '../../dummyData';
import './profile.css'
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
const Profile = () => {
    const [file, setFile] = useState(null)
    const SubmitForm = (e) => {
        e.preventDefault()
        if (!file) return toast.warning('File is not valide')
    }

    const ondelete = () => {
        swal({
            title: "Etes vous sur de supprimer ?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
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
                    swal("Your imaginary file is safe!");
                }
            });
    }


    return (
        <section className='profile'>
            <ToastContainer position='top-center' />
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img src={file ? URL.createObjectURL(file) : "/images/user-avatar.png"} className='profile-image' alt="" />
                    <form onSubmit={SubmitForm}>
                        <abbr title="choose profile photo">
                            <label htmlFor="file" className='bi bi-camera-fill upload-profile-photo-icon'>
                            </label>
                        </abbr>
                        <input onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} type="file" name="file" id="file" />
                        <button type="submit" className='upload-profile-photo-btn'>upload</button>
                    </form>
                </div>
                <h1 className='profile-username'>ToriDev</h1>
                <p className='profile-bio'>
                    Hello my name is ToriDev, I'm a Web developer
                </p>
                <div className="user-date-joined">
                    <strong>Date Joined : </strong>
                    <span>Fri Nov 04 2024</span>
                </div>
                <button type="submit" className='profile-update-btn'>
                    <i className="bi bi-file-person-fill"></i>
                    Update Profile
                </button>
            </div>
            <div className="profile-posts-list">
                <h2 className="profile-posts-user">ToriDev Post</h2>
                <PostList posts={posts} />
            </div>
            <button onClick={ondelete} className='delete-account-btn'>
                Delete your Account
            </button>
        </section>
    );
}

export default Profile;
