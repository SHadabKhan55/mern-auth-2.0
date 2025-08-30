import React from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div>
      <Link to="/"><button>Back</button></Link>
      <form >
        <h2>Login</h2>
        <label htmlFor="">Email</label><br />
        <input type="email" name="Email" id="" /><br />
        <label htmlFor="">Password</label><br />
        <input type="password" name="password" id="" /><br />
        <button>save</button>
      </form>
      <Link to="/register">not register</Link>
    </div>
  )
}

export default Login