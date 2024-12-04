import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { UserContext } from '../context/userContext'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const navigate = useNavigate();

  const {setCurrentUser} = useContext(UserContext)
  
  const changeInputHandle = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const loginUser = async (e) => {
    e.preventDefault();
    setError('')
    try {

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setCurrentUser(user)
      navigate('/')
      
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className='login'>
      <div className="container">
        <h2>Sign In</h2>
        <form className="form register__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="email" name="email" id="email" placeholder='Enter email' value={userData.email}
            onChange={changeInputHandle} />
          <input type="password" name="password" id="password" placeholder='Enter Password' 
            value={userData.password} onChange={changeInputHandle} />
            <button type="submit" className='btn primary'>Login</button>
        </form>
        <small>Don't you have an account? <Link to='/register'>Sign up</Link></small>
      </div>
    </section>
  )
}

export default Login
