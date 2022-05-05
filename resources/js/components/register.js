import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Navigate, Link, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.css";

function Register() {
    const navigate = useNavigate();
    
    const [registerInput, setState] = useState({
        name: '',
        email: '',
        password: '',
        errorList: [],
    });

    const handleInput = (e) => {
        e.persist();
        setState({ ...registerInput, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(res => {
            axios.post('/register', data).then(result => {
                if (result.data.status === 200) {
                    localStorage.setItem('auth_token', result.data.token);
                    navigate(0);
                } else {
                    setState({ ...registerInput, errorList: result.data.validation_errors });
                }
            });
        });
    }
    
    return (
        <div className="container">
            <h1 style={styles.h1}>Register</h1>
            
            <form style={styles.form} onSubmit={handleSubmit}>
                <label style={styles.label}>
                    Name:
                    <input type="text" style={styles.input} name="name" onChange={handleInput}/>
                    <span style={{color:"red"}}>{registerInput.errorList.name}</span>
                </label>
                <label style={styles.label}>
                    Email:
                    <input type="text" style={styles.input} name="email" onChange={handleInput}/>
                    <span style={{color:"red"}}>{registerInput.errorList.email}</span>
                </label>
                <label style={styles.label}>
                    Password:
                    <input type="password" style={styles.input} name="password" onChange={handleInput}/>
                    <span style={{color:"red"}}>{registerInput.errorList.password}</span>
                </label>
                <input type="submit" value="Sign up" style={styles.input} className="submitButton"/>
                <Link to="/login">I already have an account, sign in</Link>
            </form>
        </div>
    );
}

export default Register;
