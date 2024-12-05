import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';

const AccessControl = () => {
    const {currentUser} = useContext(UserContext);
    const token = currentUser?.token

    const navigate = useNavigate();

    //redirect to login for any user who isn't login
    useEffect(()=> {
        if(!token){
            navigate('/login');
        }
    },[])

  return (
    <>
      
    </>
  )
}

export default AccessControl
