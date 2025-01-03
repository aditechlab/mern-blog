import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaCheck, FaEdit } from 'react-icons/fa'
import AccessControl from '../components/AccessControl'
import { UserContext } from '../context/userContext'
import axios from 'axios'

const UserProfile = () => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')

  const [isAvatarTouched, setIsAvatarTouched] = useState(false)
  
  const { currentUser } = useContext(UserContext);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(()=> {
    const getUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
          withCredentials:true, headers: {Authorization: `Bearer ${currentUser?.token}`}
        });
        const {name, email, avatar} = response.data;
        setName(name);
        setEmail(email);
        setAvatar(avatar);
      } catch (error) {
        console.log(error);
        
      }
    }
    getUser();
  }, [id])

  const changeAvatarHandler = async (e) => {
    e.preventDefault();
    setIsAvatarTouched(false);
    if (!avatar) {
      setError('Please select a file to upload.');
      return;
    }
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);
      
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, postData, {
        withCredentials:true, headers: {Authorization: `Bearer ${currentUser?.token}`}
      });
      setAvatar(response.data.avatar);
      
    } catch (err) {
      console.log("Error fetching user data:", err);
    }
  }

  const updateUserDetails = async (e) => {
    e.preventDefault();

    
    try {
      const userData = {
        name,
        email,
        currentPassword,
        newPassword,
        confirmNewPassword,
    };
  
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, userData, {
        withCredentials:true, headers: {Authorization: `Bearer ${currentUser?.token}`}
      });
      
      if(response.status === 200){
        //log user out
        navigate('/logout')

      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className='profile'>
      <AccessControl />
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className='btn'>My posts</Link>
        
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={`${process.env.REACT_APP_ASSETS_BASE_URL}/uploads/${avatar}`} alt="" />
            </div>
            {/* form to update avatar */}
            <form action="" className="avatar__form">
              <input type="file" name="avatar" id="avatar" onChange={e => setAvatar(e.target.files[0])} accept='png, jpg, jpeg'/>
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}><FaEdit /></label>
            </form>
            {isAvatarTouched && <button className="profile__avatar-btn" onClick={changeAvatarHandler}><FaCheck /></button>}
          </div>
          <h1 className='center'>{currentUser.name}</h1>
          
          {/* form to update user details */}
          <form action="" className="form profile__form" onSubmit={updateUserDetails}>
            {error && <p className="form__error-message">{error}</p>}
            <input 
              type="text" name="name" id="name" placeholder='Full Name' 
              value={name} onChange={e => setName(e.target.value)} />
            <input 
              type="email" name="email" id="email" placeholder='Email id' 
              value={email} onChange={e => setEmail(e.target.value)} />
            <input 
              type="password" name="currentPassword" id="currentPassword" placeholder='Current Password' 
              value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <input 
              type="password" name="newPassword" id="newPassword" placeholder='New Password' 
              value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input 
              type="password" name="confirmNewPassword" id="confirmNewPassword" placeholder='Confirm New Password' 
              value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
              <button type="submit" className='btn primary'>Update details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile
