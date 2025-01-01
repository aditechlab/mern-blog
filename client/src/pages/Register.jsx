import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const [error, setError] = useState('')
  const navigate = useNavigate();
  
  const changeInputHandle = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const registerUser = async (e) => {
    e.preventDefault();
    setError('')
    console.log(process.env.REACT_APP_BASE_URL);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`,
        userData
      )
      const newUser = await response.data
      console.log(newUser);
      if(!newUser){
        setError("Could not register user, please try again")
      }
      navigate('/login');
      
    } catch (err) {
      setError(err.response.data.message)
    }
  }


  return (
    <section className='register'>
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="text" name="name" id="name" placeholder='Full Name' value={userData.name}
            onChange={changeInputHandle} />
          <input type="email" name="email" id="email" placeholder='Enter email' value={userData.email}
            onChange={changeInputHandle} />
          <input type="password" name="password" id="password" placeholder='Enter Password' 
            value={userData.password} onChange={changeInputHandle} />
          <input type="password" name="password2" id="password2" placeholder='Enter Password confirmation' 
            value={userData.password2} onChange={changeInputHandle} />
            <button type="submit" className='btn primary'>Register</button>
        </form>
        <small>Already have an account? <Link to='/login'>Sign in</Link></small>
      </div>
    </section>
  )
}

export default Register
