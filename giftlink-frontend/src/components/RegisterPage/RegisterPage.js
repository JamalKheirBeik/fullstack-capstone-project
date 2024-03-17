import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';
import { urlConfig } from '../../config';
import './RegisterPage.css';

function RegisterPage() {
    //insert code here to create useState hook variables for firstName, lastName, email, password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();
    // insert code here to create handleRegister function
    const handleRegister = async () => {
        try {
            const url = `${urlConfig.backendUrl}/api/auth/register`;
            const options = {
                methods: "POST",
                headers: {
                    "access-control-allow-origin": "*",
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    firstName, lastName, email, password
                })
            };
            const response = await fetch(url, options);
            const json = await response.json();
            console.log('json data', json);
            console.log('er', json.error);

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);
                setIsLoggedIn(true);
                navigate('/app');
            }
            if (json.error) {
                setError(json.error);
            }
        } catch (error) {
            console.log('Error:', error.message);
            setError('Something went wrong! Please try again');
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                        {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
                        <div className="mb-4">
                            <label htmlFor="firstName" className="form label">First Name</label>
                            <br />
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="form label">Last Name</label>
                            <br />
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </ div>
                        <div className="mb-4">
                            <label htmlFor="email" className="form label">Email</label>
                            <br />
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="text-danger">{error}</div>
                        </ div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form label">Password</label>
                            <br />
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/* insert code here to create a button that performs the `handleRegister` function on click */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;