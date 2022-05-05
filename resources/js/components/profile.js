import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Redirect, Link, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.css";

function Profile() {
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/logout').then(result => {
            if (result.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('auth_email');
                navigate(0);
            }
        })
    }
    
    return (
        <div className="container">
            <h1 style={styles.h1}>Profile</h1>
            
            <form style={styles.form} onSubmit={handleSubmit}>
                <span><b>Username: </b>{localStorage.getItem('auth_name')}</span>
                <span><b>Email: </b>{localStorage.getItem('auth_email')}</span>
                <input type="submit" value="Logout" style={styles.input} className="logoutButton"/>
            </form>
        </div>
    );
}

export default Profile;
