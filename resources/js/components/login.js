import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Navigate, Link, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.css";

function Login() {
    const navigate = useNavigate();
    
    const [loginInput, setState] = useState({
        email: '',
        password: '',
        errorList: [],
    });

    const handleInput = (e) => {
        e.persist();
        setState({ ...loginInput, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password
        }

        axios.post('/login', data).then(result => {
            if (result.data.status === 200) {
                localStorage.setItem('auth_token', result.data.token);
                navigate(0);
            } else if (result.data.status === 401) {
                alert(result.data.message);
            } else {
                setState({ ...loginInput, errorList: result.data.validation_errors });
            }
        })
    }

    return (
        <div className="container">
            <h1 style={styles.h1}>Login</h1>
            
            <form style={styles.form} onSubmit={handleSubmit}>
                <label style={styles.label}>
                    Email:
                    <input type="text" style={styles.input} name="email" onChange={handleInput}/>
                    <span style={{color:"red"}}>{loginInput.errorList.email}</span>
                </label>
                <label style={styles.label}>
                    Password:
                    <input type="password" style={styles.input} name="password" onChange={handleInput}/>
                    <span style={{color:"red"}}>{loginInput.errorList.password}</span>
                </label>
                <input type="submit" value="Sign in" style={styles.input} className="submitButton"/>
                <Link to="/register">Register</Link>
            </form>
        </div>
    );
}

export default Login;
