import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import './form.css'
const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const formSubmitHandler = (e) => {
        e.preventDefault()

        if (password.trim() === "") return toast.error('password is required')
        console.log({
            password
        });
    }
    return (
        <section className="form-container">
            <ToastContainer position='top-center' />
            <h1 className="form-title">Reset password</h1>
            <form onSubmit={formSubmitHandler} className="form">

                <div className="form-group">
                    <label htmlFor="password" className='form-label'>New Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='form-input' id='password' placeholder='Enter your new password' />
                </div>

                <button className='form-btn' type="submit">Submit</button>
            </form>
        </section>
    );
}

export default ResetPassword;
