import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(''); // State to store error message

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        axios.post('http://localhost:3001/login', { email, pass })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    navigate('/home');
                } else {
                    setError('Invalid login credentials. Please try again.'); // Set error if login fails
                }
            })
            .catch(err => {
                console.log(err);
                setError('An error occurred. Please try again later.');
            });
    };

    return (
        <div className="container mt-5">
            <div className="card mx-auto" style={{ width: '400px' }}>
                <div className="card-body">
                    <h2 className="card-title text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
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
                            <button type="submit" className="btn btn-success">Login</button>
                            <Link to="/register" className="btn btn-light">Sign Up</Link>
                        </div>

                        {/* Conditionally display error message */}
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
