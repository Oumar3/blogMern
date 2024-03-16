import './addComment.css'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const AddComment = () => {
    const [text, setText] = useState("")

    const submithandler = (e) => {
        e.preventDefault()
        if (text.trim() === "") return toast.error('Interdire de soumettre un formualire vide')
        console.log(text)
        setText("")
    }
    return (
        <form onSubmit={submithandler} className='add-comment'>
            <ToastContainer position='top-center' />
            <input onChange={(e) => setText(e.target.value)} value={text} type="text" placeholder='add a comment' className='add-comment-input' />
            <button type='submit' className='add-comment-btn'>Commenter</button>
        </form>
    );
}

export default AddComment;
