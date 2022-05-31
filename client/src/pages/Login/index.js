import React, { useState, useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Auth from '../../utils/auth';

function Login() {
    const navigate = useNavigate()
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    
    const register = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/user',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)

        }).then(response=>response.json())
        .then(data=>Auth.login(data.token))
    }
    const login = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)

        }).then(response=>response.json())
        .then(data=>{
            Auth.login(data.token)
            navigate('/')
        })

    }
    return (
        <>
            <form onSubmit={register}>
                <input name="name" type="text" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})} placeholder="Enter Name"></input>
                <input name="email" type="text" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="Enter Email"></input>
                <input name="password" type="text" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Enter Password"></input>
                <button>Register</button>
            </form>
            <form onSubmit={login}>
                <input name="email" type="text" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="Enter Email"></input>
                <input name="password" type="text" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Enter Password"></input>
                <button>Login</button>
            </form>
        </>
    );
}

export default Login;
