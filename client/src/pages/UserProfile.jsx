import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import Avatar from '../images/avatar15.jpg'
import { FaCheck, FaEdit } from 'react-icons/fa'
import AccessControl from '../components/AccessControl'
import { UserContext } from '../context/userContext'

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [ConfirmNewPassword, setConfirmNewPassword] = useState('')
  
   const { currentUser } = useContext(UserContext);

  return (
    <section className='profile'>
      <AccessControl />
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className='btn'>My posts</Link>
        
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="" />
            </div>
            {/* form to update avatar */}
            <form action="" className="avatar__form">
              <input type="file" name="avatar" id="avatar" onChange={e => setAvatar(e.target.files[0])} accept='png, jpg, jpeg'/>
              <label htmlFor="avatar"><FaEdit /></label>
            </form>
            <button className="profile__avatar-btn"><FaCheck /></button>
          </div>
          <h1 className='center'>Deogratias Amas</h1>
          
          {/* form to update user details */}
          <form action="" className="form profile__form">
            <p className="form__error-message">Thi is an error message</p>
            <input 
              type="text" name="name" id="name" placeholder='Full Name' 
              value={name} onChange={e => setName(e.target.value)} />
            <input 
              type="text" name="email" id="email" placeholder='Email id' 
              value={email} onChange={e => setEmail(e.target.value)} />
            <input 
              type="text" name="currentPassword" id="currentPassword" placeholder='Current Password' 
              value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <input 
              type="text" name="newPassword" id="newPassword" placeholder='New Password' 
              value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input 
              type="text" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' 
              value={ConfirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
              <button type="submit" className='btn primary'>Update details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile
