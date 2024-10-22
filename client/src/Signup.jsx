import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, pass })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <div className="card mx-auto" style={{ width: '400px' }}>
                <div className="card-body">
                    <h2 className="card-title text-center">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter name"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="pwd"
                                placeholder="Enter password"
                                name="pwd"
                                onChange={(e) => setPass(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <button type="submit" className="btn btn-success">Sign Up</button>
                            <Link to="/login" className="btn btn-light">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
