import React, { useState, useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {LoginModal} from '../../components';
import Auth from '../../utils/auth';
import './login.css';

function Login() {
    const navigate = useNavigate()
    const [showLogin,setShowLogin] = useState('')
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    
    

    
    return (
        <div>  
            <div className="loginHeader">
                <img className="loginImg" src='/logo512.png'></img>
                <p className="welcome">Welcome to JobTracker</p >
                <p className="welcomeText">In the fast paced job hunting world, it can be difficult to keep track of all the information for the jobs that you are applying to.  <span className="title">JobTracker</span> is an easy to use app that allows you to fill out the company information and list all the job posts that you find.  Once you apply you can change your status and leave any notes for that job posting.</p>
                <button className="loginBtn" onClick={()=>setShowLogin('showLogin')}>Login</button>
            </div>
        <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} user={user} setUser={setUser} />
        {/* {loginOrRegister==='register'?
            <div className="loginContainer">
                <form onSubmit={register}>
                    <div className="inputContainer">
                        <label htmlFor="name">Name:</label>
                        <input name="name" type="text" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})} placeholder="Enter Name" required></input>
                        <label htmlFor="email">Email:</label>
                        <input name="email" type="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="Enter Email" required></input>
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Enter Password" required></input>
                    
                    </div>
                    <button className="loginButton">Register</button>
                    
                </form>
                <p className="loginNavigation" onClick={()=>changeLogin('login')}>Return to Login</p>
                {errorMessage}
            </div>
        
        :   
            <div className="loginContainer">
                <form onSubmit={login}>
                    <div className="inputContainer">
                        <label htmlFor="email">Email:</label>
                        <input name="email" type="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="Enter Email" required></input>
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Enter Password" required></input>
                    </div>
                    <button className="loginButton">Login</button>
                </form>
                <p className="loginNavigation" onClick={()=>changeLogin('register')}>Click to Register</p>
                {errorMessage}
               
            </div>
        } */}
        </div>
    );
}

export default Login;
