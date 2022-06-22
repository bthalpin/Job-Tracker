import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Auth from '../../utils/auth';

import './loginModal.css';

function LoginModal({showLogin, setShowLogin, user, setUser}) {
    const navigate = useNavigate()
    const [loginOrRegister,setLoginOrRegister] = useState('login')
    const [errorMessage,setErrorMessage] = useState('')

    const changeLogin = (path)=>{
        setLoginOrRegister(path)
        setErrorMessage('')
        setUser({
            name:'',
            email:'',
            password:''
        })
    }
    const handleClose = (e) => {
        e.preventDefault();
        if (e.target.classList[0] !== 'loginModalContainer'){
            return
        }
        setLoginOrRegister('login')
        setUser({
            name:'',
            email:'',
            password:''
        })
        setShowLogin('')
    }
    const register = (e) => {
        e.preventDefault();
        if (user.name===''||user.email===''||user.password===''){
            return
        }
        if (!user.email.toLowerCase().match(/.+@.+\..+/)){
            setErrorMessage('Must enter valid email')

            return
        }
        if (user.password.length<8){
            setErrorMessage('Password must be at least 8 characters')
            return
        }
        fetch('/user',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...user,email:user.email.toLowerCase()})

        }).then(response=>response.json())
        .then(data=>{
            if(data.code===11000){
                setErrorMessage('An account with that email is already used.')
                return
            }
            if (!data.token){       
                setErrorMessage('invalid')
                return
            }
            Auth.login(data.token)
            setErrorMessage('')
            navigate('/home/')
        })
    }

    
    const login = (e) => {
        e.preventDefault();
        console.log('here')
        if (user.email===''||user.password===''){
            return
        }
        fetch('/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...user,email:user.email.toLowerCase()})

        }).then(response=>response.json())
        .then(data=>{
            
            if (!data.token){
                setErrorMessage('Invalid username or password')
                return
            }
            Auth.login(data.token)
            setErrorMessage('')
            navigate('/home/')
        })
    }
    console.log(showLogin)
    return (
        <>
        <div className={`loginModalContainer ${showLogin}`} onClick={handleClose}>
            <div className="loginModalCard">
                <img className="loginModalImg" src="/logo512.png"></img>
                {loginOrRegister==='login'?
                <>
                    <form>
                        <div className="inputContainer">
                            <label htmlFor="email">Email:</label>
                            <input name="email" type="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="Enter Email" required></input>
                            <label htmlFor="password">Password:</label>
                            <input name="password" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Enter Password" required></input>
                        </div>
                        <button onClick={login} type="submit" className="loginModalBtn">Login</button>
                    </form>
                    <p className="loginNavigation" onClick={()=>changeLogin('register')}>Click to Register</p>
                    {errorMessage}
                </>
                :
                <>
                    <form>
                        <div className="inputContainer">
                            <label htmlFor="name">Name:</label>
                            <input name="name" type="text" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})} placeholder="Enter Name" required></input>
                            <label htmlFor="email">Email:</label>
                            <input name="email" type="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="Enter Email" required></input>
                            <label htmlFor="password">Password:</label>
                            <input name="password" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Enter Password" required></input>
                        
                        </div>
                        <button type="submit" className="loginModalBtn" onClick={register}>Register</button>
                        
                    </form>
                    <p className="loginNavigation" onClick={()=>changeLogin('login')}>Return to Login</p>
                    {errorMessage}
                </>
                }
               
            </div>
        </div>
        </>
    );
  }
  
  export default LoginModal;