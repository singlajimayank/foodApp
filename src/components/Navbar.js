import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../services/Auth.service'
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import { useStateContext } from './ContextReducer'
import MyCart from '../pages/myCart/myCart';

export default function Navbar() {
    let store = useStateContext();
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await AuthService.logout();
        navigate('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">Hello Food</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                        </ul>
                        {
                            (!localStorage.getItem("token"))
                                ?
                                <div className="d-flex">
                                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/signUp">SignUp</Link>
                                </div>
                                :
                                <div className='d-flex'>
                                    <div>
                                        <div className='btn bg-white text-success mx-1' onClick={() => setCartView(true)}>
                                            My cart
                                            <Badge pill bg="danger" className='ms-1'>{store.length}</Badge>
                                        </div>
                                        {
                                            (cartView)
                                                ?
                                                <Modal onClose={() => setCartView(false)}><MyCart /></Modal>
                                                :
                                                null
                                        }
                                    </div>
                                    <div>
                                        <div className='btn bg-white text-danger mx-1' onClick={handleLogout}>Logout</div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
