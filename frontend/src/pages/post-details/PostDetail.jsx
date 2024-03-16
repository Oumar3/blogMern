import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom"
import { posts } from '../../dummyData'
import './postDetail.css'
import { toast, ToastContainer } from 'react-toastify'
import AddComment from '../../components/comments/AddComment';
import CommentList from '../../components/comments/CommentList';
import swal from 'sweetalert';

const PostDetail = () => {
    const { id } = useParams()
    const post = posts.find(p => p._id === parseInt(id))
    const [file, setFile] = useState(null)
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const updateImageSubmitHandle = (e) => {
        e.preventDefault()
        if (!file) return toast.error('file not correct')
        else
            toast.success('image uploaded successfull')
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
        <section className='post-detail'>
            <ToastContainer position='top-center' />
            <div className="post-datil-image-wrapper">
                <img className='post-datail-image' src={file ? URL.createObjectURL(file) : post.image} alt="" />
                <form onSubmit={updateImageSubmitHandle} className="update-post-image-form">
                    <label htmlFor="file" className='update-post-image-label'>
                        <i className='bi bi-image-fill'></i>
                        Select new image
                    </label>
                    <input onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} type="file" name='file' id='file' />
                    <button type="submit">upload</button>
                </form>
            </div>
            <h1 className="post-detail-title">{post.title}</h1>
            <div className="post-deatils-user-info">
                <img src={post.user.image} alt="" className='post-deatils-user-image' />
                <div className="post-deatils-user">
                    <strong>
                        <Link to="/profile/1">{post.user.username}</Link>
                    </strong>
                    <span><em>{post.createdAt}</em></span>
                </div>
            </div>
            <p className="post-deatils-description">
                {post.description}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat iste soluta optio recusandae, laudantium corrupti odit,
                doloremque ad illo pariatur
                debitis quos minima reiciendis dolor atque quaerat tenetur laborum cumque.                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat iste soluta optio recusandae, laudantium corrupti odit,
                doloremque ad illo pariatur
                debitis quos minima reiciendis dolor atque quaerat tenetur laborum cumque.                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat iste soluta optio recusandae, laudantium corrupti odit,
                doloremque ad illo pariatur
                debitis quos minima reiciendis dolor atque quaerat tenetur laborum cumque.
            </p>
            <div className="post-details-icon-wrapper">
                <div>
                    <i className="bi bi-hand-thumbs-up"></i>
                    <small>{post.likes.length} likes</small>
                </div>
                <div>
                    <i className="bi bi-pencil-square"></i>
                    <i onClick={ondelete} className="bi bi-trash-fill"></i>
                </div>
            </div>
            <AddComment />
            <CommentList />
        </section>
    );
}

export default PostDetail;
