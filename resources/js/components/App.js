import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Navigate, Link, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function ProfileRoute() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/user`).then(result => {
            localStorage.setItem('auth_name', result.data.name);
            localStorage.setItem('auth_email', result.data.email);
            setAuthenticated(true);
            setLoading(false);
        });

        return () => {
            setAuthenticated(false);
        };
    }, []);

    const navigate = useNavigate();

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            navigate('/login');
        }
        return Promise.reject(err);
    });

    if (loading) {
        return (<h1>Loading...</h1>);
    }

    return (
        authenticated ? <Profile/> : <Navigate to='/login' replace/>
    );
}

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Navigate to="/login" replace/>}/>
                    <Route path="/login" element={localStorage.getItem('auth_token') ? <Navigate to='/profile' replace/> : <Login/>}/>
                    <Route path="/register" element={localStorage.getItem('auth_token') ? <Navigate to='/profile' replace/> : <Register/>}/>
                    <Route path="/profile" element={<ProfileRoute/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(<React.StrictMode><App/></React.StrictMode>);
}
