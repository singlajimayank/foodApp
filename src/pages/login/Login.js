import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SnackbarUtil, { MESSAGE_VARIANT } from '../../utils/Snackbar.util';

import AuthService from '../../services/Auth.service';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { showSnackbar } = SnackbarUtil();

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await AuthService.login(credentials);
      navigate('/');
      showSnackbar("Login successful", MESSAGE_VARIANT.SUCCESS);
    } catch (error) {
      console.error('Error Signing Up: ', error);
      showSnackbar("Invalid credentials", MESSAGE_VARIANT.ERROR);
    }
  }

  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={handleChange} placeholder="abc@gmail.com" required aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={handleChange} placeholder="*******" required />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <Link to='/signUp' className="m-3 btn btn-success">I am a new user</Link>
        </form>
      </div>
    </div>
  )
}
