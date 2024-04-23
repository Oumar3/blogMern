import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import './form.css'
const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const formSubmitHandler = (e) => {
        e.preventDefault()

        if (email.trim() === "") return toast.error('email is required')
        console.log({
            email
        });
    }
    return (
        <section className="form-container">
            <ToastContainer position='top-center' />
            <h1 className="form-title">Create new account</h1>
            <form onSubmit={formSubmitHandler} className="form">

                <div className="form-group">
                    <label htmlFor="username" className='form-label'>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='form-input' id='email' placeholder='Enter your email' />
                </div>

                <button className='form-btn' type="submit">Submit</button>
            </form>
        </section>
    );
}

export default ForgotPassword;
