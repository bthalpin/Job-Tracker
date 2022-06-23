import React, { useState } from 'react';
import {LoginModal} from '../../components';
import './login.css';

function Login() {
    const [showLogin,setShowLogin] = useState('')
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    
    

    
    return (
        <div>  
            <div className="loginHeader">
                <img className="loginImg" src='/logo512.png' alt="JobTracker Logo"></img>
                <p className="welcome">Welcome to JobTracker</p >
                <p className="welcomeText">In the fast paced job hunting world, it can be difficult to keep track of all the information for the jobs that you are applying to.</p>
                <p className="welcomeText">  <span className="title">JobTracker</span> is an easy to use app where you can save job postings to allow you to quickly and easily organize your job opportunities.</p>
                <button className="loginBtn" onClick={()=>setShowLogin('showLogin')}>Login</button>
            </div>
            
            <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} user={user} setUser={setUser} />
        
        </div>
    );
}

export default Login;
