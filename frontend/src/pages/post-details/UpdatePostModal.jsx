import React, { useState } from 'react';
import './UpdatePost.css'
import { ToastContainer, toast } from 'react-toastify';

const UpdatePostModal = ({ setUpdatePost, post }) => {
    const [title, setTitle] = useState(post.title)
    const [description, setDescription] = useState(post.description)
    const [category, setCategory] = useState(post.category)

    const onSubmitForm = (e) => {
        e.preventDefault()
        if (title.trim() === "") return toast.error('Title is required')
        if (description.trim() === "") return toast.error('description is required')
        if (category.trim() === "") return toast.error('category is required')
        console.log(title, description, category)
    }

    return (
        <div className='update-post' >
            <ToastContainer position="top-center" />
            <form onSubmit={onSubmitForm} className="update-post-form">
                <abbr title="close">
                    <i onClick={() => setUpdatePost(prev => !prev)} className='bi bi-x-circle-fill update-post-form-close'></i>
                </abbr>
                <h1 className="update-post-title">Update Post</h1>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='update-post-input' />
                <select className='update-post-input' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option disabled value="">
                        Select A Category
                    </option>
                    <option value="music">music</option>
                    <option value="travelling">travelling</option>
                </select>
                <textarea className='update-post-textarea' value={description} onChange={(e) => setDescription(e.target.value)} rows="5"></textarea>
                <button className='update-post-btn' type="submit">
                    Update Post
                </button>
            </form>
        </div>
    );
}

export default UpdatePostModal;
