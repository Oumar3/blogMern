import React, { useState } from 'react';
import './updateProfie.css'

const user = {
    username: 'ToriDev',
    bio: 'Hello my name is ToriDev, I\'m a Web developer'
}

const UpdateProfile = ({ setUpdateProfile }) => {
    const [username, setUsername] = useState(user.username)
    const [bio, setBio] = useState(user.bio)
    const [password, setPassword] = useState("")

    const onSubmitForm = (e) => {
        e.preventDefault()
        const updateUser = { username, bio }
        if (password.trim() !== '') {
            updateUser.password = password
        }
        console.log(updateUser)
    }

    return (
        <div className='update-Profile' >
            <form onSubmit={onSubmitForm} className="update-Profile-form">
                <abbr title="close">
                    <i onClick={() => setUpdateProfile(prev => !prev)} className='bi bi-x-circle-fill update-Profile-form-close'></i>
                </abbr>
                <h1 className="update-Profile-title">Update Profile</h1>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='update-Profile-input' />
                <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} className='update-Profile-input' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='update-Profile-input' />
                <button className='update-Profile-btn' type="submit">
                    Update Profile
                </button>
            </form>
        </div>
    );
}

export default UpdateProfile;
