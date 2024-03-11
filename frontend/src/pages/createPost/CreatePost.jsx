import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './createPost.css'
const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [file, setFile] = useState(null)
    const onSubmit = (e) => {
        e.preventDefault()
        if (title.trim() === "") return toast.error('Title is required')
        if (description.trim() === "") return toast.error('description is required')
        if (category.trim() === "") return toast.error('category is required')
        if (!file) return toast.error('file is required')

        const formData = new FormData()
        formData.append("image", file)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("category", category)

        // @Todo send form data in server
        console.log({ title, description, category, file })
    }
    return (
        <div className="section create-post">
            <ToastContainer position="top-center" />
            <h1 className="create-post-title">Create New post</h1>
            <form onSubmit={onSubmit} className="create-post-form">
                <input type="text" placeholder='Post Title' className='create-post-input' value={title} onChange={(e) => setTitle(e.target.value)} />
                <select value={category} onChange={(e) => setCategory(e.target.value)} className='create-post-input'>
                    <option disabled value="">Select A Category</option>
                    <option value="music">music</option>
                    <option value="coffee">coffee</option>
                </select>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='create-post-textarea' rows="5"></textarea>
                <input onChange={(e) => setFile(e.target.files[0])} type="file" name='file' id='file' className='create-post-upload' />
                <button type='submit' className='create-post-btn'>Create</button>
            </form>
        </div>
    )
}

export default CreatePost;
