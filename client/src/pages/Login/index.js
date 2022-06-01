import React, { useState, useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Auth from '../../utils/auth';
import './login.css';

function Login() {
    const navigate = useNavigate()
    const [errorMessage,setErrorMessage] = useState('')
    const [loginOrRegister,setLoginOrRegister] = useState('login')
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    
    const register = (e) => {
        e.preventDefault();
        if (user.name===''||user.email===''||user.password===''){
            return
        }
        fetch('/user',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)

        }).then(response=>response.json())
        .then(data=>{
            if (!data.token){
                setErrorMessage('invalid')
                return
            }
            Auth.login(data.token)
            setErrorMessage('')
            navigate('/home/')
        })
    }

    const changeLogin = (path)=>{
        setLoginOrRegister(path)
        setErrorMessage('')
        setUser({
            name:'',
            email:'',
            password:''
        })
    }
    const login = (e) => {
        e.preventDefault();
        if (user.email===''||user.password===''){
            return
        }
        fetch('/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)

        }).then(response=>response.json())
        .then(data=>{
            
            if (!data.token){
                setErrorMessage('invalid')
                return
            }
            Auth.login(data.token)
            setErrorMessage('')
            navigate('/home/')
        })

    }
    return (
        <>
        {loginOrRegister==='register'?
            <div className="loginContainer">
                <form onSubmit={register}>
                    <div className="inputContainer">
                        <label htmlFor="name">Name:</label>
                        <input name="name" type="text" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})} placeholder="Enter Name" required></input>
                        <label htmlFor="email">Email:</label>
                        <input name="email" type="text" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="Enter Email" required></input>
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="text" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Enter Password" required></input>
                    
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
                        <input name="email" type="text" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="Enter Email" required></input>
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="text" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Enter Password" required></input>
                    </div>
                    <button className="loginButton">Login</button>
                </form>
                <p className="loginNavigation" onClick={()=>changeLogin('register')}>Click to Register</p>
                {errorMessage}
                
            </div>
        }
        </>
    );
}

export default Login;
