import React, { useContext } from 'react'

import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';
const Logout = () => {
  const {setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate()

  setCurrentUser(null) // delete current user state/session
  navigate('/login')
  return (
    <></>
  )
}

export default Logout
