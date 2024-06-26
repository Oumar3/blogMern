import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import './form.css'
const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const formSubmitHandler = (e) => {
        e.preventDefault()

        if (username.trim() === "") return toast.error('Username is required')
        if (email.trim() === "") return toast.error('email is required')
        if (password.trim() === "") return toast.error('password is required')
        console.log({
            username, email, password
        });
    }
    return (
        <section className="form-container">
            <ToastContainer position='top-center' />
            <h1 className="form-title">Create new account</h1>
            <form onSubmit={formSubmitHandler} className="form">

                <div className="form-group">
                    <label htmlFor="username" className='form-label'>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className='form-input' id='username' placeholder='Enter your username' />
                </div>

                <div className="form-group">
                    <label htmlFor="username" className='form-label'>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='form-input' id='email' placeholder='Enter your email' />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='form-input' id='password' placeholder='Enter your password' />
                </div>
                <button className='form-btn' type="submit">Register</button>
            </form>
            <div className="form-footer">
                Already have an account ? <Link to="/login">Login</Link>
            </div>
        </section>
    );
}

export default Register;
