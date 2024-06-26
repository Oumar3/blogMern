import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import './form.css'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/apiCalls/authApiCall';
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const formSubmitHandler = (e) => {
        e.preventDefault()

        if (email.trim() === "") return toast.error('email is required')
        if (password.trim() === "") return toast.error('password is required')

        dispatch(loginUser({ email, password }))
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

                <div className="form-group">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='form-input' id='password' placeholder='Enter your password' />
                </div>

                <button className='form-btn' type="submit">Login</button>
            </form>
            <div className="form-footer">
                Did you forgot your password ? <Link to="/forgot-password">Forgot </Link>
                Don't have account ? <Link to="/register"> Register</Link>
            </div>
        </section>
    );
}

export default Login;
