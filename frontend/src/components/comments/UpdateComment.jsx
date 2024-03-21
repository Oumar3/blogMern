import React, { useState } from 'react';
import './updateComment.css'
import { ToastContainer, toast } from 'react-toastify';

const UpdateComment = ({ setUpdateComment }) => {
    const [text, setText] = useState('This is good')

    const onSubmitForm = (e) => {
        e.preventDefault()
        if (text.trim() === "") return toast.error('text is required')
        console.log(text)
    }

    return (
        <div className='update-comment' >
            <ToastContainer position="top-center" />
            <form onSubmit={onSubmitForm} className="update-comment-form">
                <abbr title="close">
                    <i onClick={() => setUpdateComment(prev => !prev)} className='bi bi-x-circle-fill update-comment-form-close'></i>
                </abbr>
                <h1 className="update-comment-title">Update Comment</h1>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='update-comment-input' />
                <button className='update-comment-btn' type="submit">
                    Comment Post
                </button>
            </form>
        </div>
    );
}

export default UpdateComment;
