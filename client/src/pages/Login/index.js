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
                <div className="loginCard">
                <img className="loginImg" src='/logo512.png' alt="JobTracker Logo"></img>
                <p className="welcome">Welcome to JobTracker</p >
                    <p className="welcomeText">In the fast paced job hunting world, it can be difficult to keep track of all the information for the jobs that you are applying.</p>
                    <p className="welcomeText">  <span className="title">JobTracker</span> is an easy to use app that allows you to save job postings to quickly and easily organize your job opportunities.</p>

                <button className="loginBtn" onClick={()=>setShowLogin('showLogin')}>Login</button>
                </div>
                <div className="androidLink">
                    <a href='https://play.google.com/store/apps/details?id=com.halpin.jobtracker&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' className="androidImg" src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
                </div>

            </div>
            
            <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} user={user} setUser={setUser} />
        
        </div>
    );
}

export default Login;
