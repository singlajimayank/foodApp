import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SignUpService from '../../services/SignUp.service';
import SnackbarUtil, { MESSAGE_VARIANT } from '../../utils/Snackbar.util';

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });
    const navigate = useNavigate();
    const { showSnackbar } = SnackbarUtil();

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await SignUpService.signUp(credentials);
            if (response.success) {
                showSnackbar("SignUp successfully", MESSAGE_VARIANT.SUCCESS);
                navigate('/login');
            } else if (!response.success) {
                showSnackbar("Email already exists", MESSAGE_VARIANT.ERROR);
            }
        } catch (error) {
            console.error('Error Signing Up: ', error);
            showSnackbar("Something went wrong", MESSAGE_VARIANT.ERROR);
        }
    }


    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputName" name="name" value={credentials.names} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={handleChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputAddress" name="location" value={credentials.location} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to='/login' className="m-3 btn btn-success">Already a User</Link>
                </form>
            </div>
        </>
    )
}
