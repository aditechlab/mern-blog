import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  
  const changeInputHandle = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }
  return (
    <section className='login'>
      <div className="container">
        <h2>Sign In</h2>
        <form action="" className="form register__form">
          <p className="form__error-message">This is an error message</p>
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
