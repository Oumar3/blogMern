import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
const AddCategoryForm = () => {
    const [title, setTitle] = useState('')

    const addValue = (e) => {
        console.log(title);
        setTitle(e.target.value)
        console.log(title);
    }
    const HandleClickCate = (e) => {
        e.preventDefault()
        if (title.trim() === "") return toast.error("Category is required")
        setTitle('')
        console.log(title);
    }
    return (
        <div className="add-category">
            <ToastContainer position='top-center' />
            <h6 className="add-category-title">Add New Categoey</h6>
            <form onSubmit={HandleClickCate}>
                <div className="add-category-form-group">
                    <label htmlFor="title">category Title</label>
                    <input onChange={addValue} value={title} type="text" id='title' placeholder='Enter Category Title' />
                </div>
                <button type="submit" className='add-category-btn'>Add</button>
            </form>
        </div>
    );
}

export default AddCategoryForm;
